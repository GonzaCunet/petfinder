// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoiZXplcXVpZWw5MyIsImEiOiJja3U0aTAyc2gwaGg1MnBvNmhyemJzbDc2In0.VfvIXjWgL8_dqs1ZKlQorA";
// const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

// function initMap() {
//   mapboxgl.accessToken = MAPBOX_TOKEN;
//   return new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//   });
// }

// function initSearchForm(callback) {
//   const form = document.querySelector(".search-form");
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     mapboxClient.geocodeForward(
//       e.target.q.value,
//       {
//         country: "ar",
//         autocomplete: true,
//         language: "es",
//       },
//       function (err, data, res) {
//         // console.log(data);
//         if (!err) callback(data.features);
//       }
//     );
//   });
// }

// (function () {
//   window.map = initMap();
//   initSearchForm(function (results) {
//     const firstResult = results[0];
//     const marker = new mapboxgl.Marker()
//       .setLngLat(firstResult.geometry.coordinates)
//       .addTo(map);

//     const [lng, lat] = firstResult.geometry.coordinates;

//     fetch("/comercios-cerca-de?lat=" + lat + "&lng=" + lng)
//       .then((res) => res.json())
//       .then((data) => {
//         for (const comercio of data) {
//           const { lat, lng } = comercio._geoloc;
//           new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
//         }
//       });

//     map.setCenter(firstResult.geometry.coordinates);
//     map.setZoom(14);
//   });
// })();