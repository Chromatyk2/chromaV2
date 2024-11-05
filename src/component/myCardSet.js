import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import ProgressBarCard from "./progressBarCard";
import UniqueCard from "./UniqueCard.js";
import Modal from "react-modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function MyCardsSet(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
    const [cardId, setCardId] = React.useState(null);
    const [errorCard, setErrorCard] = React.useState("");
    const [rarities, setRarities] = useState(null);
    const [stadeCard, setStadeCard] = useState(0);
    const [filterRarity, setFilterRarity] = React.useState("");
    const [onlyMine, setOnlyMine] = React.useState(true);
    const [bonusSet, setBonusSet] = React.useState(false);
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
            justifyContent: 'center',
            overflow:'hidden'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
        buttonMyCard: {
            border:'none',
            background:'none',
            padding:0
        },
    };
    useEffect(() => {
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
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
                        setBonusSet(true);
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
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
              setMyCards(response.data);
            })
    }, [])
    useEffect(() => {
      myCards.map((val, key) => {
        setMyCardsId(myCardsId => [...myCardsId,val.card]);
      })
    }, [myCards]);
    function openModal(e) {
        console.log(e.target);
        setMyCardImage(e.target.getAttribute("image"));
        setMyCardNb(e.target.getAttribute("myCardNb"));
        setPokemonName(e.target.getAttribute("pokemonId"));
        setCardId(e.target.getAttribute("cardId"));
        setStadeCard(e.target.getAttribute("stade"));
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleState() {
        setIsOpen(false);
    }
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    function handleState() {
        setIsOpen(false);
    }
    const handleChangeOnlyMine = event => {
        if (event.target.checked) {
            setOnlyMine(false);
        } else {
            setOnlyMine(true);
        }
    };
    const handleRarity = event => {
        setFilterRarity(event.target.value);
    };
    return (
        <>

            {isLoaded === false &&
                items &&
                <ProgressBarCard getNb={myCards.length} item={items.length}/>
            }
            {isLoaded === true &&
                <>
                    <div className={"loaderPokemon"}>
                        <h2 className="u-text-center">Chargement ...</h2>
                        <div className="pokemon"></div>
                    </div>
                </>
            }
            {isLoaded === false &&
                <>
                    <div style={{color:"white",display:"flex",width:"100%",justifyContent:"center",flexWrap:"wrap"}}>
                        <label htmlFor="subscribe">
                            <input
                                style={{marginRight:"10px"}}
                                type="checkbox"
                                onChange={handleChangeOnlyMine}
                                id="subscribe"
                                name="subscribe"
                            />
                            Voir les cartes manquantes
                        </label>
                    </div>
                    <div id={"cardsContainer"}>
                        {items &&
                            items.sort((a, b) => a.number - b.number).map((val, key) => {
                                if (myCardsId.includes(val.id)) {
                                    if(val.rarity != "Common" && val.rarity != "Uncommon" && typeof val.rarity !== "undefined"){
                                        var stadeC = rarities.find((uc) => uc.rarity.includes(val.rarity)).stade;
                                    }else{
                                        var stadeC = 0;
                                    }
                                    let cardNb = myCards.find((myCard) => myCard.card.includes(val.id));
                                    if(stadeC == 4){
                                        return (
                                        <div onClick={openModal} style={{animation: "glowGetRainbow 10s infinite alternate"}} id={"lastBangerContainer"} className={"lastBangerContainer"}>
                                            <div cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard} image={val.image} stade={stadeC} className="cardBangerAlertSet">
                                                <LazyLoadImage
                                                    width={"250"}
                                                    style={{width:"250px",filter:"brightness(1)"}}
                                                    wrapperClassName={"shadowBangerCard"}
                                                    effect="opacity"
                                                    wrapperProps={{
                                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                                        style: {transitionDelay: "1s"},
                                                    }}
                                                    src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"} />
                                                {/*<img className={"shadowBangerCard"} style={{width:"250px",filter:"brightness(1)"}} src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}/>*/}
                                            </div>
                                        </div>
                                        )
                                    }else if(stadeC == 3){
                                        return (
                                            <div cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard} image={val.image} stade={stadeC} onClick={openModal} style={{filter: "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}} id={"lastBangerContainer"} className={"lastBangerContainer"}>
                                                <div cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard} image={val.image} stade={stadeC} className="cardBangerAlertSetThree">
                                                    <LazyLoadImage
                                                        width={"250"}
                                                        style={{width:"250px",filter:"brightness(1.2)"}}
                                                        wrapperClassName={"shadowBangerCard"}
                                                        effect="opacity"
                                                        wrapperProps={{
                                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                                            style: {transitionDelay: "1s"},
                                                        }}
                                                        src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.card.substring(val.card.lastIndexOf('-') + 1)+"_hires.png"} />
                                                    {/*<img className={"shadowBangerCard"} style={{width:"250px",filter:"brightness(1.2)"}} src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}/>*/}
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <button stade={stadeC} style={customStyles.buttonMyCard} onClick={openModal} className={"cardBox"}>
                                                <LazyLoadImage
                                                    width={"250"}
                                                    stade={stadeC}
                                                    style={{filter:stadeC == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : stadeC == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : stadeC == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}} cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}
                                                    image={val.image}
                                                    wrapperClassName={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
                                                    effect="opacity"
                                                    wrapperProps={{
                                                        // If you need to, you can tweak the effect transition using the wrapper style.
                                                        style: {transitionDelay: "1s"},
                                                    }}
                                                    src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"} />
                                                {/*<img stade={stadeC} style={{filter:stadeC == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : stadeC == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : stadeC == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}} cardId={val.id} pokemonId={val.dexId} myCardNb={cardNb.nbCard}*/}
                                                {/*     image={val.image} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}*/}
                                                {/*     src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"}*/}
                                                {/*     onError={errorImage}/>*/}
                                            </button>
                                        )
                                    }
                                }else if(!onlyMine){
                                    return (
                                        <LazyLoadImage
                                            delayTime={0}
                                            threshold={200}
                                            width={"250"}
                                            style={{filter:"grayscale(1)"}}
                                            stade={stadeC}
                                            image={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+".png"}
                                            wrapperClassName={"fit-picture-card"}
                                            effect="opacity"
                                            wrapperProps={{
                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                style: {transitionDelay: "1s"},
                                            }}
                                            src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+"_hires.png"} />
                                        // <img style={{filter:"grayscale(1)"}} className={"fit-picture-card"} src={"https://images.pokemontcg.io/"+val.set.id+"/"+val.number+".png"} onError={errorImage}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}
                           contentLabel="Example Modal">
                        <UniqueCard stade={stadeCard} pokemonName={pokemonName} onClick={closeModal} cardImage={myCardImage} cardNb={myCardNb}
                                    cardId={cardId} idBooster={props.idBooster} change={handleState}/>
                    </Modal>
                </>
            }
        </>
    )
}
export default MyCardsSet
