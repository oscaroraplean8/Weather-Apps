function dateFormatted(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString("en-US", options);
}

async function getWeatherByCity() {
    const city = document.getElementById("city").value;
    
    if (!city.trim()) {
        alert("Silakan masukkan nama kota");
        document.getElementById("days").innerHTML = "";
        document.getElementById("city-name").innerHTML = "";
        return;
    }

    document.getElementById("fetch-loading").style.display = "block";
    
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
        );
        const responseJson = await response.json();

        if (!responseJson.results || responseJson.results.length === 0) {
            alert("Nama kota tidak tersedia");
            document.getElementById("days").innerHTML = "";
            document.getElementById("city-name").innerHTML = "";
            document.getElementById("fetch-loading").style.display = "none";
            return;
        }

        const latitude = responseJson.results[0].latitude;
        const longitude = responseJson.results[0].longitude;
        const cityName = responseJson.results[0].name;
        
        getWeather(latitude, longitude);
        document.getElementById("city-name").innerHTML = cityName;
        document.getElementById("city").value = "";
        
    } catch (error) {
        alert("Terjadi kesalahan saat mencari kota");
        document.getElementById("days").innerHTML = "";
        document.getElementById("city-name").innerHTML = "";
        console.error("Error:", error);
    } finally {
        document.getElementById("fetch-loading").style.display = "none";
    }
}

async function getWeather(latitude, longitude) {
    
    document.getElementById("fetch-loading").style.display = "block";
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );
    const responseJson = await response.json();

    document.getElementById("days").innerHTML = "";

    for (let i = 0; i < responseJson.daily.time.length; i++) {
        document.getElementById("days").innerHTML += `
            <div class="col-12 col-md-2">
                <div class="card text-bg-light mb-4">
                    <div class="card-body">
                        <img class="card-img-top" style="width: 100px; height: 100px; justify-self: center; margin-left: auto; margin-right: auto; display: flex;" 
                        src="${wmo[responseJson.daily.weather_code[i]].day.image}" alt="${wmo[responseJson.daily.weather_code[i]].day.description}" class="card-img-top">
                        <h5 class="card-title">${dateFormatted(responseJson.daily.time[i])}</h5>
                        <p class="card-text"> Min Temp      
                            ${responseJson.daily.temperature_2m_min[i]} C
                        </p>
                        <p class="card-text"> Max Temp
                            ${responseJson.daily.temperature_2m_max[i]} C
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("fetch-loading").style.display = "none";
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
getLocation();
