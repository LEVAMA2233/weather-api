console.log("Ya jala pa");
async function handleFetchClick(){
    console.log("Boton fetch clickeado");
    
    const latitude = document.getElementById("latitude-input").value;
    const longitude = document.getElementById("longitude-input").value;
    const tempDisplay = document.getElementById("temp-display");
    const windDisplay = document.getElementById("wind-display"); // Nuevo
    const resultBox = document.getElementById("weather-result"); // Nuevo

    try {
        // 2. Llamar a la API
        const currentWeather = await fetchWeatherData(latitude, longitude);

        // 3. Actualizar el DOM (Pantalla)
        tempDisplay.textContent = currentWeather.temperature;
        
        // Agregar la velocidad del viento (la API suele devolver 'windspeed')
        windDisplay.textContent = currentWeather.windspeed; 

        // Hacer visible la caja de resultados
        resultBox.classList.remove("hidden"); 

    } catch (error) {
        console.error("Hubo un error al obtener el clima:", error);
        alert("No se pudo obtener el clima. Revisa tu conexión o las coordenadas.");
    }
}