
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import axios from './axiosInstance'
import MapView from './Components/MapView/MapView'
import './Styles/app.scss'
function App () {
    const [locationArray, setLocationArray] = useState([])

    useEffect(() => {
        axios.get().then((response) => {
            const { locations } = response.data
            setLocationArray(locations)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <div >
            <MapView locationArray={locationArray} />
        </div>
    )
}

export default App
