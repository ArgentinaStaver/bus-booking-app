import { createContext, useState } from "react";
import CarModel from "../../data-models/cars/CarModel";
import { getAllCars } from "../../api/cars";

type FetchStatus = 'pending' | 'success' | 'rejected';

export const CarsContext = createContext<{
	cars: CarModel[],
	fetchCars: () => void;
	getCar: (id: string) => CarModel | undefined,
}>({ cars: [], fetchCars: () => { }, getCar: (id) => undefined });

const CarsProvider = ({ children }: { children: React.ReactNode }) => {
	const [cars, setCars] = useState<CarModel[]>([]);
	const [status, setStatus] = useState<FetchStatus>('pending');

	const fetchCars = async () => {
		const { data: cars, status } = await getAllCars();

		if (status === 200) {
			setCars(cars);
			setStatus('success');
		} else {
			setCars([]);
			setStatus('rejected');
		}
	}

	const getCar = (id: string) => cars.find(car => car.id === id);

	return (
		<CarsContext.Provider value={{ cars, fetchCars, getCar }}>
			{children}
		</CarsContext.Provider>
	)
}

export default CarsProvider;
