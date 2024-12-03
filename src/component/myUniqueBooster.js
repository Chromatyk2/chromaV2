import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import MyCardsSet from './myCardSet.js';
import SmallProgressBarCard from "./smallProgressBar";

function MyUniqueBooster(props) {

    const [booster, setBooster] = useState([props.boosterList.find((uc) => uc.name == props.nbCard.booster)]);
    function displayPage(e) {
        var page = e.target.value;
        var nbCard = e.target.getAttribute("nbCard")
        var guruName = e.target.getAttribute("guruName")
        props.change(page,nbCard, guruName);
    }
    console.log(booster)
    return (
                            <div style={{filter: props.maxBooster == props.nbCard.nbCard && 'drop-shadow(0px 0px 6px orange) drop-shadow(0px 0px 47px yellow)'}} className="uniqueMyCardContainer">
                                {props.maxBooster == props.nbCard.nbCard &&
                                    <img className={"done"} src={"/Ribbon/"+booster[0].name+".png"}/>
                                }
                                <div className={"containerImgBooster"}>
                                    <img className="fit-picture" src={"/Boosters/" +booster[0].name + ".png"} alt="Grapefruit slice atop a pile of other slices"/>
                                </div>
                                <SmallProgressBarCard getNb={props.nbCard.nbCard} item={props.maxBooster}/>
                                <button guruName={booster[0].nameGuru} value={booster[0].name} onClick={displayPage} className="guessTradeButton">Voir toute mes cartes</button>
                            </div>
    )
}
export default MyUniqueBooster
