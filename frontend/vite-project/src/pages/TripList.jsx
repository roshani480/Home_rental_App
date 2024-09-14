import React from 'react'

import { setTriplist } from '../redux/StateSlice';

function TripList() {

  const [loading, setLoading] = useState(true);

  const gettrip = async() =>{

const response = fetch(`http://8003/:userId/trips`, {
  method: "GET"
})

const data = await (await response).json()
dispatch(setTriplist(data))

setLoading(false)

  }

  return (
    <div>TripList
    
    <Loader/>


    
    </div>
  )
}

export default TripList