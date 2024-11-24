import pool from "../config/database.config";

export class RideRepository {
  static async saveRide(data: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver_id: number;
    driver_name: string;
    value: number;
  }): Promise<any> {
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
      data.driver_id,
      data.driver_name,
      data.value,
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("DATABASE_ERROR");
    }
  }
}
