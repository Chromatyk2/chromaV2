import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function MyCaptures(props) {
  if(props.captures.length > 0){
    return (
      <>
        <div className="myCapturesContainer">
          <p className="titleMyCaptures">Mes Captures</p>
          {props.captures.map((val, key) => {
              return val.shiny == 1 ?
                <div className="myCaptureItem">
                  <p className="myCapturesList shinyPokemonList">{val.pkmName+"(shiny) - "+moment(val.dateCapture).utc().format('DD/MM/YYYY')}</p>
                </div>
                :
                <div  className="myCaptureItem">
                  <p className="myCapturesList">{val.pkmName+" - "+moment(val.dateCapture).utc().format('DD/MM/YYYY')}</p>
                </div>
              })
          }
        </div>
      </>
    );
  }else{
    return (
      <>
        <p className="titleMyCaptures">Vous n'avez jamais capture ce Pokemon</p>
      </>
    );
  }
}
export default MyCaptures
