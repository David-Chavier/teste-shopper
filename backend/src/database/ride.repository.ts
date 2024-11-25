import pool from "../config/database.config";
import { RideCreateType } from "../types/ride.Type";

export class RideRepository {
  static async saveRide(data: RideCreateType): Promise<any> {
    const query = `
      INSERT INTO rides (
        customer_id, origin, destination, distance, duration, driver_id, driver_name, value
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      data.customer_id,
      data.origin,
      data.destination,
      data.distance,
      data.duration,
      data.driver.id,
      data.driver.name,
      data.value,
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("DATABASE_ERROR");
    }
  }

  static async findRidesByCustomer(customer_id: string, driver_id?: number): Promise<any[]> {
    let query = `
      SELECT 
        id, 
        created_at AS date, 
        origin, 
        destination, 
        distance, 
        duration, 
        driver_id, 
        driver_name, 
        value 
      FROM rides 
      WHERE customer_id = $1
    `;

    const params: any[] = [customer_id];

    if (driver_id) {
      query += ` AND driver_id = $2`;
      params.push(driver_id);
    }

    query += ` ORDER BY created_at DESC`;

    try {
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw new Error("DATABASE_ERROR");
    }
  }
}
