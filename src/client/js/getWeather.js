//WeatherBit url
const weather = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherkey = '&key=ac2f85bdd3ab461dae9436e27e7b5564';

//GET weather data from weatherBit
const getWeather = async (lat, lng, date) => {
    console.log(lat, lng);
    const res = await fetch(weather + "lat=" + lat + "&lon=" + lng + weatherkey);
    try {
        //retrieve data in json format
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export{
    getWeather
}
