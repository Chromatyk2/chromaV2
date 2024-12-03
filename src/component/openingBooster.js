import React,{useState, useEffect, Suspense} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import OpeningCards from "./openingCards";

function OpeningBooster(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [things, setThings] = useState(true);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    let [state, setState] = useState("Initial");
    let [rarities, setRarities] = useState(null);
    function handleState() {
        setTimeout(() => {
            props.change();
        }, 1000);
    }

    useEffect(() => {
        fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result.cards);
                    Axios
                        .get("/api/getRaritiesByBooster/"+props.idBooster)
                        .then(function(response){
                            setRarities(response.data);
                        })
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    const customStyles = {
        textModal: {
            fontSize:'30px',
            textAlign:'center',
            color:"white"
        },
        imgModal: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "drop-shadow(2px 4px 6px black)"
        },imgModal2: {
            width:'200px',
            marginBottom:'30px',
            borderRadius: "25px",
            filter: "grayscale(1)"
        },
    };
    return (
        <>
            <div className={"discoveredCardsContainer"}>
                {
                    rarities &&
                    <OpeningCards block={props.block} user={props.user} change={handleState} boosterGuru={props.boosterGuru} idBooster={props.idBooster} items={items}
                                  rarities={rarities}/>

                }
            </div>
        </>
    )
}

export default OpeningBooster
