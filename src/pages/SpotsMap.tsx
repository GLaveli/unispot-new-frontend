import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import logo from '../images/spot-map.png';
import mapMarkerImg from '../images/spot-marker.png';
import mapUniMarkerImg from '../images/spot-uni-marker.png';

import '../styles/pages/spotMap.css';

let theme = "light-v10";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [40, 59],
  iconAnchor: [20, 59],
  popupAnchor: [170, 2]

});

const mapIconUni = Leaflet.icon({
  iconUrl: mapUniMarkerImg,
  iconSize: [40, 68],
  iconAnchor: [20, 68],
  popupAnchor: [170, 2]
});

function SpotsMap() {
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
        <TileLayer url={`http://api.mapbox.com/styles/v1/mapbox/${theme}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        <Marker
          icon={mapIcon}
          position={[-27.6045806, -48.5157196]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240}>
            Ohh você mim aclicou!
          </Popup>
        </Marker>

        {/* University Marker */}
        <Marker
          icon={mapIconUni}
          position={[-27.6019965, -48.5205282]}
        >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Universidade Fedral de Santa Cataralha
            <Link to="" >
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>

      </Map>

      <Link to="/" className="create-spot" >
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default SpotsMap;