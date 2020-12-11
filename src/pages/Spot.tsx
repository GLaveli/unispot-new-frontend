import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { mapIcon } from '../util/mapConfig';

import '../styles/pages/spot.css';
import Sidebar from "../components/Sidebar";
import api from "../services/api";

interface Spot {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>
};

interface SpotParams {
  id: string;
};

export default function Spot() {
  const params = useParams<SpotParams>();
  const [spot, setSpot] = useState<Spot>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`spots/${params.id}`).then(response => {
      setSpot(response.data);

    })
  }, [params.id]);

  if (!spot) {
    return <p>Loading...</p>
  };

  return (
    <div id="page-spot">
      <Sidebar />
      <main>
        <div className="spot-details">
          <img src={spot.images[activeImageIndex].url} alt={spot.name} />

          <div className="images">
            {spot.images.map((image, index) => {
              return (
                <button
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  key={image.id}
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={spot.name} />
                </button>
              )
            })}

          </div>

          <div className="spot-details-content">
            <h1>{spot.name}</h1>
            <p>{spot.about}</p>

            <div className="map-container">
              <Map
                center={[spot.latitude, spot.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[spot.latitude, spot.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopner noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${spot.latitude},${spot.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{spot.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {spot.opening_hours}
              </div>
              {
                spot.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                      Atendemos <br />
                      fim de semana
                  </div>
                ) : (
                    <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF669D" />
                        Não atendemos <br />
                        fim de semana
                    </div>
                  )
              }
            </div>

            {/*
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
            */}

          </div>
        </div>
      </main>
    </div>
  );
}