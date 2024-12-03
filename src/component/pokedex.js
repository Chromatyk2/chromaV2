import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function Pokedex(props) {
const [list,setList] = useState([]);
const pseudo = props.cookies.user.data[0].login;
  useEffect(() => {
    Axios
      .get("/api/getByUser/"+pseudo)
      .then(function(response){
          setList(response.data);
      })
    }, [])
    return (
        <>
            <div className={"contentContainer"}>
                <PkmList list={list}/>
            </div>
        </>
    )
}

export default Pokedex
