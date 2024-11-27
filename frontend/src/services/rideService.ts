import axios from 'axios';
import { RideCreateType } from '../types/rideTypes';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function rideEstimate(customer_id: string, origin: string, destination: string) {
  const request = await api.post('/ride/estimate', { customer_id, origin, destination });

  return request.data
}

export async function rideConfirm(ride: RideCreateType) {
  try {
    return (await api.patch('/ride/confirm', { ride })).data;
  } catch (error) {
    console.error('Error confirming ride:', error);
    throw error;
  }
}

export async function ridesGet(customer_id: string, driver_id: string) {
  try {
    return (await api.get(`/ride/?customer_id=${customer_id}&driver_id=${driver_id}`)).data;
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
}
