
// SMHIweatherChunk = Ett SMHI väderdata item från dess timeseries-array
// Se https://opendata.smhi.se/metfcst/pmp/parameters för mer info om SMHI väderdata

function WeatherCardSmall(SMHIweatherChunk){
	const date = new Date(SMHIweatherChunk.validTime);
	const day = date.toLocaleString('sv-SE', {weekday: 'long'});
	const time = date.toLocaleString('sv-SE', {hour: 'numeric', minute: 'numeric'});
	return (
		<div className="weather-card-small">
			<p>{day}</p>
			<p>{time}</p>
			<img src={require(`../assets/weather-icons/${SMHIweatherChunk.parameters.weather1}.png`)} alt="weather-icon"/>
			<p>{SMHIweatherChunk.parameters.temperature}°C</p>
		</div>
	);
}