"use client"

import { getWeatherForecast } from "@/logic/data.js";
import { useEffect } from "react"

const TestClient = () => {
    useEffect(() => {
        // Anropa getWeatherForecast med latitud och longitud för Karlstad
        getWeatherForecast(59.3793, 13.5036)
            .then(weather => {
                console.log("Page",weather);
            })
            .catch(error => console.error(error));
    }, []);


    return <p>Hello!</p>
}

export default TestClient;