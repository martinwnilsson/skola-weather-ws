"use client"

import WeatherCardSmall from "@/components/WeatherCardSmall.js";
import { getWeatherForecast } from "@/logic/data.js";
import { useEffect, useState } from "react";

const TestClient = () => {

    const [weatherData, setWeatherData] = useState([""]);

    useEffect(() => {
        // Anropa getWeatherForecast med latitud och longitud för Karlstad
        getWeatherForecast(59.3793, 13.5036)
            .then(SMHIdata => {
                setWeatherData(SMHIdata);
            })
            .catch(error => console.error(error));
    }, []);


    return <WeatherCardSmall weatherItem={weatherData[0] } />
}

export default TestClient;