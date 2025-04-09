
// SMHIweatherItem = Ett SMHI väderdata item från dess timeseries-array, såsom dom returneras av getWeatherForecast() (funktionen förenklar SMHI's ursprungliga item)
// Se https://opendata.smhi.se/metfcst/pmp/parameters för mer info om SMHI väderdata paramets i en sådan item

function WeatherCardSmall({weatherItem}){
	const date = new Date(weatherItem.time);
	const day = date.toLocaleString('sv-SE', {weekday: 'long'});
	const time = date.toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric' });

	console.log("Väder item", weatherItem);

	if (weatherItem && weatherItem.parameters && weatherItem.parameters.t) {
		return (
			<div className="weather-card-small">
				<p>{day}</p>
				<p>{time}</p>
				<img src="/weather-icons/clear-day.svg" alt="weather-icon" />
				<p>{weatherItem.parameters.t.value}°C</p>
			</div>
		);
	} else {
		return <p>Ingen väderdata</p>
	}
}

export default WeatherCardSmall;