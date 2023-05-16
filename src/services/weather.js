import { DateTime } from 'luxon'
const BASE_URL= 'https://api.openweathermap.org/data/2.5'

export const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: process.env.REACT_APP_OPENWEATHER_API_KEY }) 

    return fetch(url).then((res) => res.json().then(data => data))
}

export const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather}
}


const formatCurrentWeather = (data) => {
    const { 
        coord: { lat, lon },
        dt,
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]

    return { lat, lon, dt, temp, feels_like, temp_min, temp_max, 
        humidity, name, country, sunrise, sunset, details, icon, speed }
} 

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data
    daily = daily.slice(1, 6).map(dailyForecast => {
        return {
            time: formatToLocalTime(dailyForecast.dt, timezone, 'ccc'),
            temp: dailyForecast.temp.day,
            icon: dailyForecast.weather[0].icon
        }
    })

    hourly = hourly.slice(1, 6).map(hourlyForecast => {
        return {
            time: formatToLocalTime(hourlyForecast.dt, timezone, 'hh:mm a'),
            temp: hourlyForecast.temp,
            icon: hourlyForecast.weather[0].icon
        }
    })

    return { timezone, daily, hourly }
}

export const formatToLocalTime = (secs, zone, format = "cccc dd LLL yyyy' | Last updated: 'hh:mm a '(Local Time)") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

export const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`
