import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import moment from 'moment';
import Modal from 'react-modal';
import token from '../token.png'

function OpeningCards(props) {

    const [tenCards, setTenCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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

    useEffect(() => {
        var tokenBonus = Math.floor(Math.random() * 1);
        if(tokenBonus == 0){
            setGetToken(true);
        }
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
    useEffect(() => {
        if (tenCards.length < 11) {
            if(tenCards.length < 7){
                const commonArray = props.items.filter(item => item.rarity == 'Common' || typeof item.rarity === "undefined");
                const randomCommon = commonArray[Math.floor(Math.random() * commonArray.length)];
                Axios.post('/api/addCard',
                    {
                        pseudo:props.user,
                        idCard:randomCommon.id,
                        booster:props.idBooster,
                        rarity:randomCommon.rarity,
                        stade:0
                    })
                setIsLoaded(true);
                setTenCards(tenCards => [...tenCards,randomCommon]);
                setNbCards (nbCards + 1);
            }else if(tenCards.length > 6 && tenCards.length < 8){
                var bonus = Math.floor(Math.random() * 100);
                if(bonus == 0){
                    var bonusPlus = Math.floor(Math.random() * 100);
                    if(stadeFour > 94){
                        var rarityArray = props.rarities.filter(item => item.stade == 3 || item.stade == 4);
                        const finalArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                        const randomFinal = finalArray[Math.floor(Math.random() * finalArray.length)];
                        Axios.post('/api/addCard',
                            {
                                pseudo:props.user,
                                idCard:randomFinal.id,
                                booster:props.idBooster,
                                rarity:randomFinal.rarity,
                                stade:props.rarities.find((uc) => uc.rarity.includes(randomFinal.rarity)).stade
                            })
                        setTenCards(tenCards => [...tenCards,randomFinal]);
                        setNbCards (nbCards + 1);
                        setIsLoaded(false);
                    }else{
                        var rarityArray = props.rarities.filter(item => item.stade == 1 || item.stade == 2);
                        const bonusArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                        const randomBonus = bonusArray[Math.floor(Math.random() * bonusArray.length)];
                        Axios.post('/api/addCard',
                            {
                                pseudo:props.user,
                                idCard:randomBonus.id,
                                booster:props.idBooster,
                                rarity:randomBonus.rarity,
                                stade:props.rarities.find((uc) => uc.rarity.includes(randomBonus.rarity)).stade
                            })
                        setTenCards(tenCards => [...tenCards,randomBonus]);
                        setNbCards (nbCards + 1);
                        setIsLoaded(false);
                    }
                }else{
                    const uncommonArray = props.items.filter(item => item.rarity == 'Uncommon');
                    const randomUncommon = uncommonArray[Math.floor(Math.random() * uncommonArray.length)];
                    Axios.post('/api/addCard',
                        {
                            pseudo:props.user,
                            idCard:randomUncommon.id,
                            booster:props.idBooster,
                            rarity:randomUncommon.rarity,
                            stade:0
                        })
                    setIsLoaded(true);
                    setTenCards(tenCards => [...tenCards,randomUncommon]);
                    setNbCards (nbCards + 1);
                }
            }else if(tenCards.length == 8){
                    const uncommonArray = props.items.filter(item => item.rarity == 'Uncommon');
                    const randomUncommon = uncommonArray[Math.floor(Math.random() * uncommonArray.length)];
                    Axios.post('/api/addCard',
                        {
                            pseudo:props.user,
                            idCard:randomUncommon.id,
                            booster:props.idBooster,
                            rarity:randomUncommon.rarity,
                            stade:0
                        })
                    setIsLoaded(true);
                    setTenCards(tenCards => [...tenCards,randomUncommon]);
                    setNbCards (nbCards + 1);
            }else if(tenCards.length == 9){
                if(getToken === true){
                    Axios.post('/api/addPkmToken',
                        {
                            user:props.user
                        }
                    )
                }
                var stadeTwo = Math.floor(Math.random() * 100);
                if(stadeTwo > 29){
                    var stadeThree = Math.floor(Math.random() * 100);
                    if(stadeThree > 71){
                        var stadeFour = Math.floor(Math.random() * 100);
                        if(stadeFour > 74){
                            var rarityArray = props.rarities.filter(item => item.stade == 4);
                            const finalArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                            const randomFinal = finalArray[Math.floor(Math.random() * finalArray.length)];
                            Axios.post('/api/addCard',
                                {
                                    pseudo:props.user,
                                    idCard:randomFinal.id,
                                    booster:props.idBooster,
                                    rarity:randomFinal.rarity,
                                    stade:4
                                })
                            setTenCards(tenCards => [...tenCards,randomFinal]);
                            setNbCards (nbCards + 1);
                            setIsLoaded(false);
                        }else{
                            var rarityArray = props.rarities.filter(item => item.stade == 3);
                            const ultraArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                            const randomUltra = ultraArray[Math.floor(Math.random() * ultraArray.length)];
                            Axios.post('/api/addCard',
                                {
                                    pseudo:props.user,
                                    idCard:randomUltra.id,
                                    booster:props.idBooster,
                                    rarity:randomUltra.rarity,
                                    stade:3
                                })
                            setTenCards(tenCards => [...tenCards,randomUltra]);
                            setNbCards (nbCards + 1);
                            setIsLoaded(false);
                        }
                    }else{
                        var rarityArray = props.rarities.filter(item => item.stade == 2);
                        const stadeTwoArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                        const randomEpic = stadeTwoArray[Math.floor(Math.random() * stadeTwoArray.length)];
                        Axios.post('/api/addCard',
                            {
                                pseudo:props.user,
                                idCard:randomEpic.id,
                                booster:props.idBooster,
                                rarity:randomEpic.rarity,
                                stade:2
                            })
                        setTenCards(tenCards => [...tenCards,randomEpic]);
                        setNbCards (nbCards + 1);
                        setIsLoaded(false);
                    }
                }else{
                    var rarityArray = props.rarities.filter(item => item.stade == 1);
                    const rareArray = props.items.filter(item => item.rarity == rarityArray[Math.floor(Math.random() * rarityArray.length)].rarity);
                    const randomRare = rareArray[Math.floor(Math.random() * rareArray.length)];
                    Axios.post('/api/addCard',
                        {
                            pseudo:props.user,
                            idCard:randomRare.id,
                            booster:props.idBooster,
                            rarity:randomRare.rarity,
                            stade:1
                        })
                    setTenCards(tenCards => [...tenCards,randomRare]);
                    setNbCards (nbCards + 1);
                    setIsLoaded(false);
                }
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
        setIndex(index + 1);
    }
    function getLastCard(e) {
        setIsNew(false);
        setEndPull(true);
        props.change();
        e.target.classList.toggle(' endPull');
    }

    const customStyles = {
        textModal: {
            fontSize:'30px',
            textAlign:'center',
            color:"white"
        },
        imgModal: {
            width:'200px',
            marginBottom:'30px'
        },
    };
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+e.target.getAttribute("cardId")+".png";
    }
    return (
        <>
            {tenCards.length == 10 &&
                <div onClick={showCards} class={isHidden === true ? "dropBooster fit-picture showBooster" : "fit-picture dropCards hiddenBooster"}>
                    <img style={customStyles.imgModal} src={"https://images.pokemontcg.io/" + props.idBooster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
                    <p style={customStyles.textModal}>Appuie pour découvrir tes cartes</p>
                </div>
            }
            {isNew === true &&
                <div style={{position:"absolute"}} id={"shadowBox"}>
                    <div className={"newContainer"}>
                        <p className={"rainbow rainbow_text_animated"}>NEW !</p>
                    </div>
                </div>
            }
            {tenCards.length == 10 &&
                <>
                    {tenCards.slice(0).reverse().map((val, key) => {
                        if(val.rarity != "Common" && val.rarity != "Uncommon" && typeof val.rarity !== "undefined"){
                            var stadeC = props.rarities.find((uc) => uc.rarity.includes(val.rarity)).stade;
                        }else{
                            var stadeC = 0;
                        }
                        return(
                            <>
                            {key == 0 &&
                            stadeC == 4 ?
                                <div
                                    style={{overflow: "unset"}}
                                    stade={stadeC} rarity={val.rarity} style={{
                                    overflow: "unset",
                                    display: key < 9 && "none",
                                    animation: stadeC == 4 && "bounceLastBangerAlertBooster 9s forwards"
                                }}
                                    keyCard={key}
                                    cardId={val.id}
                                    onClick={key == 0 ? getLastCard : getCard}
                                    className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                    id={"cardNb" + key}>
                                    <img
                                        onClick={key == 0 ? getLastCard : getCard}
                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                        id={"cardNb" + key}
                                        src={"https://images.pokemontcg.io/" + val.set.id + "/" + val.number + ".png"}
                                        onError={errorImage} alt="Grapefruit slice atop a pile of other slices"/>
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
                                        stade={stadeC} rarity={val.rarity}
                                        style={{display: key < 9 && "none", overflow: "unset"}}
                                        keyCard={key}
                                        cardId={val.id}
                                        onClick={key == 0 ? getLastCard : getCard}
                                        className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                        id={"cardNb" + key}>
                                        <img
                                            onClick={key == 0 ? getLastCard : getCard}
                                            className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull cardBangerAlert" : key == 9 ? "fit-picture dropCards showCards glowGet cardBangerAlert" : "fit-picture dropCards glowGet cardBangerAlert"}
                                            id={"cardNb" + key}
                                            src={"https://images.pokemontcg.io/" + val.set.id + "/" + val.number + ".png"}
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
                                    <img stade={stadeC} rarity={val.rarity}
                                         style={{display: key < 9 && "none"}}
                                         id={"cardNb" + key} keyCard={key}
                                         cardId={val.id}
                                         onClick={key == 0 ? getLastCard : getToken === true && key == 1 ? getNextToken : getCard}
                                         className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true && key == 0 ? "fit-picture dropCards endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}
                                         src={"https://images.pokemontcg.io/" + val.set.id + "/" + val.number + ".png"}
                                         onError={errorImage}
                                         alt="Grapefruit slice atop a pile of other slices"/>
                                    {getToken === true &&
                                        isToken === true &&
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            left: "50px",
                                            position: "relative"
                                        }}
                                             onClick={getLastCard}>
                                            <img
                                                rarity={4}
                                                onClick={getLastCard}
                                                id={"tokenContainer"}
                                                style={{
                                                    display: key == 0 ? "block" : "none",
                                                    position: "relative",
                                                    zIndex: "100",
                                                    top: "-203px",
                                                    width: "100px",
                                                    left: "-137px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)"
                                                }}
                                                className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}
                                                src={token}
                                                onError={errorImage}
                                                    alt="Grapefruit slice atop a pile of other slices"/>
                                                <p style={{
                                                    color:"white",
                                                    fontSize:"30px",
                                                    left: "-180px",
                                                    top: "-190px",
                                                    display: key == 0 ? "block" : "none",
                                                    position: "relative",
                                                    zIndex: "100",
                                                    width: "100px",
                                                    margin: 0,
                                                    filter: "drop-shadow(0px 4px 4px black)",
                                                    textShadow: "4px 0 #000, -2px 0 #000, 0 4px #000, 0 -4px #000, 4px 3px #000, -1px -1px #000, 4px -3px #000, -8px 1px #000"
                                                }} className={isHidden === true ? "fit-picture dropCards hiddenCards" : endPull === true ? "fit-picture dropCards showCards gettedCard endPull" : key == 9 ? "fit-picture dropCards showCards glowGet" : "fit-picture dropCards glowGet"}>+1</p>
                                            </div>
                                        }
                                        </>
                                }
                            </>
                        )
                    })}
                </>

            }
            {tenCards.length < 10 &&
                <div className={"loaderPokemon"}>
                    <h2 className="u-text-center">Chargement ...</h2>
                    <div className="pokemon"></div>
                </div>
            }
        </>
    )
}

export default OpeningCards
