export interface RideModel {
    id: number;
    customer_id: string;
    driver_id: number;
    driver_name: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    date: Date; 
  }