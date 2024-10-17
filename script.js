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

const dailyTemp = "https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&daily=weather_code,temperature_2m_max,temperature_2m_min"
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
