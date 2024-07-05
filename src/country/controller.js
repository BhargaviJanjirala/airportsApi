const { getAirportByIataCodeQuery } = require("./queries");

const getAirportByIataCode = async (req, res) => {
  const iata_code = req.query.iata_code;

  try {
    if (iata_code) {
      const airport = await getAirportByIataCodeQuery(iata_code);

      if (!airport) {
        return res.status(404).json({ error: "Airport not found" });
      }

      const airportDetails = formatAirportDetails(airport);
      return res.status(200).json({ airport: airportDetails });
    }
    // else {
    //   const airports = await getAllAirportsQuery();
    //   return res.status(200).json({ airports });
    // }
  } catch (error) {
    console.error("Error querying the database:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const formatAirportDetails = (airport) => {
  return {
    id: airport.id,
    icao_code: airport.icao_code,
    iata_code: airport.iata_code,
    name: airport.name,
    type: airport.type,
    latitude_deg: airport.latitude_deg,
    longitude_deg: airport.longitude_deg,
    elevation_ft: airport.elevation_ft,
    address: {
      city: {
        id: airport.city_id,
        name: airport.city_name,
        country_id: airport.country_id,
        is_active: airport.city_is_active,
        lat: airport.city_lat,
        long: airport.city_long,
      },
      country: {
        id: airport.country_id,
        name: airport.country_name,
        country_code_two: airport.country_code_two,
        country_code_three: airport.country_code_three,
        mobile_code: airport.mobile_code,
        continent_id: airport.continent_id,
      },
    },
  };
};

module.exports = {
  getAirportByIataCode,
};
