export default function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(r => {
      if (name) {
        return r.json();
      } else {
        return;
      }
    })
    .catch(error => console.log(error));
}