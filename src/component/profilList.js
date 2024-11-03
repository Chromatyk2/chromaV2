import React,{useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import PaginationProfil from "./paginateProfil";
function ProfilList(props) {
    return (
        <>
            <PaginationProfil
                itemsPerPage={10}
                items={props.list}
            />
        </>
    );
}
export default ProfilList
