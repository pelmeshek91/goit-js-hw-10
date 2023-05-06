export function fetchCountries(name) {
  const BASE_URL = ' https://restcountries.com/v3.1';
  const END_POINT = '/name';
  const filterParams = '?fields=name,capital,population,flags,languages';

  const url = `${BASE_URL}${END_POINT}/${name}${filterParams}`;
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Enter invalid country');
      }
      return res.json();
    })
    .catch(console.log);
}
