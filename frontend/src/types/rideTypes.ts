
  export interface RideCreateType {
    customer_id: string; 
    origin: string; 
    destination: string;
    distance: number; 
    duration: string;
    driver: Driver;
    value: number;
  }

  export interface Coordinates {
    latitude: number;
    longitude: number;
  };
  
  export interface Review {
    comment: string;
    rating: number;
  };

  export interface Driver {
    id: number;
    name: string;
  };
  
  export interface DriverOption extends Driver {
    description: string;
    review: Review;
    vehicle: string;
    value: number
  };
  
  export interface RouteLeg {
    distance: {
      text: string;
      value: number;
    };
    duration: {
      text: string;
      value: number;
    };
    end_address: string;
    end_location: {
      lat: number;
      lng: number;
    };
    start_address: string;
    start_location: {
      lat: number;
      lng: number;
    };
    traffic_speed_entry: any[];
    via_waypoint: any[];
  };
  
  export interface Route {
    bounds: {
      northeast: object;
      southwest: object;
    };
    copyrights: string;
    legs: RouteLeg[];
    overview_polyline: {
      points: string;
    };
  };
  
  export interface RideEstimateResult {
    destination: Coordinates;
    distance: number;
    duration: string;
    options: DriverOption[];
    origin: Coordinates;
    route: Route;
  };

  export interface LocationState {
    rideEstimateResult: RideEstimateResult;
    userId: string;
    origin: string;
    destination: string;
  };
  
  