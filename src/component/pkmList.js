import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
function PkmList(props) {
  const pkmList = props.list;
  const shinys = pkmList.filter(item => item.shiny == 1);
  const nbShiny = shinys.length;
  const nbTotal = pkmList.length;
    return (
      <>
        <div className="stats">
          <p className="labelStats">Shiny<br/><span className="valueStats">{nbShiny}</span></p>
          <p className="labelStats">Total<br/><span className="valueStats">{nbTotal}</span></p>
        </div>
          <Pagination
            itemsPerPage={32}
            items={props.list}
          />
        </>
     );
}
export default PkmList
