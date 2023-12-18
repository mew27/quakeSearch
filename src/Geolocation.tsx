import { useEffect } from "react"
import { useMap } from 'react-leaflet'

function Geolocation() {
    const map = useMap()
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(`Geolocation is : lat ${pos.coords.latitude} long ${pos.coords.longitude}`)
        map.setView([pos.coords.latitude, pos.coords.longitude])
      }, () => {console.log("There was an error")})
    }, [])
    return <></>
}

export default Geolocation