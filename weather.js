console.log("Ya jala pa");
// 1. Función auxiliar para pedir los datos a la API
async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red');
        }
        const data = await response.json();
        return data.current_weather;
    } catch (error) {
        console.error("Error dentro de fetchWeatherData:", error);
        throw error; // Re-lanzamos el error para que lo capture la otra función
    }
}

// 2. Función principal que se activa con el botón
async function handleFetchClick() {
    console.log("Boton fetch clickeado");

    const latitude = document.getElementById("latitude-input").value;
    const longitude = document.getElementById("longitude-input").value;
    
    const tempDisplay = document.getElementById("temp-display");
    const windDisplay = document.getElementById("wind-display");
    const resultBox = document.getElementById("weather-result");

    try {
        // Llamamos a la función de arriba
        const currentWeather = await fetchWeatherData(latitude, longitude);

        // Actualizamos los textos
        tempDisplay.textContent = currentWeather.temperature;
        
        // Verificamos si existe el elemento de viento antes de asignar
        if(windDisplay) {
            windDisplay.textContent = currentWeather.windspeed;
        }

        // Hacemos visible la caja quitando la clase 'hidden'
        if(resultBox) {
            resultBox.classList.remove("hidden");
        }

    } catch (error) {
        console.error("Error en handleFetchClick:", error);
        alert("Hubo un error al obtener los datos. Verifica la consola para más detalles.");
    }
}