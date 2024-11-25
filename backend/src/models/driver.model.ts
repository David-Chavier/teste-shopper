export interface DriverModel {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    ratePerKm: number;
    minKm: number;
  }
  