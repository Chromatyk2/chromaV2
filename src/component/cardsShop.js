import React,{useState, useEffect} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment-timezone';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Countdown from "react-countdown";
import token from "../cards.png"
import OpeningBoosterTest from "./test/openingBooster";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Carousel } from 'react-responsive-3d-carousel'
import 'react-responsive-3d-carousel/dist/styles.css'

function CardsShop(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState(null);
    const [array, setArray] = useState([]);
    const [points,setPoints] = useState(-1);
    const [loading,setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [boosterId, setBoosterId] = React.useState(null);
    const [canOpenLive, setCanOpenLive] = React.useState(null);
    const [nextFree, setNextFree] = React.useState(null);
    const [onOpen, setOnOpen] = React.useState(false);
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
    useEffect(() => {
                Axios
                    .get("/api/getCardsPoint/"+props.user)
                    .then(function(response){
                        setPoints(response.data[0].cardToken);
                        Axios.get("/api/getProfil/"+props.user)
                            .then(function(response){
                                const dateNow = moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss');
                                const lastDrawing = new Date(response.data[0].lastOpening).toISOString().replace('T', ' ').split(".")[0];
                                if(response.data[0].canOpen == 1){
                                    setCanOpenLive(response.data[0].canOpen)
                                }else{
                                    setNextFree(moment(lastDrawing).valueOf() + 7200000);
                                    if(moment(dateNow).valueOf() - moment(lastDrawing).valueOf() >= 7200000){
                                        setCanOpenLive(1)
                                    }else{
                                        setCanOpenLive(0)
                                    }
                                }

                                Axios
                                    .get("/api/getBoostersListByGen/1")
                                    .then(function(response){
                                        setItems(response.data);
                                        response.data.map((val, key) => {
                                            setArray(array => [...array,
                                                <div className="uniqueTradeContainer">
                                                    <div className={"containerImgBooster"}>
                                                        <LazyLoadImage
                                                            delayTime={0}
                                                            threshold={200}
                                                            placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                                            width={"150"}
                                                            style={{width: "150px", filter: "brightness(1)"}}
                                                            effect="opacity"
                                                            delayTime={5}
                                                            wrapperProps={{
                                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                                style: {transitionDelay: "0.1s"},
                                                            }}
                                                            src={"/Boosters/" + val.name + ".png"}/>
                                                        {/*<img className="fit-picture"*/}
                                                        {/*     src={"https://images.pokemontcg.io/" + val.name + "/logo.png"}*/}
                                                        {/*     alt="Grapefruit slice atop a pile of other slices"/>*/}
                                                    </div>
                                                    {points > 0 ?
                                                        loading === false ?
                                                            <div>

                                                                <button value={val.name}
                                                                        onClick={openModal}
                                                                        className="guessTradeButton">Ouvrir
                                                                </button>
                                                            </div>
                                                            :
                                                            <div>
                                                                <button className="guessTradeButton">Chargement</button>
                                                            </div>
                                                        :
                                                        <div>
                                                            <button className="guessTradeButton">Aucun Token</button>
                                                        </div>
                                                    }
                                                    {canOpenLive == 1 &&
                                                        <div>

                                                            <button value={val.name}
                                                                    onClick={freeBooster}
                                                                    className="guessTradeButton">Booster Gratuit
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            ]);
                                        })
                                    })
                            })
                    })
    }, [])

    function registerCards(e) {
        return Axios.post('/api/registerCards',
            {
                pseudo:e.target.value
            }
        ).then(
            (result) => {
                Axios
                    .get("/api/getCardsPoint/"+e.target.value)
                    .then(function(response){
                        setPoints(response.data[0].cardToken);
                    })
            }
        )
    }
    function checkEndCountdown() {
        setCanOpenLive(1)
    }
    function selectGen(e) {
        setArray([])
        if(e.target.value == "all"){
            Axios
                .get("/api/getBoostersList")
                .then(function(response){
                    setItems(response.data);

                    response.data.map((val, key) => {
                        setArray(array => [...array,
                            <div className="uniqueTradeContainer">
                                <div className={"containerImgBooster"}>
                                    <LazyLoadImage
                                        delayTime={0}
                                        threshold={200}
                                        placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                        width={"150"}
                                        style={{width: "150px", filter: "brightness(1)"}}
                                        effect="opacity"
                                        delayTime={5}
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {transitionDelay: "0.1s"},
                                        }}
                                        src={"/Boosters/" + val.name + ".png"}/>
                                    {/*<img className="fit-picture"*/}
                                    {/*     src={"https://images.pokemontcg.io/" + val.name + "/logo.png"}*/}
                                    {/*     alt="Grapefruit slice atop a pile of other slices"/>*/}
                                </div>
                                {points > 0 ?
                                    loading === false ?
                                        <div>

                                            <button value={val.name}
                                                    onClick={openModal}
                                                    className="guessTradeButton">Ouvrir
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <button className="guessTradeButton">Chargement</button>
                                        </div>
                                    :
                                    <div>
                                        <button className="guessTradeButton">Aucun Token</button>
                                    </div>
                                }
                                {canOpenLive == 1 &&
                                    <div>

                                        <button value={val.name}
                                                onClick={freeBooster}
                                                className="guessTradeButton">Booster Gratuit
                                        </button>
                                    </div>
                                }
                            </div>
                        ]);
                    })
                })
        }else{
            Axios
                .get("/api/getBoostersListByGen/"+ e.target.value)
                .then(function(response){
                    setItems(response.data);
                    response.data.map((val, key) => {
                        setArray(array => [...array,
                            <div className="uniqueTradeContainer">
                                <div className={"containerImgBooster"}>
                                    <LazyLoadImage
                                        delayTime={0}
                                        threshold={200}
                                        placeholderSrc={"https://images.pokemontcg.io/defaut.png"}
                                        width={"150"}
                                        style={{width: "220px", filter: "brightness(1) drop-shadow(2px 4px 6px black)",borderRadius: "25px"}}
                                        effect="opacity"
                                        delayTime={5}
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: {transitionDelay: "0.1s"},
                                        }}
                                        src={"/Boosters/" + val.name + ".png"}/>
                                    {/*<img className="fit-picture"*/}
                                    {/*     src={"https://images.pokemontcg.io/" + val.name + "/logo.png"}*/}
                                    {/*     alt="Grapefruit slice atop a pile of other slices"/>*/}
                                </div>
                                {points > 0 ?
                                    loading === false ?
                                        <div>

                                            <button value={val.name}
                                                    onClick={openModal}
                                                    className="guessTradeButton">Ouvrir
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <button className="guessTradeButton">Chargement</button>
                                        </div>
                                    :
                                    <div>
                                        <button className="guessTradeButton">Aucun Token</button>
                                    </div>
                                }
                                {canOpenLive == 1 &&
                                    <div>

                                        <button value={val.name}
                                                onClick={freeBooster}
                                                className="guessTradeButton">Booster Gratuit
                                        </button>
                                    </div>
                                }
                            </div>
                        ]);
                    })
                })
        }
    }
    function openModal(e) {
        setOnOpen(true);
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        Axios
            .get("/api/getCardsPoint/"+props.user)
            .then(function(response){
                if(response.data[0].cardToken - 1 > -1){
                    return Axios.post('/api/removeCardsPoint',
                        {
                            user:props.user
                        }
                    )
                        .then(function(response) {
                            Axios
                                .get("/api/getCardsPoint/"+props.user)
                                .then(function(response){
                                    setPoints(response.data[0].cardToken);
                                    button.disabled = false;
                                })
                        })
                }else{
                    setOnOpen(false);
                }
            })
    }

    function freeBooster(e) {
        setOnOpen(true);
        var button = e.currentTarget;
        var nbBooster = e.target.getAttribute("nbBooster");
        button.disabled = true;
        var id = e.target.value;
        setBoosterId(id);
        Axios
            .get("/api/getCanOpen/"+props.user)
            .then(function(response){
                if(response.data[0].canOpen - 1 > -1 || canOpenLive == 1){
                    return Axios.post('/api/removeCanOpen',
                        {
                            pseudo:props.user,
                            today:moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss')
                        }
                    )
                        .then(function(response) {
                            Axios
                                .get("/api/getCanOpen/"+props.user)
                                .then(function(response){
                                    setCanOpenLive(0);
                                    Axios.get("/api/getProfil/"+props.user)
                                        .then(function(response){
                                            button.disabled = false;
                                            const dateNow = moment(Date.now()).tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss');
                                            const lastDrawing = new Date(response.data[0].lastOpening).toISOString().replace('T', ' ').split(".")[0];
                                            if(response.data[0].canOpen == 1){
                                                setCanOpenLive(response.data[0].canOpen)
                                            }else{
                                                setNextFree(moment(lastDrawing).valueOf() + 7200000);
                                                if(moment(dateNow).valueOf() - moment(lastDrawing).valueOf() >= 7200000){
                                                    setCanOpenLive(1)
                                                }else{
                                                    setCanOpenLive(0)
                                                }
                                            }
                                        })
                                })
                        })
                }else{
                    setOnOpen(true);
                }
            })
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setOnOpen(false);
    }
    return (
        <>
            {onOpen === true ?
                <OpeningBooster change={handleState} idBooster={boosterId} user={props.user}/>
                :
                canOpenLive !== null &&
                <>
                    <div>
                        {points &&
                        points == -1 ?
                            <div className="myPointsDisplay">
                            </div>
                            :
                            <div style={{marginBottom:"-25px",marginTop:"10px"}} className="myPointsDisplay">
                                <img style={{display:"block",margin:"auto",width:"50px"}} src={token} />
                                <p style={{color: "white",textAlign:"center"}}>Token TCG : {points}</p>
                            </div>
                        }
                        {canOpenLive == 1 ?
                            <div id="icomp-neon">
                                <p><span href="http://tuts.icomp.ir">
                                Booster Gratuit Disponible
                            </span></p>
                            </div>
                            :
                            <div style={{marginTop:"15px"}} className="myPointsDisplay">
                                <p style={{marginBottom:"10px", textAlign:"center"}}>
                                    <span>Prochain booster Gratuit dans : </span>
                                    <Countdown
                                        date={nextFree}
                                        intervalDelay={0}
                                        precision={3}
                                        onComplete={checkEndCountdown}
                                    />
                                </p>
                            </div>
                        }
                    </div>
                    <select className={"selectGen"} onChange={selectGen} name="pets" id="pet-select">
                        <option value="1">Gen 1</option>
                        <option value="2">Gen 2</option>
                        <option value="3">Gen 3</option>
                        <option value="4">Gen 4</option>
                        <option value="5">Gen 5</option>
                        <option value="6">Gen 6</option>
                        <option value="7">Gen 7</option>
                        <option value="8">Gen 8</option>
                        <option value="9">Gen 9</option>
                    </select>
                    <div id={"cardsContainer"}>
                        {items &&
                            <div className="uniqueTradeContainerRandom">
                                <div style={{height:"70px"}} className={"containerImgBooster"}>
                                    <img style={{width:"80px"}} className="fit-picture" src={"/images/random.png"}
                                         alt="Grapefruit slice atop a pile of other slices"/>
                                </div>
                                <div>
                                    {points > 0 ?
                                        loading === false ?
                                                <button style={{margin:0,width:"200px"}} value={items[Math.floor(Math.random() * items.length)].name}
                                                        onClick={openModal}
                                                        className="guessTradeButton">Ouvrir
                                                </button>
                                            :
                                            <button style={{margin:0,width:"200px"}} className="guessTradeButton">Chargement</button>
                                        :
                                        <button style={{margin:0,width:"200px"}} className="guessTradeButton">Aucun Token</button>
                                    }
                                    {canOpenLive == 1 &&
                                            <button style={{width:"200px"}} value={items[Math.floor(Math.random() * items.length)].name}
                                                    onClick={freeBooster}
                                                    className="guessTradeButton">Booster Gratuit
                                            </button>
                                    }
                                </div>
                            </div>
                        }
                        {items &&
                            <div style={{width: "300px"}}>
                                <Carousel
                                    defaultOption={{ numOfSlides: 3, widthFactor: -10, depthFactor:3.5,angleFactor:-3 }}
                                    items={array}
                                    startIndex={0}
                                    interval={10000}
                                    pauseOnHover={false}
                                />
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default CardsShop