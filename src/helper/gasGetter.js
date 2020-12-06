const axios = require("axios");

exports.getCurrentGasPrices = async () => {
  let response = await axios.get(
    "https://www.gasnow.org/api/v3/gas/price?utm_source=relayerjobs"
  );
  let prices = response.data;
  return prices;
};
