import React, { ChangeEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from "react-router-dom";
import { LeafletMouseEvent } from 'leaflet';
import { mapIcon } from '../util/mapConfig';
import api from "../services/api";

import { FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

import '../styles/pages/create-spot.css';


export default function Createspot() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setHours] = useState('');
  const [open_on_weekends, setOpenWeek] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviwImage] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  };

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    };

    const imagesBlob = Array.from(event.target.files);
    setImages(images);
    const imagesBlobPreview = imagesBlob.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviwImage(imagesBlobPreview);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('image', image);
    });

    await api.post('spots', data);

    history.push('/map');

  }

  return (
    <div id="page-create-spot">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-spot-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.6045806, -48.5157196]}
              style={{ width: '100%', height: 280 }}
              zoom={11}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                    position.latitude,
                    position.longitude
                  ]}
                />)}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 500 caracteres</span></label>
              <textarea
                id="name"
                maxLength={500}
                value={about}
                onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImage.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario para visitas</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => setOpenWeek(true)} className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button type="button" onClick={() => setOpenWeek(false)} className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
