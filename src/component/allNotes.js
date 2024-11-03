import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function AllNotes(props) {
  document.getElementById("root").style.background = 'transparent';
  const [myNote, setMyNote] = useState(null);
  const [loading, setLoading] = useState(-3);
  const [size, setSize] = useState(-3);
    useEffect(() => {
      Axios
        .get("/api/getMyNote")
        .then(function(response){
            setMyNote(response.data[0].note);
        })
    }, [])
    useEffect(() => {
      clearInterval(timer);
      var timer = setInterval(() => {
        if (loading === myNote ) {
          clearInterval(timer);
          return;
        }
        setLoading((prev) => prev + 1);
      }, 100);

      return () => clearInterval(timer);
    }, [loading]);

    useEffect(() => {
      clearInterval(timer);
      var timer = setInterval(() => {
        if (size === 600) {
          clearInterval(timer);
          return;
        }
        setSize((prev) => prev + 1);
      }, 2);

      return () => clearInterval(timer);
    }, [size]);

    if (myNote !== null){
      return (
        <>
          <div style={{width:"fit-content",display:"block",margin:"auto",marginTop:"100px;"}}>
            <p style={{width:loading/20*100+"%"}} className="owner">CHROMA</p>
            <p className="owner">{loading}</p>
          </div>
        </>
      );
    }
  }
export default AllNotes
