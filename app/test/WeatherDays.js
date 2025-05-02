"use client"

import WeatherCardSmall from "@/components/WeatherCardSmall.js";
import { getWeatherForecast } from "@/logic/data.js";
import { useEffect, useState } from "react";

const WeatherDays = () => {

    /* 
        Skapar en property weatherData, tillsammans med en 'setter'-funktion, att spara hämtad SMHI väderdata i 
        1) React's useState gö att propertyn behåller sitt vÃ¤rde mellan renderingar (vilket variabler/property's normalt inte gör)
        2) Setter-funktionen tvingar komponenten till om-rendering
    */
    const [weatherData, setWeatherData] = useState(null);

    /*
        Funktionen som skickas till useEffect körs efter att komponenten renderats
        Praxis är att göra API-anrop i useEffect, och spara resultatet i en property med hjälp av useState (dess 'setter'-funktion)
    */
    useEffect(() => {
        // Anropa getWeatherForecast med latitud och longitud fÃ¶r Karlstad
        getWeatherForecast(59.3793, 13.5036)
            .then(SMHIdata => {
                setWeatherData(SMHIdata);
            })
            .catch(error => console.error(error));
    }, []); // Ett villkor som är tomt, en tom array, betyder att useEffect bara körs en gång, när komponenten laddas första gången


    if (weatherData) {
        return <div className="flex flex-row justify-center gap-4">
            <WeatherCardSmall weatherItem={weatherData[0]} />
            <WeatherCardSmall weatherItem={weatherData[1]} />
            <WeatherCardSmall weatherItem={weatherData[2]} />
        </div>
    } else {
        return <div className="flex flex-row justify-center gap-4">
            <p>Laddar väderdata...</p>
        </div>
    }
}

export default WeatherDays;