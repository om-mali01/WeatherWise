require('dotenv').config();
const api_key = process.env.API_KEY;

// Base URL for the OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to perform the weather search
function performSearch() {
    const cityName = document.getElementById('cityInput').value;

    const fullUrl = `${baseUrl}?q=${cityName}&appid=${api_key}`;

     // Make a GET request
    fetch(fullUrl)
        .then(response => response.json()) //parse the response to json
        .then(data => {
            //checking the error 
            if (data.cod === "404" && data.message === "city not found") {
                throw new Error('City not found');
            }
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const wind = data.wind;

            display(temperature, humidity, wind);
        })
        .catch(error => {
            if (error.message == 'City not found'){
                alert('City not found !')
            }
            else {
            console.error('Error:', error);
            }
        });
}

//function to display
function display(temperature, humidity, wind) {
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');

    temperatureElement.textContent = (temperature-273.15).toFixed(2);
    humidityElement.textContent = humidity;
    windElement.textContent = `Wind Speed: ${wind.speed} m/s, Wind Direction: ${wind.deg}°`;
}
