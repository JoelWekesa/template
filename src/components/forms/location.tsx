/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {z} from 'zod';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '../ui/card';
import {Button} from '../ui/button';
import {useLoadScript} from '@react-google-maps/api';

const formSchema = z.object({
	location: z.string().min(2, {
		message: 'Location should be at least 2 characters long',
	}),

	end: z.string().min(2, {
		message: 'Location should be at least 2 characters long',
	}),
});

const LocationFormComponent = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			location: '',
			end: '',
		},

		resolver: zodResolver(formSchema),
	});

	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
		libraries: ['places'],
	});

	const inputRef = useRef(null);

	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

	const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
		if (!isLoaded) return;
		const place = address.getPlace();

		console.log(place?.name);

		if (!place || !place.geometry) {
			setSelectedPlace(null);
			return;
		}
		setSelectedPlace(place);
	};

	useEffect(() => {
		if (!isLoaded || loadError) return;

		const options = {
			componentRestrictions: {country: 'ke'},
			fields: ['address_components', 'geometry', 'name', 'formatted_address'],
		};

		const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, options);
		autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
	}, [isLoaded, loadError]);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const full_place = `${selectedPlace?.name}` + `, ${selectedPlace?.formatted_address}`;

		console.log({
			...data,
			full_place,
		});
	};

	return (
		<div className='p-2 w-full'>
			<Form {...form}>
				<form className='space-y-2.5' onSubmit={form.handleSubmit(handleSubmit)}>
					<Card>
						<CardHeader>
							<CardTitle>Distance calculator</CardTitle>
							<CardDescription>Enter two locations to calculate the distance</CardDescription>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name='location'
								render={({field}) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input placeholder='Enter your location' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='end'
								render={({field: {onChange}}) => (
									<FormItem>
										<FormLabel>Destination</FormLabel>
										<FormControl>
											<Input placeholder='Enter your destination' ref={inputRef} onChange={onChange} type='search' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button type='submit'>See Distance</Button>
						</CardFooter>
					</Card>
				</form>
			</Form>
		</div>
	);
};

export default LocationFormComponent;
