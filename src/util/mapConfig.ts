import Leaflet from 'leaflet';
import mapMarkerImg from '../images/spot-marker.png';
import mapUniMarkerImg from '../images/spot-uni-marker.png';

export const mapIcon = Leaflet.icon({
 iconUrl: mapMarkerImg,
 iconSize: [40, 59],
 iconAnchor: [20, 59],
 popupAnchor: [170, 2]

})

export const mapIconUni = Leaflet.icon({
 iconUrl: mapUniMarkerImg,
 iconSize: [40, 68],
 iconAnchor: [20, 68],
 popupAnchor: [170, 2]
})





