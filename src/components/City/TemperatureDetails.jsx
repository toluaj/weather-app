import React from 'react'
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";
import { getIconUrl } from '../../services/weather';
import { formatToLocalTime } from '../../services/weather';

const TemperatureDetails = ({ weather }) => {

    const { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone } = weather

  return (
    <div>
        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
            <p>{details}</p>
        </div>

        <div className='flex md:flex items-center justify-between text-white py-3'>
            <img src={getIconUrl(icon)} alt="" className='w-10 md:w-20' />
            <p className='flex text-3xl md:text-5xl items-center justify-center'>{temp.toFixed()}°</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTemperature size={18} className='hidden md:block mr-1' />
                    Real feel:
                    <span className='font-medium ml-1'>{feels_like.toFixed()}°</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                    <UilTear size={18} className='hidden md:block mr-1' />
                    Humidity:
                    <span className='font-medium ml-1'>{humidity}%</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                    <UilWind size={18} className='hidden md:block mr-1' />
                    Wind:   
                    <span className='font-medium ml-1'>{speed}km/h</span>
                </div>
            </div>
        </div>

        <div className='flex items-center justify-center space-x-0 md:space-x-2 text-white text-xs py-3'>
            <UilSun className='hidden md:block' />
            <p className='font-light'>
                Rise: <span className='inline-block font-medium md:ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span>
            </p>
            <p className='hidden md:flex font-light'>|</p>
            <UilSunset className='hidden md:block' />
            <p className='font-light'>
                Set: <span className='inline-block font-medium md:ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span>
            </p>
            <p className='hidden md:flex font-light'>|</p>
            <UilArrowUp className='hidden md:block' />
            <p className='font-light'>
                High: <span className='inline-block font-medium md:ml-1'>{temp_max.toFixed()}°</span>
            </p>
            <p className='hidden md:flex font-light'>|</p>
            <UilArrowDown className='hidden md:block' />
            <p className='font-light'>
                Low: <span className='inline-block font-medium ml-1'>{temp_min.toFixed()}°</span>
            </p>
        </div>
    </div>
  )
}

export default TemperatureDetails