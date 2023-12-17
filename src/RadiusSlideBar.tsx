import { useEffect, useState } from "react";
import "./RadiusSlideBar.css"

interface RadiusSlideBarProps {
    setRadiusKm : (radiusKm : number) => void 
}

function RadiusSlideBar(props : RadiusSlideBarProps) {
    let [radiusKm, setRadiusKm] = useState(5);

    useEffect(() => {
        let timerID = setTimeout(() => props.setRadiusKm(radiusKm), 500)

        return () => {clearTimeout(timerID)};
    }, [radiusKm, setRadiusKm])

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