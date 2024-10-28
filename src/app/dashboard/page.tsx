import LocationFormComponent from '@/components/forms/location';
import React from 'react';

const Page = () => {
	return (
		<div className='flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24'>
			<div className='flex flex-1 p-2'>
				<LocationFormComponent />
			</div>
		</div>
	);
};

export default Page;
