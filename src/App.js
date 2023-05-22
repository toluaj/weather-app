import { useEffect, useState } from "react"
import Forecast from './components/City/Forecast';
import TemperatureDetails from './components/City/TemperatureDetails';
import TimeLocation from './components/City/TimeLocation';
import Inputs from './components/Inputs';
import TopCities from './components/TopCities';
import { getFormattedWeatherData } from './services/weather';
import { ThreeDots } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UilInfoCircle } from '@iconscout/react-unicons'
import { UilSad } from '@iconscout/react-unicons'
import { Analytics } from '@vercel/analytics/react';

function App() {

  const [query, setQuery] = useState({ q: 'lagos' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        isLoading && toast.info(`Fetching weather data for ${query.q}`, { icon: <UilInfoCircle />, progressStyle: {width: 100} })
        await getFormattedWeatherData({...query, units}).then(
          (data) => {
            setWeather(data) 
            setIsLoading(false)
          });
        }
      catch (error) {
        toast.error(`Could not get weather details for ${query.q}`, { autoClose: 5000, icon: <UilSad /> })
      }
    }
      fetchWeather()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, units])

  const formatBackground = () => {
    if(!weather) return 'from-yellow-700 to-orange-700'
    const threshold = units === 'metric' ? 25 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`bg-gradient-to-t ${formatBackground()}`}>
      <div className={`mx-auto max-w-screen-md py-5 px-16 md:px-32 bg-gradient-to-br ${formatBackground()}
        h-auto shadow-xl shadow-gray-400 border-l-pink-600 rounded-lg`}>
      <TopCities setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather ? (
        <> 
          <TimeLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          <Forecast type="hourly" forecast={weather && weather.hourly} />
          <Forecast type="daily" forecast={weather && weather.daily} />
        </> 
      ) : <div className={`bg-gradient-to-t ${formatBackground()}`}></div>}

        {isLoading === true && (<div className="max-w-full max-h-full flex justify-center items-center "> 
          <ThreeDots color="pink" />
        </div> ) }
        <ToastContainer autoClose={5000} />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
