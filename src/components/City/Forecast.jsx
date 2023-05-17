import React from 'react'
import { getIconUrl } from '../../services/weather'

const Forecast = ({ type, forecast }) => {

  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>{type} forecast</p>
        </div>
            <hr className='my-2'/>

            <div className='flex items-center justify-between text-white'>
                {forecast.map((forecast, index) => (
                    <div className='flex flex-col items-center justify-center' key={index}>
                        <p className='font-light text-xs md:text-sm'>{forecast.time}</p>
                        <img src={getIconUrl(forecast.icon)} alt="" className='w-8 md:w-16 my-1' />
                        <p className='font-medium text-xs md:text-base'>{forecast.temp.toFixed()}°</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Forecast