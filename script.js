const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector(.'date');
const timeOutput = document.querySelector(.'time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = querySelector('.name');
const icon = querySelector('.icon');
const cloudOutput = querySelector('.cloud');
const humidityOutput = querySelector('.humidity');
const windOutput = querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Jakarta";

function dateFormatted(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString("id-ID", options);
}

const dailyTemp = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,cloud_cover,wind_speed_10m"
const precipitation_sum = ""

async function getWeather() {
    try {
        const response = await fetch(dailyTemp);
        const data = await response.json();
        data.daily.time.forEach((el, i) => {
            document.getElementById("days").innerHTML += `
            <div class="col-12 col-md-3">
                <div class="card text-bg-light mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${dateFormatted(el)}</h5>
                        <p class="card-text">
                            ${data.daily.temperature_2m_max[i]} C
                        </p>
                    </div>
                </div>
            </div>
        `
        })
    } catch (error) {
        console.log(error);
    }
}
getWeather();