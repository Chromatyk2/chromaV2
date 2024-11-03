import React,{useState, useEffect} from 'react';
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
        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+props.idBooster)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result.data);
                    if(result.data.length == 250){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+props.idBooster+"&page=2")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })
                    }
                    if(props.idBooster == "swsh45"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh45sv")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })
                    }else if(props.idBooster == "swsh9"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh9tg")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else if(props.idBooster == "swsh10"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh10tg")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else if(props.idBooster == "swsh11"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh11tg")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else if(props.idBooster == "swsh12"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh12tg")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else if(props.idBooster == "swsh12pt5"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:swsh12pt5gg")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else if(props.idBooster == "sm115"){
                        fetch("https://api.pokemontcg.io/v2/cards?q=set.id:sma")
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    result.data.map((val, key) => {
                                        setItems(items => [...items,val]);
                                    })
                                    setIsLoaded(false);
                                })

                    }else{
                        setIsLoaded(false);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    useEffect(() => {
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
    return (
        <>
            <div className={"discoveredCardsContainer"}>
                {isLoaded === true &&
                    <div className={"loaderPokemon"}>
                        <h2 sty className="u-text-center">Chargement ...</h2>
                        <div className="pokemon"></div>
                    </div>
                }
                {isLoaded === false &&
                        items &&
                            <OpeningCards user={props.user} change={handleState} idBooster={props.idBooster} items={items} rarities={rarities}/>

                }
            </div>
        </>
    )
}
export default OpeningBooster
