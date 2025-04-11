
const APIentry = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/";

export async function getData(lat, lon){
	const url = APIentry + "lon/" + lon + "/lat/" + lat + "/data.json";
	
	// Hämta text-baserad data från SMHI API. await -> vÃ¤nta hÃ¤r pÃ¥ att fetch Ã¤r klar
	// fetch är en async funktion som normalt får sköta sig själv medan programmet går vidare, await behövs för att programmet ska vänta på att fetch blir klar det här
	const response = await fetch(url);

	// Konvertera text-baserad data till JSON-format, även detta är en async funktion och kräver await för att inte direkt gå vidare
	const data = await response.json();

	return data;

}


export async function getWeatherForecast(lat, lon) {
    const smhiApiUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
    console.log("Hämtar väderdata...");
    try {
        const response = await fetch(smhiApiUrl);
        const data = await response.json();

        // Debuggar raw respons
        console.debug("Raw response:", data);

        // Konverterar en parameter-array till ett objekt med nycklar som parameter-namn för enklare användning av datan
        function paramArrayToObject(paramArray) {
            const paramObject = {};
            paramArray.forEach(param => {
                paramObject[param.name] = {
                    value: param.values[0],
                    unit: param.unit
                };
            });
            return paramObject;
        }

        // Extrahera relevanta väderprognoser
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