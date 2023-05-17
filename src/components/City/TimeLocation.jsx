import React from 'react'
import { formatToLocalTime } from '../../services/weather'

const TimeLocation = ({weather}) => {

  const { country, dt, name, timezone } = weather

  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-white text-xs md:text-base font-extralight justify-evenly'>{formatToLocalTime(dt, timezone)}</p>
        </div>

        <div className='flex items-center justify-center my-0 md:my-3'>
            <p className='text-white text-xl font-normal' >{name}, {country}</p>
        </div>
    </div>
  )
}

export default TimeLocation