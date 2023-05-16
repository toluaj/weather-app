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

function App() {

  const [query, setQuery] = useState({ q: 'lagos' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        await getFormattedWeatherData({...query, units}).then(
          (data) => { 
            setWeather(data) 
            setIsLoading(false)
          });
        }
      catch (error) {
        toast.info(`Could not get weather details for ${query.q}`)
      }
    }
      fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if(!weather) return 'from-cyan-700 to blue-700'
    const threshold = units === 'metric' ? 25 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`bg-gradient-to-t ${formatBackground()}`}>
      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()}
        h-fit shadow-xl shadow-gray-400 border-l-pink-600 rounded-lg`}>
      <TopCities setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather ? (
        <>
          <TimeLocation weather={weather} />
          <TemperatureDetails weather={weather} />
          <Forecast type="hourly" forecast={weather.hourly} />
          <Forecast type="daily" forecast={weather.daily} />
        </> ) : null}

        {isLoading === true && (<div className="max-w-full max-h-full flex justify-center items-center "> 
          <ThreeDots color="pink" />
        </div> ) }
        <ToastContainer autoClose={5000} />

      </div>
    </div>
  );
}

export default App;
