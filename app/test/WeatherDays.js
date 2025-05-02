"use client"

import WeatherCardSmall from "@/components/WeatherCardSmall.js";
import { getWeatherForecast } from "@/logic/data.js";
import { useEffect, useState } from "react";

const WeatherDays = () => {

    /* 
        Skapar en property weatherData, tillsammans med en 'setter'-funktion, att spara h�mtad SMHI v�derdata i 
        1) React's useState g� att propertyn beh�ller sitt värde mellan renderingar (vilket variabler/property's normalt inte g�r)
        2) Setter-funktionen tvingar komponenten till om-rendering
    */
    const [weatherData, setWeatherData] = useState(null);

    /*
        Funktionen som skickas till useEffect k�rs efter att komponenten renderats
        Praxis �r att g�ra API-anrop i useEffect, och spara resultatet i en property med hj�lp av useState (dess 'setter'-funktion)
    */
    useEffect(() => {
        // Anropa getWeatherForecast med latitud och longitud för Karlstad
        getWeatherForecast(59.3793, 13.5036)
            .then(SMHIdata => {
                setWeatherData(SMHIdata);
            })
            .catch(error => console.error(error));
    }, []); // Ett villkor som �r tomt, en tom array, betyder att useEffect bara k�rs en g�ng, n�r komponenten laddas f�rsta g�ngen


    if (weatherData) {
        return <div className="flex flex-row justify-center gap-4">
            <WeatherCardSmall weatherItem={weatherData[0]} />
            <WeatherCardSmall weatherItem={weatherData[1]} />
            <WeatherCardSmall weatherItem={weatherData[2]} />
        </div>
    } else {
        return <div className="flex flex-row justify-center gap-4">
            <p>Laddar v�derdata...</p>
        </div>
    }
}

export default WeatherDays;