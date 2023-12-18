import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import RadiusSlideBar from "./RadiusSlideBar";

import QueryManager from "./QueryManager";

import { useMap } from 'react-leaflet'
import Geolocation from "./Geolocation";

import { useQuery, useQueryClient } from "react-query";

//const queryClient : QueryClient = new QueryClient()
const nominatim_api = "https://nominatim.openstreetmap.org/search?"
const ingv_api = "https://webservices.ingv.it/fdsnws/event/1/query?"

function Overlay() {
    const [location, setLocation] = useState("")
    const [radiusKm, setRadiusKm] = useState(5);

    const map = useMap()

    const {data, isError, isSuccess} = useQuery(['nominatim', location], async ({ queryKey }) => {
        console.log(`QueryKey : ${JSON.stringify(queryKey)}`)
        const http_response = await fetch(nominatim_api + `q=${queryKey[1]}&format=jsonv2`)
        const data = await http_response.json()

        console.log("Received nominatim JSON...")
        console.log(`${data[0]}`)
        
        return data
    }, {enabled : location !== ""})

    const {lat, lon} = !!data?.length ? data[0] : {lat: null, lon: null}

    const ingv_result = useQuery(['ingv', {lat, lon, radiusKm}], async ({ queryKey }) => {
        const http_response = await fetch(ingv_api + `lat=${lat}&lon=${lon}&maxradiuskm=${radiusKm}&starttime=2023-11-18T00:00:00`)
        console.log(http_response) 
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
            <Geolocation></Geolocation>
            <SearchBar setLocation={setLocation}></SearchBar>
            <RadiusSlideBar setRadiusKm={setRadiusKm}></RadiusSlideBar>
        </>
    );
}

export default Overlay;