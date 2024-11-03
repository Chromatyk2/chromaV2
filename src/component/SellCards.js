import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardSell from './myCardSell.js';

function SellCards(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nbCards, setNbCards] = useState(null);
    const [nbCard, setNbCard] = useState(null);
    const [page, setPage] = useState(null);
    function displayPage(e) {
        setPage(e.target.value)
        setNbCard(e.target.getAttribute("nbCard"))
    }
    function backPage() {
        setPage(null)
    }
    useEffect(() => {
        Axios
            .get("/api/getMyNbDouble/"+props.user)
            .then(function(response){
                setNbCards(response.data);
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                { page ?
                    <>
                        <button onClick={backPage} className="backButton">Retour</button>
                        <MyCardSell user={props.user} card={nbCard} idBooster={page}/>
                    </>
                    :
                    nbCards &&
                    nbCards.map((val, key) => {
                        return(
                            <div className="uniqueMyCardContainer">
                                <div className={"containerImgBooster"}>
                                    <img className="fit-picture" src={"https://images.pokemontcg.io/" + val.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                                </div>
                                <p className="pokemonNameTrade">{val.nbCard} carte(s) en plusieurs éxemplaires</p>
                                <button value={val.booster} onClick={displayPage} className="guessTradeButton">Voir toute mes cartes</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default SellCards
