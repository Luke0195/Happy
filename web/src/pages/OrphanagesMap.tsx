import React from 'react';
import {Link} from 'react-router-dom';
import { FiPlus} from 'react-icons/fi';
import  { Map, TileLayer } from 'react-leaflet';
import mapMarkerImg from '../assets/img/Logo.png';
import dotenv from 'dotenv';

import 'leaflet/dist/leaflet.css';
import '../styles/orphanagesMap.css';
dotenv.config({path:'.env'});


function OrphanagesMap(){
  return(
   <div id="page-map">
     <aside>
          <header>
            <img src={mapMarkerImg} alt="Icone da aplicação"/>
            <h2>Escolha um orfanato no mapa </h2> 
            <p> Muitas crianças esão esperando sua visita :)</p>
          </header>

          <footer>
            <strong> Belo-Horizonte </strong>
            <span> Minas Gerais </span>
          </footer>
     </aside> 
     <Map 
      center={[-19.8966757,-43.9532057 ]}
      zoom={12}
      style= {{ width:'calc(100% - 440px)', height:'100%'}}>
      {/* <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
        <TileLayer 
         url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}

        
        />

      </Map>

    
     
      <Link to="" className="crate-orphanage">
       <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
 )
}

export default OrphanagesMap;