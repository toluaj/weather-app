import React from 'react'
import { cities } from '../variables/topCities'

const TopCities = ({ setQuery }) => {

  return (
    <div className='flex-wrap w-fit md:w-auto md:flex items-center justify-around my-6'>
        {cities.map((city) => (
            <button className='text-white text-sm md:text-lg font-medium mr-4' key={city.id} 
              onClick={() => setQuery({q: city.title})}>{city.title}
            </button>
        ))}
    </div>
  )
}

export default TopCities