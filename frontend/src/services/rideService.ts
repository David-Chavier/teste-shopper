import axios from 'axios';
import { RideCreateType, RideEstimateResult } from '../types/rideTypes';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function rideEstimate(customer_id: string, origin: string, destination: string) {
  const request = await api.post<RideEstimateResult>('/ride/estimate', { customer_id, origin, destination });

  return request.data
}

export async function rideConfirm(ride: RideCreateType) {
  const request = await api.patch('/ride/confirm', ride);

  return request.data
}

export async function ridesGet(customer_id: string, driver_id?: string) {
  const url = driver_id
    ? `/ride/${customer_id}?driver_id=${driver_id}`
    : `/ride/${customer_id}`;

  const request = await api.get(url);

  return request.data;
}

