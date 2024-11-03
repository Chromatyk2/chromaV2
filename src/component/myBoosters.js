import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningBooster from "./openingBooster";

function MyBoosters(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [boosters, setBoosters] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'none',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
    function openModal(e) {
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        Axios
            .get("/api/getMyBoosters/"+props.user)
            .then(function(response){
                if(nbBooster == response.data.find((uc) => uc.booster == id).nbBooster){
                    Axios.post('/api/removeBooster',
                        {
                            user: props.user,
                            booster:id
                        })
                        .then(function(response) {
                            Axios
                                .get("/api/getMyBoosters/"+props.user)
                                .then(function(response){
                                    setBoosters(response.data);
                                    setIsOpen(true);
                                    button.disabled = false;
                                })
                        })
                }
            })
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setIsOpen(false);
    }
    useEffect(() => {
        Axios
            .get("/api/getMyBoosters/"+props.user)
            .then(function(response){
                setBoosters(response.data);
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {boosters &&
                    boosters.map((val, key) => {
                        if(val.nbBooster > 0){
                            return(
                                <div className="uniqueMyCardContainer">
                                    <div className={"containerImgBooster"}>
                                        <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                    </div>
                                    <p className="pokemonNameTrade">Possédé(s) : {val.nbBooster}</p>
                                    <button nbBooster={val.nbBooster} value={val.booster} onClick={openModal} className="guessTradeButton">Ouvrir</button>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <OpeningBooster change = {handleState} idBooster={boosterId} user={props.user}/>
            </Modal>
        </>
    )
}
export default MyBoosters
