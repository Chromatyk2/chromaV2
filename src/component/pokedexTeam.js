import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmListTeam from './pkmListTeam.js'

function PokedexTeam(props) {
    function handleState() {
        props.change();
    }
    return (
        <>
            <div  style={{paddingTop:"15px",minHeight:"100%"}} className={"contentContainer"}>
                <PkmListTeam change={handleState} pkmToUpdate={props.pkmToUpdate} list={props.list}/>
            </div>
        </>
    )
}

export default PokedexTeam