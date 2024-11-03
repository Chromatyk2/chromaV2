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
import Countdown from "react-countdown";

function MyCardSell(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [items, setItems] = useState(null);
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [myCardNb, setMyCardNb] = React.useState(null);
    const [myCardImage, setMyCardImage] = React.useState(null);
    const [pokemonName, setPokemonName] = React.useState(null);
    const [cardId, setCardId] = React.useState(null);
    const [errorCard, setErrorCard] = React.useState("");
    const [cardToSell, setCardToSell] = useState([]);
    const [pointToWin, setPointToWin] = useState(0);
    const [rarities, setRarities] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [sellingIsLoad, setSellingIsLoad] = React.useState(false);
    const [sellingTime, setSellingTime] = React.useState(false);
    const [twoHour,setTwoHour] = useState(null);
    const [timestamp,setTimestamp] = useState(null);
    const [canSell,setCanSell] = useState(false);
    const [diff,setDiff] = useState(null);
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
            overflow:'hidden',
            zIndex:"20px"
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
            .get("/api/getSellingTime/"+props.user)
            .then(function(response){
                setSellingTime(response.data);
            })
    }, [])

    useEffect(() => {
        if(sellingTime !== null){
            if(sellingTime.length > 0) {
                setTimestamp((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120);
                setTwoHour((new Date().getTime() / 1000));
                setDiff((((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120)  - (new Date().getTime() / 1000)) * 1000);
                if ((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120 <= (new Date().getTime() / 1000)) {
                    setCanSell(true);
                } else {
                    setCanSell(false);
                }
            }else{
                setCanSell(true);
            }
        }
    }, [sellingTime])

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
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
                setMyCards(response.data);
            })
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getRaritiesByBooster/"+props.idBooster)
            .then(function(response){
                setRarities(response.data);
            })
    }, [])
    function handleClick(e) {
        var cardId = e.target.getAttribute("cardId");
        var cardNb = e.target.getAttribute("myCardNb");
        var rarityCard = e.target.getAttribute("rarity");
        var cartItemIndex = cardToSell.findIndex(item => item.card === cardId);
                if(cardToSell.find((card) => card.card == cardId)){
                    e.target.style.opacity = '0.5';
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                        if((cardToSell[cartItemIndex].nbToSell + 2 <= cardNb && cardToSell.length < 10) ||  (cardToSell[cartItemIndex].nbToSell + 2 <= cardNb && cardToSell.find((card) => card.card == cardId))) {
                            cardToSell[cartItemIndex] = {
                                ...cardToSell[cartItemIndex],
                                nbToSell: cardToSell[cartItemIndex].nbToSell + 1
                            }
                            if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                                    setPointToWin(pointToWin + 25);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                                    setPointToWin(pointToWin + 50);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                                    setPointToWin(pointToWin + 250);
                                }
                                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                                    setPointToWin(pointToWin + 1000);
                                }
                            }else{
                                if(rarityCard == "Common" || rarityCard == "unknowned"){
                                    setPointToWin(pointToWin + 5);
                                }
                                if(rarityCard == "Uncommon"){
                                    setPointToWin(pointToWin + 10);
                                }
                            }
                        }
                }else if(cardNb > 1  && cardToSell.length < 10){
                    e.target.style.opacity = '0.5';
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                    setCardToSell(cardToSell => [...cardToSell,{card: cardId,nbToSell:1,nbCard:cardNb}]);
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                            setPointToWin(pointToWin + 25);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                            setPointToWin(pointToWin + 50);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                            setPointToWin(pointToWin + 250);
                        }
                        if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                            setPointToWin(pointToWin + 1000);
                        }
                    }else{
                        if(rarityCard == "Common" || rarityCard == "unknowned"){
                            setPointToWin(pointToWin + 5);
                        }
                        if(rarityCard == "Uncommon"){
                            setPointToWin(pointToWin + 10);
                        }
                    }
                }
    }

    function unsellCard(e) {
        var cardId = e.target.getAttribute("cardId");
        var rarityCard = e.target.getAttribute("rarity");
        var cartItemIndex = cardToSell.findIndex(item => item.card === cardId);
        if(cardToSell.find((card) => card.card == cardId)){
            if(cardToSell[cartItemIndex].nbToSell - 1 >= 0) {
                if(cardToSell[cartItemIndex].nbToSell - 1 > 0){
                    cardToSell[cartItemIndex] = {
                        ...cardToSell[cartItemIndex],
                        nbToSell: cardToSell[cartItemIndex].nbToSell -1
                    }
                    document.getElementById("unsellButton"+cardId).style.display = 'flex';
                }else{
                    document.getElementById("card"+cardId).style.opacity = '1';
                    document.getElementById("unsellButton"+cardId).style.display = 'none';
                    cardToSell.splice(cartItemIndex, 1);
                }
                if(rarities.find((rarity) => rarity.rarity.includes(rarityCard))){
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 1){
                        setPointToWin(pointToWin - 25);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 2){
                        setPointToWin(pointToWin - 50);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 3){
                        setPointToWin(pointToWin - 250);
                    }
                    if(rarities.find((rarity) => rarity.rarity.includes(rarityCard)).stade == 4){
                        setPointToWin(pointToWin - 1000);
                    }
                }else{
                    if(rarityCard == "Common" || rarityCard == "unknowned"){
                        setPointToWin(pointToWin - 5);
                    }
                    if(rarityCard == "Uncommon"){
                        setPointToWin(pointToWin - 10);
                    }
                }
            }
        }
    }
    function openModal(e) {
        setIsOpen(true);
    }
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        myCards.map((val, key) => {
            setMyCardsId(myCardsId => [...myCardsId,val.card]);
        })
    }, [myCards]);

    function confirmSelling(e) {
        setSellingIsLoad(true);
        const requests = cardToSell.map((val, key) => {
            Axios
                .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                .then(function(response){
                    console.log(val.nbCard);
                    console.log(response.data.find((uc) => uc.card == val.card).nbCard);
                    console.log(val.nbCard == response.data.find((uc) => uc.card == val.card).nbCard);
                    if(val.nbCard == response.data.find((uc) => uc.card == val.card).nbCard){
                        var limitNb = parseInt(val.nbToSell);
                        return Axios.delete("/api/sellCards/"+props.user+"/"+val.card+"/"+limitNb)
                            .then(function(response){
                                setCardToSell([]);
                                document.getElementById("unsellButton"+val.card).style.display = 'none';
                                document.getElementById("card"+val.card).style.opacity = '1';
                                Axios.get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                            })
                    }
                })
        });

        return Promise.all(requests).then(() => {
            Axios
                .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
                .then(function(response){
                    setMyCards(response.data);
                    Axios.post('/api/addCardsPointFromSelling',
                        {
                            user:props.user,
                            cardPoint:pointToWin
                        }
                    ).then(function(response){
                        setSellingIsLoad(false);
                        setIsOpen(false);
                        setCanSell(false);
                        setPointToWin(0);
                        if (sellingTime.length == 0) {
                            Axios.post('/api/addLastSelling',
                                {
                                    pseudo: props.user,
                                    sellingTime: new Date()
                                }).then(
                                (result) => {
                                    Axios
                                        .get("/api/getSellingTime/" + props.user)
                                        .then(function (response) {
                                            setSellingTime(response.data);
                                        })
                                }
                            )
                        } else{
                            setTimestamp((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120);
                            setTwoHour((new Date().getTime() / 1000));
                            setDiff((((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120)  - (new Date().getTime() / 1000)) * 1000);
                            if((new Date(sellingTime[0].sellingTime).getTime() / 1000)  + 120 <= (new Date().getTime() / 1000)){
                                Axios.post('/api/updateSellingTime',
                                    {
                                        sellingTime: new Date(),
                                        pseudo: props.user
                                    }
                                ).then(
                                    (result) => {
                                        Axios
                                            .get("/api/getSellingTime/" + props.user)
                                            .then(function (response) {
                                                setSellingTime(response.data);
                                            })
                                    }
                                )
                            }
                        }
                    })
                })
        })
    }
    return (
        <>

            {isLoaded === false &&
                <ProgressBarCard getNb={myCards.length} item={items.length}/>
            }
            {isLoaded === true &&
                <div className={"loaderPokemon"}>
                    <h2 className="u-text-center">Chargement ...</h2>
                    <div className="pokemon"></div>
                </div>
            }
            {isLoaded === false &&
                <>
                    <div id={"cardsContainer"}>
                        {pointToWin > 0 &&
                            <>
                                <div className={"buttonToSellContainer"}>
                                    <button onClick={openModal} className={"buttonToSell"}>Vendre ces cartes pour {pointToWin} points</button>
                                </div>
                            </>
                        }
                        {canSell == true ?
                            items &&
                            rarities &&
                                sellingTime &&
                                    myCards.sort((a, b) => b.nbCard - a.nbCard).map((val, key) => {
                                        var stadeB =  items.find((myCard) => myCard.id === val.card).rarity;
                                            if(stadeB != "Common" && stadeB != "Uncommon"){
                                                if(typeof stadeB === "undefined"){
                                                    var stadeC = -1;
                                                }else{
                                                    var stadeC = rarities.find((uc) => uc.rarity.includes(stadeB)).stade;
                                                }
                                            }else{
                                                var stadeC = 0;
                                            }
                                            if(val.nbCard > 1){
                                                return (
                                                    <>
                                                        <button stade={stadeC} style={customStyles.buttonMyCard} className={"cardBox"}>
                                                            <div className={"nbToSellContainer"}>
                                                                <p className={"nbToSell"}>Carte(s) possédée(s) : {val.nbCard}</p>
                                                            </div>
                                                            <div className={"nbSellPickContainer"}>
                                                                {cardToSell.find((card) => card.card == val.card) &&
                                                                    <p className={"nbSellPick"}>{cardToSell.find((card) => card.card == val.card).nbToSell}</p>
                                                                }
                                                            </div>
                                                            <button cardId={val.card} myCardNb={val.nbCard}
                                                                    rarity={stadeC == -1 ? "unknowned" : items.find((myCard) => myCard.id === val.card).rarity} className={"unsellButton"} id={"unsellButton"+val.card} onClick={unsellCard}>-</button>
                                                            <img test={stadeC} style={{filter:stadeC == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : stadeC == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : stadeC == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}} id={"card"+val.card} onClick={handleClick} cardId={val.card} myCardNb={val.nbCard}
                                                                 rarity={stadeC == -1 ? "unknowned" : items.find((myCard) => myCard.id === val.card).rarity} className={stadeC == 4 ? "fit-picture-card cardOnListRainbow" : "fit-picture-card"}
                                                                 src={"https://images.pokemoncard.io/images/" + items.find((myCard) => myCard.id === val.card).set.id + "/" + val.card + "_hiresopt.jpg"}
                                                                 onError={errorImage}/>
                                                        </button>
                                                    </>
                                                )
                                            }
                                        }):<p>Attend 2 mins</p>
                        }
                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                            <div>
                                <p>Valider la vente pour {pointToWin} points ?</p>
                                <div className={"validationSellContainer"}>
                                    {sellingIsLoad === true ?
                                        <>
                                            <div className={"loaderPokemon"}>
                                                <h2 className="u-text-center">Chargement ...</h2>
                                                <div className="pokemon"></div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <button onClick={confirmSelling} className={"validationSellButton"} >Valider</button>
                                            <button className={"cancelSellButton"} onClick={closeModal}>Annuler</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </Modal>
                    </div>
                </>
            }
        </>
    )
}
export default MyCardSell
