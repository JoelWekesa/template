import LocationFormComponent from '@/components/forms/location';

const Home = () => {
	return (
		<div className='flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24'>
			<LocationFormComponent />
		</div>
	);
};

export default Home;
