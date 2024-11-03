import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import PaginationTeam from './paginateTeam.js';
import '../App.css'
function PkmListTeam(props) {
    const pkmList = props.list;
    const shinys = pkmList.filter(item => item.shiny == 1);
    const nbShiny = shinys.length;
    const nbTotal = pkmList.length;
    function handleState() {
        props.change();
    }
    return (
        <>
            <div className="stats">
                <p className="labelStats">Shiny<br/><span className="valueStats">{nbShiny}</span></p>
                <p className="labelStats">Total<br/><span className="valueStats">{nbTotal}</span></p>
            </div>
            <PaginationTeam
                change={handleState}
                pkmToUpdate={props.pkmToUpdate}
                itemsPerPage={32}
                items={props.list}
            />
        </>
    );
}
export default PkmListTeam
