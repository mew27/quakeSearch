import { useState } from "react";
import "./RadiusSlideBar.css"

function RadiusSlideBar() {
    let [radiusKm, setRadiusKm] = useState(5);

    return (
        <div className="radius-slidebar-container">
            <div style={{display : "flex", flexDirection : "column", alignItems: "center", marginBottom : "20px"}}>
                <input className="radius-slidebar" type="range" min="5" max="100" step="5" defaultValue={radiusKm} onChange={(evt) => {
                    setRadiusKm(Number(evt.target.value))
                }}></input>
                <div className="number-container">{radiusKm} Km </div>
            </div>
        </div>
    );
}

export default RadiusSlideBar;