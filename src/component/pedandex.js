import React,{useState, useEffect, useRef} from 'react';
import ReactPaginate from 'react-paginate';
import Axios from 'axios'
import Pagination from './paginate.js';
import '../App.css'
import Modal from "react-modal";
import SpawnPokemonToken from "./spawnPokemonToken";
import {Link} from "react-router-dom";
import OnStream from "./onStream";
function Pedandex(props) {
    const [name, setName] = useState(null);
    const [words, setWords] = useState([]);
    const [history, setHistory] = useState([]);
    const [allHistory, setAllHistory] = useState([]);
    const [tokens, setTokens] = useState(0);
    const [leaderBoard, setLeaderBoard] = useState(null);
    const [canplay, setCanPlay] = useState(false);
    const [types, setTypes] = useState([]);
    const [tries, setTries] = useState(0);
    const [dailyGame, setDailyGame] = useState(null);
    const [triesWin, setTriesWin] = useState(0);
    const inputRef = useRef();
    const pseudo = props.cookies.user.data[0].login;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenHistory, setIsOpenHistory] = React.useState(false);
    const [canTips, setCanTips] = React.useState(false);
    const [canMoreTips, setCanMoreTips] = React.useState(false);
    const [modalIsOpenToken, setIsOpenToken] = React.useState(false);
    const [myHistory, setMyHistory] = React.useState([]);
    const [gen, setGen] = React.useState(null);
    const customStyles = {
        content: {
            width:"300px",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    useEffect(() => {
        Axios.get("/api/getCurrentDailyGame/")
            .then(function(response){
                document.getElementById("padandexName").innerText = response.data[0].name.replace(/[^.]/g,'x');
                const name = response.data[0].name;
                setDailyGame(response.data[0]);
                setName(response.data[0].name);
                const description = response.data[0].description;
                var id = 0;
                var div = document.getElementById("textToGuess");
                const correction = {
                    ",": " , ",
                    "?": " ? ",
                    ":": " : ",
                    "'": " ' ",
                    "(": " ( ",
                    ")": " ) ",
                    "/": " / ",
                    ".": " ."
                };
                Axios.get("/api/getMyTokens/"+pseudo)
                    .then(function(answer){
                        if(answer.data.length > 0){
                            setTokens(answer.data[0].token)
                        }
                        Axios.get("/api/getPedandexWin/"+response.data[0].day)
                            .then(function(info){
                                setLeaderBoard(info.data)
                                if(info.data.find((uc) => uc.pseudo === pseudo && uc.day === response.data[0].day)){
                                    setCanPlay(false)
                                    setTriesWin(info.data.find((uc) => uc.pseudo === pseudo && uc.day === response.data[0].day).tries)
                                    description.split(" ").forEach(word => {
                                        setWords(words => [...words,word]);
                                        const element = document.createElement("span");
                                        element.setAttribute("id", id);
                                        element.innerText = word.trim();
                                        element.style.background = 'none';
                                        element.style.marginRight = '0';
                                        document.getElementById("winContentId").style.display = 'block'
                                        document.getElementById("padandexName").innerText = name
                                        document.getElementById("padandexName").style.background = 'none'
                                        element.setAttribute("class", "itemDescription");
                                        id++;
                                        div.appendChild(element);
                                    });
                                }else{
                                    setCanPlay(true)
                                    description.replace(/,|\?|\/|\\|\:|\(|\)|\'|\./g, matched => correction[matched]).split(" ").forEach(word => {
                                        const correction2 = {
                                            " , ": ", ",
                                            " ? ": " ?",
                                            " : ": " : ",
                                            " ' ": "'",
                                            " / ": "/",
                                            ".": ". "
                                        };
                                        setWords(words => [...words,word]);
                                        const element = document.createElement("span");
                                        element.setAttribute("id", id);
                                        if(word === "'" || word ==="." || word ==="," || word ==="?" || word ===":" || word ==="(" || word ===")" || word ==="/"){
                                            element.innerText = word.trim();
                                            element.style.background = 'none';
                                            element.style.marginRight = '0';
                                        }else if(word === ""){
                                            element.style.display = "none";
                                        }
                                        else{
                                            element.innerText = word.replace(/[^.]/g,'x');
                                        }
                                        element.setAttribute("class", "itemDescription");
                                        id++;
                                        div.appendChild(element);
                                    });
                                }
                            })
                    })
            })
    }, []);

    const handleSubmit = (event) => {
        const guess = inputRef.current.value.toString()
        if(!history.find((uc) => uc === guess)){
            setHistory(history => [...history,guess]);
            setTries(tries + 1);
            if(tries > 48){
                setCanTips(true);
            }
            if(tries > 98){
                setCanMoreTips(true);
            }
            words.map((val, key) => {
                if(val.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().substring(0, val.length - 1) == inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() || val.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() == inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()|| val.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().substring(0, val.length - 2) == inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()){
                    var id = key;
                    document.getElementById(id).innerText = val;
                    document.getElementById(id).style.background = 'none';
                }
            })
            if(inputRef.current.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() == name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()){
                document.getElementById("winContentId").style.display = 'block'
                document.getElementById("padandexName").innerText = name
                document.getElementById("padandexName").style.background = 'none'
                document.getElementById("inputPedandex").disabled = true;
                document.getElementById("buttonPedandex").disabled = true;
                words.map((val, key) => {
                    var id = key;
                    document.getElementById(id).innerText = val;
                    document.getElementById(id).style.background = 'none';
                })
                if(!leaderBoard.find((uc) => uc.pseudo === pseudo && uc.day === dailyGame.day)){
                    Axios.post('/api/addToken',
                        {
                            user: pseudo,
                            win: 1,
                            wins: 1
                        }
                    )
                        .then(function(response){
                            Axios.post('/api/addPedandexWin',
                                {
                                    user: pseudo,
                                    tries: tries + 1,
                                    day: dailyGame.day,
                                    answer: dailyGame.name
                                }
                            )
                                .then(function(response){
                                    Axios.get("/api/getPedandexWin/"+dailyGame.day)
                                        .then(function(response) {
                                            setLeaderBoard(response.data)
                                            Axios.get("/api/getMyTokens/"+pseudo)
                                                .then(function(response){
                                                    setTokens(response.data[0].token)
                                                })
                                        })
                                })
                        })
                }
            }
            inputRef.current.value = "";
            event.preventDefault();
        }else{
            setHistory(history => [...history,guess]);
            inputRef.current.value = "";
            event.preventDefault();
        }
    };
    const displayWinContent = (event) => {
        document.getElementById("winContentId").style.display = 'none'
    };
    function openLeaderboard() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function openToken() {
        Axios.get("/api/getMyTokens/"+pseudo)
            .then(function(response){
                if(response.data[0].token > 0){
                    Axios.post('/api/removeToken',
                        {
                            user:pseudo
                        }
                    )
                    .then(function(response){
                        Axios.get("/api/getMyTokens/"+pseudo)
                            .then(function(response){
                                setTokens(response.data[0].token)
                                setIsOpenToken(true);
                            })
                    })
                }
            })
    }
    function closeModalToken() {
        setIsOpenToken(false);
    }
    function handleIndice(){
        fetch("https://tyradex.vercel.app/api/v1/pokemon/"+dailyGame.name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase())
            .then(res => res.json())
            .then(
                (result) => {
                    setTypes(result.types);
                }
            )
    }
    function handleMoreIndice(){
        fetch("https://tyradex.vercel.app/api/v1/pokemon/"+dailyGame.name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase())
            .then(res => res.json())
            .then(
                (result) => {
                    setGen(result.generation);
                }
            )
    }
    function closeModalHistory() {
        setIsOpenHistory(false);
    }
    function openHistory() {
        Axios.get("/api/getPedandexWinByUSer/"+pseudo)
            .then(function(response){
                setMyHistory(response.data);
                Axios.get("/api/getAllDailyGames")
                    .then(function(response){
                        setIsOpenHistory(true);
                        setAllHistory(response.data);
                    })
            })
    }
    return (
        <>
            <div className={"contentContainer"}>
                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "100%"
                }}>
                    <button className={"openLeaderBoardButton"} onClick={openHistory}
                            style={{filter: "drop-shadow(0px 0px 15px white)",backgroundImage: "url(/images/stats.jpg)"}}>
                    </button>
                    {leaderBoard &&
                        leaderBoard.length > 0 &&
                        <button className={"openLeaderBoardButton"} onClick={openLeaderboard}
                                style={{filter: "drop-shadow(0px 0px 15px white)",backgroundImage: "url(/trophee.webp)"}}></button>
                    }
                </div>
                {dailyGame &&
                    <p style={{
                        color: "white",
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>Jour {dailyGame.day}</p>
                }
                {canplay === true &&
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                        margin: "20px",
                        flexWrap:"wrap"
                    }}>
                        <div style={{
                            color: "white",
                            width: "200px",
                            border: "solid",
                            borderRadius: "15px",
                            height: "200px",
                            padding: "10px",
                            overflow: "overlay",
                            scrollbarColor: "#fff transparent",
                            scrollbarWidth: "thin"
                        }}>
                            <p style={{textAlign:"center"}}>Historique</p>
                            <hr />
                            <div style={{
                                display: "flex",
                                flexFlow: "column-reverse"
                            }}>
                                {history.map((val, key) => {
                                    return (
                                        <p className={"guessItem"}>{val}</p>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div>
                            <p style={{color: "white", textAlign: "center"}}>Trouvez le pokémon du jour</p>
                            <p style={{color: "white", textAlign: "center"}}>Nombre d'essais : {tries}</p>
                            <form className={"formPed"} onSubmit={handleSubmit} style={{margin: '20px'}}>
                                <label style={{marginRight: '10px'}}>
                                    <input id={"inputPedandex"} defaultValue={""} type="text" ref={inputRef}
                                           style={{marginLeft: '5px'}}/>
                                </label>
                                <button id={"buttonPedandex"} type="submit"
                                        style={{display: 'block', marginTop: '10px'}}>
                                    Valider
                                </button>
                            </form>
                        </div>
                    </div>
                }
                {canplay === false &&
                    <>
                        <p style={{fontSize: "30px;", color: "white", textAlign: "center"}}>Tu as déjà fini le Pedandex
                            du jour reviens demain !</p>
                    </>
                }
                <div onClick={displayWinContent} id={"winContentId"} style={{display: "none"}}
                     className={"winContent"}>
                    <div className={"winBackground"}></div>
                    <div className="bouncing-text">
                        <div className="b">G</div>
                        <div className="o">A</div>
                        <div className="u">G</div>
                        <div className="n">N</div>
                        <div className="c">E</div>
                        <div className="e">R</div>
                        <div className="shadow"></div>
                        <div className="shadow-two"></div>
                    </div>
                    <p style={{
                        position: "absolute",
                        textAlign: "center",
                        margin: "auto",
                        width: "100%",
                        color: "white"
                    }}>Tu as trouvé en {canplay === true ? tries : triesWin} éssais ! GG, reviens demain !</p>
                </div>
                <div id={"descriptionPedandex"}>
                    <div style={{gap:"50px", margin:"20px",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",flexWrap:"wrap"}}>
                        <p style={{ margin:"0",fontSize: "35px", textAlign: "center"}} className={"itemDescription"} id={"padandexName"}></p>
                        {types.length > 0 && canplay === true ?
                            <div style={{display: "flex", flexFlow: "column"}} className="pokemonTypeContainer">
                                {types.map((val, key) => {
                                    return (<img style={{margin: "0", height: "fit-content"}}
                                                 src={"/images/" + val.name + ".png"}></img>)
                                })}
                            </div>
                            :
                            canTips === true &&
                            <button style={{background: "transparent", border: "none", width:"80px",height:"80px"}} onClick={handleIndice}><img style={{width:"100%"}} src={"/images/random.png"}></img></button>
                        }
                        {gen && canplay === true ?
                            <div style={{display:"flex",flexFlow:"column"}} className="pokemonTypeContainer">
                                <p>Génération: {gen}</p>
                            </div>
                            :
                            canMoreTips === true &&
                            <button style={{background:"transparent",border:"none",width:"80px",height:"80px"}} onClick={handleMoreIndice}><img style={{width:"100%"}} src={"/images/random.png"}></img></button>
                        }
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}} id={"textToGuess"}>
                    </div>
                </div>
            </div>
            <Modal className={"modalLeaderBoard"} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
                <>
                    <p style={{textAlign:"center"}}>Classement du jour {dailyGame && dailyGame.day}</p>
                    <table style={{display:"flex",justifyContent:"center"}}>
                        <tbody>
                        {leaderBoard &&
                            leaderBoard.map((val, key) => {
                                return (
                                    <tr style={{justifyContent: "space-between",display:"flex",gap:"50px"}}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{val.pseudo}</td>
                                        <td>{val.tries}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalToken"} isOpen={modalIsOpenToken} onRequestClose={closeModalToken} contentLabel="Example Modal">
                <SpawnPokemonToken pseudo={pseudo}/>
            </Modal>

            <Modal className={"modalLeaderBoard"} isOpen={modalIsOpenHistory} onRequestClose={closeModalHistory} contentLabel="Example Modal">
                <>
                    <p style={{textAlign:"center"}}>Historique des parties</p>
                    <table style={{display:"flex",justifyContent:"center"}}>
                        <tbody>
                        {myHistory.length > 0 &&
                            allHistory.map((val, key) => {
                                return (
                                    <Link style={{fontSize: "20px", textDecoration: "none"}} className="navLink linkFromNav" to={"/oldpedandex?day="+val.day}>
                                    <tr style={{justifyContent: "space-between", display: "flex", gap: "50px"}}>
                                        <th scope="row">Jour {val.day}</th>
                                        {myHistory.find((uc) => uc.day === val.day) ?
                                            <th scope="row">{myHistory.find((uc) => uc.day === val.day).tries} <i style={{color: "green"}} className="fa-solid fa-check"></i></th>
                                            :
                                            <th scope="row"><i style={{color: "red"}} className="fa-solid fa-ban"></i></th>
                                        }
                                    </tr>
                                    </Link>
                                )

                            })
                        }
                        </tbody>
                    </table>
                </>
            </Modal>
        </>
    );
}

export default Pedandex
