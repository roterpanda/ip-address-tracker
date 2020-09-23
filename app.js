const input = document.getElementById("input");
const button = document.getElementById("button");
const ipText = document.getElementById("ip");
const loc = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

var map = L.map('map').setView([51.505, -0.09], 13);

function makeRequest(domain='') {

    fetch("https://geo.ipify.org/api/v1?apiKey=at_Ptp1WXD8Sm58gRvQHDUNtpa7WRfWz" +  "&domain=" + domain)
    .then(res => res.json())
    .then(data => handleData(data))
    .catch(err => console.log(err));

}

function handleData(data) {


    if (data.ip) {
        ipText.innerHTML = data.ip;
        loc.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
        timezone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;   
        map.setView([data.location.lat, data.location.lng], 15) ;
    } else {
        [ipText, loc, timezone, isp].forEach(e => e.innerHTML = "No address/domain found.");
    }s


}

function initializeMap() {
   
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
}

button.addEventListener("click", (e) => {
    e.preventDefault();
   makeRequest(input.value);
});

initializeMap();
makeRequest();

