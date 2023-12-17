import { useState } from "react";
import SearchBar from "./SearchBar";
import RadiusSlideBar from "./RadiusSlideBar";
import { useQueries, useQueryClient } from "react-query";

import QueryManager from "./QueryManager";

//const queryClient : QueryClient = new QueryClient()
const nominatim_api = "https://nominatim.openstreetmap.org/search?"
//const ingv_api = "https://webservices.ingv.it/fdsnws/event/1/query?"

function Overlay() {
    const [location, setLocation] = useState("")
    const [radiusKm, setRadiusKm] = useState(5);

    return (
        <>
            {location === "" ? null : <QueryManager></QueryManager>}
            <SearchBar setLocation={setLocation}></SearchBar>
            <RadiusSlideBar setRadiusKm={setRadiusKm}></RadiusSlideBar>
        </>
    );
}

export default Overlay;