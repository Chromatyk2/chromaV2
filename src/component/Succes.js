import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import MyUniqueBooster from "./myUniqueBooster";
import MyUniqueSucces from "./MyUniqueSucces";
import ProgressBarCard from "./progressBarCard";

function Succes(props) {
    const [nbCards, setNbCards] = useState(null);
    const [totalCard, setTotalCard] = useState(null);
    const [boosterList, setBoosterList] = useState(null);
    const [totalCardUser, setTotalCardUser] = useState(null);
    useEffect(() => {
        Axios
            .get("/api/getNbCards/"+props.user)
            .then(function(response){
                setNbCards(response.data);
                let sum = (response.data.reduce(function(prev, current) {
                    return prev + +current.nbCard
                }, 0));
                Axios.get("/api/getBoosterTotalCard")
                    .then(function(response){
                        setBoosterList(response.data);
                        let sumBooster = (response.data.reduce(function(prev, current) {
                            return prev + +current.totalCards
                        }, 0));
                        setTotalCard(sumBooster);
                    })
            })
    }, [])
    return (
        <>
            <div id={"cardsContainer"}>
                {totalCard &&
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        if(val.nbCard == boosterList.find((uc) => uc.name == val.booster).totalCards){
                            return(
                                <div className={"containerBadgeSucces"}>
                                    <img src={"/images/100succes.png"} className={"backSucces"} />
                                    <div style={{height:'50px', backgroundImage:`url(/${val.booster}.png`}} className={"imgContainerSucces"}>
                                    </div>
                                </div>
                                )
                        }
                    })
                }
                {totalCard &&
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        if(parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) >  74.99 && parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) <  100){
                            return(
                                <div className={"containerBadgeSucces"}>
                                    <img src={"/images/75succes.png"} className={"backSucces"} />
                                    <div style={{height:'50px', backgroundImage:`url(/${val.booster}.png`}} className={"imgContainerSucces"}>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                {totalCard &&
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        if(parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) > 49.99 && parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) <  75){
                            return(
                                <div className={"containerBadgeSucces"}>
                                    <img src={"/images/50succes.png"} className={"backSucces"} />
                                    <div style={{height:'50px', backgroundImage:`url(/${val.booster}.png`}} className={"imgContainerSucces"}>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                {totalCard &&
                    nbCards &&
                    totalCard &&
                    nbCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                        if(parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) >  24.99 && parseFloat(val.nbCard/boosterList.find((uc) => uc.name == val.booster).totalCards*100).toFixed(2) <  50){
                            return(
                                <div className={"containerBadgeSucces"}>
                                    <img src={"/images/25succes.png"} className={"backSucces"} />
                                    <div style={{height:'50px', backgroundImage:`url(/${val.booster}.png`}} className={"imgContainerSucces"}>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    )
}
export default Succes
