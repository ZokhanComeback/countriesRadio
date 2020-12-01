const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:region', async (req, res) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const region = req.params.region;

  const options = {
    region,
    regions,
    countries: [],
    error: ''
  };

  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/region/${region}`);

    for (const r of response.data) {
      options.countries.push({
        name: r.name,
        flag: r.flag
      });
    }
  } catch (e) {
    options.error = 'some error';
  } finally {
    res.render('region', options);
  }
});

module.exports = router;
