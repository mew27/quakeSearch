import "./SearchBar.css"
import MagnifyingGlass from "./assets/searchMagnifyGlass.svg"

function SearchBar() {

    return (
        <>
            <div className="SearchBarContainer">
                <div className="SearchBar">
                <input className="SearchBarInput" type="text" placeholder="Cerca località..." ></input>
                <img id="glassSvg" src={MagnifyingGlass}></img>    
                </div>  
            </div>
        </>
    )
}

export default SearchBar