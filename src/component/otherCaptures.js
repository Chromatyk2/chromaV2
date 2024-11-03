import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { useCookies } from 'react-cookie';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';

function OtherCaptures(props) {
const [trades, setTrades] = useState([]);
const [cookies, setCookie] = useCookies();
const pseudo = cookies.user.data[0].login;
    return (
        <>
            <p className="titleMyCaptures">Personne ne propose ce pokemon a l'echange</p>
        </>
    );
}
export default OtherCaptures
