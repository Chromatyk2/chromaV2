import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import '../App.css'
import moment from 'moment';

function MyNote(props) {
  const [note, setNote] = useState(0);
  const [message, setMessage] = useState("");
  function handleSubmit() {
    return Axios.post('/api/chromaGuess',
    {
      note:note
    }
    ).then(
      (result) => {
        setMessage("Note attribuée");
      }
    )
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>Donne la note:
        <input
          type="number"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}
export default MyNote
