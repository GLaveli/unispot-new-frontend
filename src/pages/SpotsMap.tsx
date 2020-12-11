import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { mapIconUni } from '../util/mapConfig';
import api from '../services/api';


import 'leaflet/dist/leaflet.css';

import logo from '../images/spot-map.png';
import '../styles/pages/spotMap.css';

let theme = "light-v10";


interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function SpotsMap() {

  const [spots, setSpots] = useState<Spot[]>([]);


  useEffect(() => {
    api.get('spots').then(response => {
      setSpots(response.data);

    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logo} alt="logoMarker" className="logoMarker" />
          <h2>Escolha um marcador no mapa</h2>
          <p>Verifique sempre a disponibilidade e as regras de visita!</p>
        </header>
        <footer>
          <strong>
            Florianópolis
     </strong>
          <span>
            Santa Catarina
      </span>
        </footer>
      </aside>

      <Map
        center={[-27.6045806, -48.5157196]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/${theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {/* University Marker */}
        {
          spots.map(spot => {
            return (
              <Marker
                icon={mapIconUni}
                position={[spot.latitude, spot.longitude]}
                key={spot.id}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {spot.name}
                  <Link to={`/spot/${spot.id}`} >
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to="/create" className="create-spot" >
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default SpotsMap;