import "./SearchBar.css"
import MagnifyingGlass from "./assets/searchMagnifyGlass.svg"

import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'

const nominatim_api = "https://nominatim.openstreetmap.org/search?"
//const ingv_api = "https://webservices.ingv.it/fdsnws/event/1/query?"

function SearchBar() {
    let [searchBarText, setSearchBarText] = useState("")
    let [query, setQuery] = useState("")
    
    let map = useMap()
    
    useEffect(() => {
        if (query !== "") {
            fetch(nominatim_api + `q=${query}&format=jsonv2`).then((response) => response.json()).then((data) => {
                console.log("Received nominatim JSON...")
                console.log(`${data[0]}`)

                map.setView([data[0].lat, data[0].lon])
            }).catch((err) => {console.log("Error querying Openstreetmap Nominatim")})
        }
    }, [query, setQuery])

    return (
        <>
            <div className="SearchBarContainer">
                <div className="SearchBar">
                <div>
                    <input className="SearchBarInput" type="text" placeholder="Cerca località..." value={searchBarText} onChange={(evt) => {
                        //evt.preventDefault()
                        setSearchBarText(evt.target.value)
                    }} onKeyDown={(evt) => {
                        if (evt.key == 'Enter') {
                            setQuery(searchBarText)
                        }
                    }}></input>
                </div>
                <img id="glassSvg" src={MagnifyingGlass} onClick={(evt) => {
                    //evt.preventDefault()
                    setQuery(searchBarText)
                }}></img>    
                </div>  
            </div>
        </>
    )
}

export default SearchBar