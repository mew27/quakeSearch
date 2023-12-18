import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Overlay from './Overlay'
import { Map } from 'leaflet' 

function App() {
  
  return (
    <>
      <MapContainer center={[41.902, 12.496]} zoom={10} zoomControl={false}>
        {createPortal(<Overlay></Overlay>, document.getElementById("root")!)}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default App
