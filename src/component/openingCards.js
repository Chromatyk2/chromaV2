import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import token from '../token.png'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

function OpeningCards(props) {

    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);
    const [nbCards, setNbCards] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [index, setIndex] = React.useState(0)
    const [endPull, setEndPull] = React.useState(false)
    const [myCards, setMyCards] = useState([]);
    const [myCardsId, setMyCardsId] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [getToken, setGetToken] = useState(false);
    const [isToken, setIsToken] = useState(false);
    const [block, setBlock] = useState(null);
    const [things, setThings] = useState(true);
    const [thingsBooster, setThingsBooster] = useState(true);

    useEffect(() => {
        var tokenBonus = Math.floor(Math.random() * 10);
        if(tokenBonus == 0){
            setGetToken(true);
        }
        Axios
            .get("/api/getMyCardsBySet/"+props.user+"/"+props.idBooster)
            .then(function(response){
                setMyCards(response.data);

                fetch("https://api.tcgdex.net/v2/en/sets/"+props.idBooster)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setBlock(result.serie.id)
                        }
                    )
            })
    }, [])
    useEffect(() => {
        myCards.map((val, key) => {
            setMyCardsId(myCardsId => [...myCardsId,val.card]);
        })
    }, [myCards]);
    useEffect(() => {
        if (tenCards.length < 11) {
            if(tenCards.length < 6){
                fetch("https://api.tcgdex.net/v2/en/cards?set=eq:"+props.idBooster+"&rarity=eq:common")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const randomCommon = result[Math.floor(Math.random() * result.length)];
                            console.log(randomCommon);
                            Axios.post('/api/addCard',
                                {
                                    pseudo:props.user,
                                    idCard:randomCommon.id,
                                    booster:props.idBooster,
                                    rarity:"Common",
                                    stade:0,
                                    nb:randomCommon.localId,
                                    block:props.block
                                })
                            setIsLoaded(true);
                            setTenCards(tenCards => [...tenCards,{card :randomCommon, rarity:"Common"}]);
                            setNbCards (nbCards + 1);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            }else if(tenCards.length > 5 && tenCards.length < 8){
                fetch("https://api.tcgdex.net/v2/en/cards?set=eq:"+props.idBooster+"&rarity=eq:uncommon")
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const randomCommon = result[Math.floor(Math.random() * result.length)];
                            Axios.post('/api/addCard',
                                {
                                    pseudo:props.user,
                                    idCard:randomCommon.id,
                                    booster:props.idBooster,
                                    rarity:"Uncommon",
                                    stade:0,
                                    nb:randomCommon.localId,
                                    block:props.block
                                })
                            setIsLoaded(true);
                            setTenCards(tenCards => [...tenCards,{card :randomCommon, rarity:"Uncommon"}]);
                            setNbCards (nbCards + 1);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            }else if(tenCards.length == 8){
                    var randomStade = Math.floor(Math.random() * 101);
                    if(randomStade < 60 ){
                        var rarityArray = props.rarities.filter(item => item.stade ==  1);
                        var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                        var stade = 1;
                    }else if(randomStade > 59 && randomStade < 96){
                        var rarityArray = props.rarities.filter(item => item.stade ==  2);
                        var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                        var stade = 2;
                    }else{
                        var rarityArray = props.rarities.filter(item => item.stade ==  3);
                        var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                        var stade = 3;
                    }

                fetch('https://api.pokemontcg.io/v2/cards?q=set.id:'+rarity.nameGuru+' !rarity:"'+rarity.rarity+'"')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const pkmNumber = result.data[Math.floor(Math.random() * result.data.length)].number;
                            fetch('https://api.tcgdex.net/v2/en/sets/'+props.idBooster+'/'+pkmNumber)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        Axios.post('/api/addCard',
                                            {
                                                pseudo:props.user,
                                                idCard:result.id,
                                                booster:props.idBooster,
                                                rarity:rarity.rarity,
                                                stade:stade,
                                                nb:result.localId,
                                                block:props.block
                                            })
                                        setIsLoaded(true);
                                        setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity}]);
                                        setNbCards (nbCards + 1);
                                        console.log(tenCards)
                                    })
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            }else if(tenCards.length == 9){
                if(getToken === true){
                    Axios.post('/api/addPkmToken',
                        {
                            user:props.user
                        }
                    )
                }
                var randomStade = Math.floor(Math.random() * 101);
                if(randomStade < 60){
                    var rarityArray = props.rarities.filter(item => item.stade ==  2);
                    var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                    var stade = 2;
                }else if (randomStade > 59 && randomStade < 96){
                    var rarityArray = props.rarities.filter(item => item.stade ==  3);
                    var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                    var stade = 3;
                }else{
                    var rarityArray = props.rarities.filter(item => item.stade ==  4);
                    var rarity = rarityArray[Math.floor(Math.random() * rarityArray.length)]
                    var stade = 4;
                }
                fetch('https://api.pokemontcg.io/v2/cards?q=set.id:'+rarity.nameGuru+' !rarity:"'+rarity.rarity+'"')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            const pkmNumber = result.data[Math.floor(Math.random() * result.data.length)].number;
                            fetch('https://api.tcgdex.net/v2/en/sets/'+props.idBooster+'/'+pkmNumber)
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        Axios.post('/api/addCard',
                                            {
                                                pseudo:props.user,
                                                idCard:result.id,
                                                booster:props.idBooster,
                                                rarity:rarity.rarity,
                                                stade:stade,
                                                nb:result.localId,
                                                block:props.block
                                            })
                                        setIsLoaded(true);
                                        setTenCards(tenCards => [...tenCards,{card :result, rarity:rarity}]);
                                        setNbCards (nbCards + 1);
                                        console.log(tenCards)
                                    })
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            }
        }
    }, [nbCards])
    function showCards() {
        setIsHidden(false);
        if(!myCardsId.includes(tenCards.slice(0).reverse()[9].id)){
            setIsNew(true);
        }
    }
    function getCard(e) {
        var id = (e.target.getAttribute("keyCard"));
        var nextId = parseInt(id,10) - 1;
        var next = document.getElementById("cardNb"+nextId);
        var rarity = next.getAttribute("rarity");
        var nextCardId = next.getAttribute("cardId");
        var stadeCurrent = next.getAttribute("stade");
        if(index == 0){
            e.target.classList.toggle('showCards');
        }
        if(stadeCurrent == 1){
            next.classList.toggle('glowGetGreen');
        }else if(stadeCurrent == 2){
            next.classList.toggle('glowGetBlue');
        }else if(stadeCurrent == 3){
            next.classList.toggle('glowGetGold');
        }else if(stadeCurrent == 4){
            next.classList.toggle('glowGetRainbow');
        }
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";

        if(e.target.getAttribute("stade") == 1){
            e.target.classList.toggle('glowGetGreen');
        }else if(e.target.getAttribute("stade") == 2){
            e.target.classList.toggle('glowGetBlue');
        }else if(e.target.getAttribute("stade") == 3){
            e.target.classList.toggle('glowGetGold');
        }else if(e.target.getAttribute("stade") == 4){
            e.target.classList.toggle('glowGetRainbow');
        }
        e.target.classList.toggle('glowGet');
        e.target.classList.toggle('gettedCard');
        setIndex(index + 1);
    }
    function getNextToken(e) {
        setIsToken(true);
        var id = (e.target.getAttribute("keyCard"));
        var nextId = parseInt(id,10) - 1;
        var next = document.getElementById("cardNb"+nextId);
        var rarity = next.getAttribute("rarity");
        var nextCardId = next.getAttribute("cardId");
        var stadeCurrent = next.getAttribute("stade");
        if(stadeCurrent == 1){
            next.classList.toggle('glowGetGreen');
        }else if(stadeCurrent == 2){
            next.classList.toggle('glowGetBlue');
        }else if(stadeCurrent == 3){
            next.classList.toggle('glowGetGold');
        }else if(stadeCurrent == 4){
            next.classList.toggle('glowGetRainbow');
        }
        if(!myCardsId.includes(nextCardId)){
            setIsNew(true);
        }else{
            setIsNew(false);
        }
        next.style.display = "block";
        e.target.classList.toggle('glowGet');
        e.target.classList.toggle('gettedCard');
        if(e.target.getAttribute("stade") == 1){
            e.target.classList.toggle('glowGetGreen');
        }else if(e.target.getAttribute("stade") == 2){
            e.target.classList.toggle('glowGetBlue');
        }else if(e.target.getAttribute("stade") == 3){
            e.target.classList.toggle('glowGetGold');
        }else if(e.target.getAttribute("stade") == 4){
            e.target.classList.toggle('glowGetRainbow');
        }
        setIndex(index + 1);
    }
    function getLastCard(e) {
        setIsNew(false);
        setEndPull(true);
        props.change();
        e.target.classList.toggle('endPull');
    }

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
    function errorImage(e){
        e.target.onerror = null;
        if(e.target.getAttribute("booster") == "sm3.5"){
            e.target.src = "https://images.pokemontcg.io/sm35/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm7.5"){
            e.target.src = "https://images.pokemontcg.io/sm75/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sm11.5"){
            e.target.src = "https://images.pokemontcg.io/sm115/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh3.5"){
            e.target.src = "https://images.pokemontcg.io/swsh35/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh4.5"){
            e.target.src = "https://images.pokemontcg.io/swsh4.5/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "swsh12.5"){
            e.target.src = "https://images.pokemontcg.io/swsh12pt5/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv03.5"){
            e.target.src = "https://images.pokemontcg.io/sv3pt5/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv04.5"){
            e.target.src = "https://images.pokemontcg.io/sv4pt5/"+e.target.getAttribute("local")+"_hires.png";
        }else if(e.target.getAttribute("booster") == "sv06.5"){
            e.target.src = "https://images.pokemontcg.io/sv6pt5/"+e.target.getAttribute("local")+"_hires.png";
        }else{
            e.target.src = "https://images.pokemontcg.io/"+props.boosterGuru+"/"+e.target.getAttribute("local")+"_hires.png";
        }
    }
    useEffect(() => {
            const timeout = setTimeout(() => {
                setIsHidden(false)
            }, 500)

            return () => clearTimeout(timeout)
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setThings(false)
        }, 7001)
        const timeoutBooster = setTimeout(() => {
            setThingsBooster(false)
        }, 8001)
        const timeoutCards = setTimeout(() => {
            setIsLoaded(false);

        }, 7001)
        return () => clearTimeout(timeout)
        return () => clearTimeout(timeoutCards)
    }, []);
    console.log(props.rarities);
    return (
        <>
            <div style={{
                display: thingsBooster === true ? "flex" : "none",
                justifyContent: "center",
                height: "280px",
                width: "300px"
            }}>
                <div
                    className={things === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                    <img style={customStyles.imgModal2} src={"/Boosters/" + props.idBooster + ".png"}
                         alt="Grapefruit slice atop a pile of other slices"/>
                </div>
                <div style={{overflow: "hidden"}}
                     className={things === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                    <img style={customStyles.imgModal} src={"/Boosters/" + props.idBooster + ".png"}
                         alt="Grapefruit slice atop a pile of other slices"/>
                </div>
            </div>
            {isNew === true &&
                <div style={{position: "absolute"}} id={"shadowBox"}>
                    <div className={"newContainer"}>
                        <p className={"rainbow rainbow_text_animated"}>NEW !</p>
                    </div>
                </div>
            }
            {isLoaded === false &&
                <>
                    {tenCards.slice(0).reverse().map((val, key) => {
                        if (val.rarity.rarity != "Common" && val.rarity.rarity != "Uncommon" && typeof val.rarity.rarity !== "undefined") {
                            var stadeC = props.rarities.find((uc) => uc.rarity.includes(val.rarity.rarity)).stade;
                        } else {
                            var stadeC = 0;
                        }
                        return (
                            <>
                                {key == 0 ?
                                    stadeC == 4 ?
                                        <div
                                            style={{overflow: "unset"}}
                                            stade={stadeC} rarity={val.rarity.rarity} style={{
                                            overflow: "unset",
                                            display: key < 9 && "none",
                                            animation: stadeC == 4 && endPull === false &&"bounceLastBangerAlertBooster 3s forwards"
                                        }}
                                            keyCard={key}
                                            cardId={val.card.id}
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGetRainbow cardBangerAlert" : "fit-picture dropCards glowGetRainbow cardBangerAlert"}
                                            id={"cardNb" + key}>
                                            <img
                                                cardLocalId={val.card.localId}
                                                onClick={key == 0 ? getLastCard : getCard}
                                                className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGetRainbow cardBangerAlert" : "fit-picture dropCards glowGetRainbow cardBangerAlert"}
                                                id={"cardNb" + key}
                                                block={block}
                                                booster={props.idBooster}
                                                local={val.card.localId}
                                                src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                onError={errorImage}
                                                alt="Grapefruit slice atop a pile of other slices"/>
                                            {getToken === true &&
                                                <>

                                                    <img
                                                        rarity={4}
                                                        onClick={getLastCard}
                                                        id={"tokenContainer"}
                                                        style={{
                                                            display: "block",
                                                            position: "absolute",
                                                            zIndex: "100",
                                                            top: "-13px",
                                                            width: "100px",
                                                            left: "-13px",
                                                            margin: 0,
                                                            filter: "drop-shadow(0px 4px 4px black)"
                                                        }}
                                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : "fit-picture dropCards glowGet"}
                                                        src={token}
                                                        onError={errorImage}
                                                        alt="Grapefruit slice atop a pile of other slices"/>
                                                    <p style={{
                                                        color: "white",
                                                        fontSize: "30px",
                                                        left: "45px",
                                                        top: "30px",
                                                        display: key == 0 ? "block" : "none",
                                                        position: "absolute",
                                                        zIndex: "100",
                                                        width: "100px",
                                                        margin: 0,
                                                        filter: "drop-shadow(0px 4px 4px black)",
                                                        textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                    }}
                                                       className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}>+1
                                                    </p>
                                                </>
                                            }
                                        </div>
                                        :
                                        stadeC == 3 ?
                                            <div
                                                stade={stadeC} rarity={val.rarity.rarity}
                                                style={{display: key < 9 && "none", overflow: "unset"}}
                                                keyCard={key}
                                                cardId={val.card.id}
                                                cardLocalId={val.card.localId}
                                                onClick={key == 0 ? getLastCard : getCard}
                                                className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                                id={"cardNb" + key}>
                                                <img
                                                    cardLocalId={val.card.localId}
                                                    onClick={key == 0 ? getLastCard : getCard}
                                                    className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                                    id={"cardNb" + key}
                                                    block={block}
                                                    booster={props.idBooster}
                                                    local={val.card.localId}
                                                    src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                {getToken === true &&
                                                    <>
                                                        <img
                                                            rarity={4}
                                                            onClick={getLastCard}
                                                            id={"tokenContainer"}
                                                            style={{
                                                                display: "block",
                                                                position: "absolute",
                                                                zIndex: "100",
                                                                top: "-13px",
                                                                width: "100px",
                                                                left: "-13px",
                                                                margin: 0,
                                                                filter: "drop-shadow(0px 4px 4px black)"
                                                            }}
                                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : "fit-picture dropCards glowGet"}
                                                            src={token}
                                                            onError={errorImage}
                                                            alt="Grapefruit slice atop a pile of other slices"/>
                                                        <p style={{
                                                            color: "white",
                                                            fontSize: "30px",
                                                            left: "45px",
                                                            top: "30px",
                                                            display: key == 0 ? "block" : "none",
                                                            position: "absolute",
                                                            zIndex: "100",
                                                            width: "100px",
                                                            margin: 0,
                                                            filter: "drop-shadow(0px 4px 4px black)",
                                                            textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                        }}
                                                           className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}>+1
                                                        </p>
                                                    </>
                                                }
                                            </div>
                                            :
                                            <>
                                                <img stade={stadeC} rarity={val.rarity.rarity}
                                                     style={{display: key < 9 && "none"}}
                                                     id={"cardNb" + key} keyCard={key}
                                                     cardId={val.card.id}
                                                     cardLocalId={val.card.localId}
                                                     onClick={key == 0 ? getLastCard : getToken === true && key == 1 ? getNextToken : getCard}
                                                     className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}
                                                     block={block}
                                                     booster={props.idBooster}
                                                     local={val.card.localId}
                                                     src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                     onError={errorImage}
                                                     alt="Grapefruit slice atop a pile of other slices"/>
                                            </>
                                    :
                                    stadeC == 4 ?
                                        <div
                                            style={{overflow: "unset"}}
                                            stade={stadeC} rarity={val.rarity.rarity} style={{
                                            overflow: "unset",
                                            display: key < 9 && "none",
                                            animation: stadeC == 4 && "bounceLastBangerAlertBooster 3s forwards"
                                        }}
                                            keyCard={key}
                                            cardId={val.card.id}
                                            cardLocalId={val.card.localId}
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                            id={"cardNb" + key}>
                                            <img
                                                cardLocalId={val.card.localId}
                                                onClick={key == 0 ? getLastCard : getCard}
                                                className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                                id={"cardNb" + key}
                                                block={block}
                                                booster={props.idBooster}
                                                local={val.card.localId}
                                                src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                onError={errorImage}
                                                alt="Grapefruit slice atop a pile of other slices"/>
                                        </div>
                                        :
                                        stadeC == 3 ?
                                            <div
                                                stade={stadeC} rarity={val.rarity.rarity}
                                                style={{display: key < 9 && "none", overflow: "unset"}}
                                                keyCard={key}
                                                cardId={val.card.id}
                                                cardLocalId={val.card.localId}
                                                onClick={key == 0 ? getLastCard : getCard}
                                                className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                                id={"cardNb" + key}>
                                                <img
                                                    cardLocalId={val.card.localId}
                                                    onClick={key == 0 ? getLastCard : getCard}
                                                    className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                                    id={"cardNb" + key}
                                                    block={block}
                                                    booster={props.idBooster}
                                                    local={val.card.localId}
                                                    src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                    onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                            </div>
                                            :
                                            <>
                                                <img stade={stadeC} rarity={val.rarity.rarity}
                                                     style={{display: key < 9 && "none"}}
                                                     id={"cardNb" + key} keyCard={key}
                                                     cardId={val.card.id}
                                                     cardLocalId={val.card.localId}
                                                     onClick={key == 0 ? getLastCard : getToken === true && key == 1 ? getNextToken : getCard}
                                                     className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}

                                                     block={block}
                                                     booster={props.idBooster}
                                                     local={val.card.localId}
                                                     src={"https://assets.tcgdex.net/fr/" + block + "/" + props.idBooster + "/" + val.card.localId + "/high.png"}
                                                     onError={errorImage}
                                                     alt="Grapefruit slice atop a pile of other slices"/>
                                            </>
                                }
                            </>
                        )
                    })}
                </>

            }
        </>
    )
}

export default OpeningCards
