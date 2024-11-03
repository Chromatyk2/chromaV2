import React,{useState, useEffect} from 'react';
import { useParams,BrowserRouter, Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function NbProposition(props) {
  const [disable, setDisable] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
      Axios
        .get("/api/getCountPropositionByTrade/"+props.id)
        .then(function(response){
            setCount(response.data[0].count);
      })
  }, [])
    return(
      <>
        <Link className="guessTradeButton" to={"/guess/"+props.id}>{count} propositions(s)</Link>
      </>
    )
}
export default NbProposition
