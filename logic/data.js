
const APIentry = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/";

export async function getData(lat, lon){
	const url = APIentry + "lon/" + lon + "/lat/" + lat + "/data.json";
	
	// HÃ¤mta text-baserad data frÃ¥n SMHI API. await -> vÃ¤nta hÃ¤r pÃ¥ att fetch Ã¤r klar
	// fetch Ã¤r en async funktion och programkÃ¶rning gÃ¥r utan await vidare fast fetch inte Ã¤r klar
	const response = await fetch(url);

	// Konvertera text-baserad data till JSON-format, Ã¤ven detta Ã¤r en async funktion och krÃ¤ver await fÃ¶r att inte direkt gÃ¥ vidare
	const data = await response.json();

	return data;

}


export async function getWeatherForecast(lat, lon) {
    const smhiApiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    console.log("hämtar data");
    try {
        const response = await fetch(smhiApiUrl);
        const data = await response.json();

        // Debuggar raw respons
        console.debug("Raw response:", data);

        // Konverterar en parameter-array till ett objekt med nycklar som parameter-namn
        function paramArrayToObject(paramArray) {
            const paramObject = {};
            paramArray.forEach(param => {
                console.log("param", param);
                paramObject[param.name] = {
                    value: param.values[0],
                    unit: param.unit
                };
            });
            return paramObject;
        }

        // Extrahera relevanta vÃ¤derprognoser
        const forecasts = data.timeSeries.map(entry => ({
            time: entry.validTime,
            parameters: paramArrayToObject(entry.parameters)
        }));

        // Debuggar processad data
        console.debug("Parsed response:", forecasts);

        return forecasts;
    } catch (error) {
        console.error("Ett fel uppstod:", error);
        throw error;
    }
}