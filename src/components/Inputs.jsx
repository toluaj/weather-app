import  React, { useState } from 'react'
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons'
import { toast } from 'react-toastify'

const Inputs = ({ setQuery, setUnits, units }) => {

  const [city, setCity] = useState('')

  const handleCitySearch = () => {
    if (city !== '') setQuery({ q: city })
  }

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.name
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching your location...')
      navigator.geolocation.getCurrentPosition((position) => {
        toast.dismiss()
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        setQuery({ lat, lon })
      })
    }
  }

  return (
    <div className='flex md:flex justify-center my-2 md:my-6'>
        <div className='flex w-64 md:w-3/4 items-center justify-start space-x-1 sm:space-x-4 mr-2'>
          <input placeholder='Search city e.g. London' type="text" value={city} onChange={(e) => handleInputChange(e)} 
            className='text-base md:text-lg font-light p-2 w-full shadow-xl focus:outline-none capitalize 
            placeholder:normal-case placeholder:text-base md:placeholder:text-lg rounded-md h-10' />
            <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-110' onClick={handleCitySearch}/>
            <UilMapMarker size={25} className='text-white cursor-pointer transition ease-out hover:scale-110' onClick={handleLocationClick}/>
        </div>

        <div className='flex w-auto md:w-1/4 items-center justify-center'>
            <button className='text-xl text-white font-light px-1' name='metric' onClick={handleUnitsChange}>°C</button>
            <p className='text-sm md:text-xl text-white'>|</p>
            <button className='text-xl text-white font-light px-1' name='imperial' onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs