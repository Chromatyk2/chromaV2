import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningBooster from "./openingBooster";
import MyCards from "./myCards";

function ListUserTcg(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [list, setList] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);
    const [pseudo, setPseudo] = React.useState(null);
    const [page, setPage] = React.useState(null);

    useEffect(() => {
        Axios
            .get("/api/getListUser")
            .then(function(response){
                setList(response.data);
            })
    }, [])
    function showUserList(e) {
        setPage(e.target.getAttribute("page"));
        setPseudo(e.target.getAttribute("pseudo"));

    }
    function searchUser(e) {
        Axios
            .get("/api/getListUser/"+e.target.value)
            .then(function(response){
                setList(response.data);
            })

    }
    return (
        <>
            <input className={"searchPlayer"} onChange={searchUser} placeholder={"Cherchez un joueur"} type="text" id="name" name="name"/>
            {page ?
                <MyCards user={pseudo} />
                :
                list &&
                list.map((val, key) => {
                    return(
                        <>
                            <div className={"listUser"}>
                                <div className="listUserElement">
                                    <p>{val.user}</p>
                                    <p>{val.nbCardUser} cartes</p>
                                    <button className={"buttonShowList"} pseudo={val.user} page={"cardListUser"} onClick={showUserList}>Voir</button>
                                </div>
                            </div>
                        </>
                    )
                })
            }

        </>
    )
}
export default ListUserTcg
