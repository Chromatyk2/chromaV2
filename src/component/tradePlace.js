import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import {BrowserRouter, Link} from "react-router-dom";
import Axios from 'axios'
import MyTrades from './myTrades.js';
import '../App.css'

function TradePlace(props) {
  const MINUTE_MS = 1000;
  const pseudo = props.cookies.user.data[0].login;
  const [myTrades, setMyTrades] = useState([]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
     Axios.get('/api/getAllTrades/'+pseudo)
     .then(function(response){
        setMyTrades(response.data);
      })
  }, [])

  if(myTrades.length > 0){
    return(
      <>
       <div className="tradePlaceContainer">
         <p className="titleMyCaptures">Echanges</p>
         <div className="myTradesContainer">
        {myTrades.map((val, key) => {
            return (
              <>
                 <div className="uniqueTradeContainer">
                   <img src={val.pkmImage}></img>
                   <p className="pokemonNameTrade">{val.pkmName}</p>
                   <p className="pokemonNameTrade">({val.pseudo})</p>
                   <Link className="guessTradeButton" to={"/guessTrade/"+val.tradeId}>Proposer un échange</Link>
                 </div>
              </>
            )
            })
        }
        </div>
      </div>
      </>
    )
  }else{
      return(
        <>
          <p className="titleMyCaptures">Echanges</p>
          <p className="noTrade">Pas de pokemon en echange</p>
        </>
      )
    }
}
export default TradePlace
