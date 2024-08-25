import React from 'react'
import {MoonLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <div className='spinner-container'>
        <MoonLoader className='spinner'
            loading 
            size={60}
        />
    </div>
  )
}

export default Spinner