import { useState } from 'react'
import './App.css'

import { MapContainer, TileLayer } from 'react-leaflet'

function App() {
  return (
    <>
      <MapContainer center={[40.847, 14.265]} zoom={10}>    
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default App
