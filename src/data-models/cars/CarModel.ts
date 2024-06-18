interface CarModel {
    id: string;
    make: string;
    model: string;
    plate: string;
    chassisSeries: string;
    seatsNumber: number;
    seatsLayout: any[];
    company: {
      id: string;
      name: string;
    };
    active: boolean;
  
    createdAt: string;
    updatedAt: string;
  }
  
  export default CarModel;
