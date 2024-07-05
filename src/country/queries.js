const pool = require("../../db");

const getAirportByIataCodeQuery = async (iata_code) => {
  const queryText = `
      SELECT 
        a.id,
        a.icao_code,
        a.iata_code,
        a.name,
        a.type,
        a.latitude_deg,
        a.longitude_deg,
        a.elevation_ft,
        c.id as city_id,
        c.name as city_name,
        c.country_id,
        c.is_active as city_is_active,
        c.lat as city_lat,
        c.long as city_long,
        co.id as country_id,
        co.name as country_name,
        co.country_code_two,
        co.country_code_three,
        co.mobile_code,
        co.continent_id
      FROM 
        "Airport" a
        LEFT JOIN "city" c ON a.city_id = c.id
        LEFT JOIN "country" co ON c.country_id = co.id
      WHERE 
        a.iata_code =$1
    `;

  try {
    const { rows } = await pool.query(queryText, [iata_code]);
    return rows[0];
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error; // Rethrow the error to be caught in the controller
  }
};

module.exports = { getAirportByIataCodeQuery };
