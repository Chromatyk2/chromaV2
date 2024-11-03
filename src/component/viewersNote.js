import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import CreateTrade from './createTrade.js';
import NbProposition from './nbProposition.js';
import '../App.css'
import moment from 'moment';

function ViewersNote(props) {
  document.getElementById("root").style.background = 'transparent';
  const [myNote, setMyNote] = useState(null);
  const [color, setColor] = useState("blue");
    useEffect(() => {
      Axios
        .get("/api/getViewersNote")
        .then(function(response){
          var sum = 0;
          response.data.map((val, key) => {
            sum+=val.note;
          });
          setMyNote(Math.round(sum/response.data.length));
        })
    }, [])
    useEffect(() => {
      if(myNote > 14){
        setColor("green");
      }
      if(myNote >= 8 && myNote <= 14){
        setColor("orange");
      }
      if(myNote < 8){
        setColor("red");
      }
    }, [myNote])
    if (myNote !== null){
      return (
        <>
          <p style={{color:color}} className="owner">{myNote}</p>
        </>
      );
    }
  }
export default ViewersNote
