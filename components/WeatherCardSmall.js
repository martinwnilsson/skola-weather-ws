
// SMHIweatherItem = Ett SMHI vÃ¤derdata item frÃ¥n dess timeseries-array, sÃ¥som dom returneras av getWeatherForecast() (funktionen fÃ¶renklar SMHI's ursprungliga item)
// Se https://opendata.smhi.se/metfcst/pmp/parameters fÃ¶r mer info om SMHI vÃ¤derdata paramets i en sÃ¥dan item

function WeatherCardSmall({ weatherItem }) {
	console.debug("Väder item", weatherItem);

	const date = new Date(weatherItem.time);
	const day = date.toLocaleString('sv-SE', {weekday: 'long'});
	const time = date.toLocaleString('sv-SE', { hour: 'numeric', minute: 'numeric' });

	if (weatherItem && weatherItem.parameters && weatherItem.parameters.t) {
		return (
			<div className="weather-card-small flex flex-col justify-center">
				<p className="text-center">{day}</p>
				<p className="text-center">{time}</p>
				<img className="w-[4rem]" src={"/weather-icons/weather-icon-" + weatherItem.parameters.Wsymb2.value + ".png"} alt="weather-icon" />
				<p className="text-center">{weatherItem.parameters.t.value}Â°C</p>
			</div>
		);
	} else {
		return <p>Ingen vÃ¤derdata</p>
	}
}

export default WeatherCardSmall;