export const fetchCountryData = (
  setLoading,
  setCountries,
  setFilteredCountries,
) => {
  // Fetch country data from the API
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      // Process the data and extract relevant information
      const countryData = data.map(country => ({
        name: country.name.common,
        flag: country.flags.png,
        countryCode: country.cca2,
        idd: {
          root: country.idd?.root || '',
          suffixes: country.idd?.suffixes || [],
        },
        nativeName:
          country.name.nativeName &&
          (Object.values(country.name.nativeName)[1]?.common ||
            Object.values(country.name.nativeName)[0]?.common ||
            ''),
      }));
      setCountries(countryData);
      setFilteredCountries(countryData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};
