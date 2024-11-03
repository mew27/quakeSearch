import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import RadiusSlideBar from "./RadiusSlideBar";

import QueryManager from "./QueryManager";

import { useMap, Marker} from 'react-leaflet'
import Geolocation from "./Geolocation";

import { useQuery, useQueryClient } from "react-query";

//const queryClient : QueryClient = new QueryClient()
const nominatim_api = "https://nominatim.openstreetmap.org/search?"
const ingv_api = "https://webservices.ingv.it/fdsnws/event/1/query?"

function mod(n : number, m : number) : number {
    return ((n % m) + m) % m;
}

function numToStringFormat(a : number) : string {
    return a < 10 ? '0' + a.toString() : a.toString() 
}

function Overlay() {
    const [location, setLocation] = useState("")
    const [radiusKm, setRadiusKm] = useState(5);

    const map = useMap()

    const {data : coordinates, isError, isSuccess} = useQuery(['nominatim', location], async ({ queryKey }) => {
        //console.log(`QueryKey : ${JSON.stringify(queryKey)}`)
        const http_response = await fetch(nominatim_api + `q=${queryKey[1]}&format=jsonv2`)
        const response = await http_response.json()

        console.log("Received nominatim JSON...")
        //console.log(`${datastr}`)
        
        return response[0]
    }, {enabled : location !== ""})

    const lat = coordinates?.lat
    const lon = coordinates?.lon

    const {data : earthquakes} = useQuery(['ingv', {lat, lon, radiusKm}], async ({ queryKey }) => {
        const now = new Date(Date.now())
        const month     : number = mod(now.getMonth() - 1, 12) 
        const month_str : string = numToStringFormat(month)
        const day_str   : string = numToStringFormat(now.getDate())
        const year      : number = (now.getMonth() - 1) > 0 ? now.getFullYear() : now.getFullYear() - 1  

        const http_response      = await fetch(ingv_api + `lat=${lat}&lon=${lon}&maxradiuskm=${radiusKm}&starttime=${year}-${month_str}-${day_str}T00:00:00`)
        const http_response_text = await http_response.text()

        const parser = new DOMParser();
        const doc = parser.parseFromString(http_response_text, "text/xml");
        
        const origins = doc.querySelectorAll("event > origin")

        let earthquakes_data : number [] [] = []

        if (origins.length === 0) {
            throw new Error("No data recovered!")
        }

        origins.forEach((origin) => {
            const origin_lat = origin.getElementsByTagName("latitude")[0].getElementsByTagName("value")[0].textContent
            const origin_lon = origin.getElementsByTagName("longitude")[0].getElementsByTagName("value")[0].textContent
            
            console.log(`Adding origin ${origin_lat} and ${origin_lon} to the map`)
            if (origin_lat !== null && origin_lon !== null) {
                earthquakes_data.push([Number.parseFloat(origin_lat), Number.parseFloat(origin_lon)])
            }
        })

        console.log(http_response) 

        return earthquakes_data
    }, {enabled : !!lat && !!lon})

    if (isError) {
        console.log("Error loading nominatim data")
    } else if (isSuccess) {    
        if (!!lat && !!lon) {
            map.setView([lat, lon])
        }
    }

    return (
        <>  
            {earthquakes?.map((latlon) => {
                return <Marker position={[latlon[0], latlon[1]]}></Marker>
            })}
            <Geolocation></Geolocation>
            <SearchBar setLocation={setLocation}></SearchBar>
            <RadiusSlideBar setRadiusKm={setRadiusKm}></RadiusSlideBar>
        </>
    );
}

export default Overlay;
