import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import OpeningBooster from "./openingBooster";
import Modal from 'react-modal';
import PokedexTeam from "./pokedexTeam";
import {useParams} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import OnStream from "./onStream";
import SpawnPokemonToken from "./spawnPokemonToken";
import Lv1 from "../lv1.png";
import Lv2 from "../lv2.png";
import Lv3 from "../lv3.png";
import Lv4 from "../lv4.png";
import Lv5 from "../lv5.png";
import Lv6 from "../lv6.png";
import Lv1c from "../lv1c.png";
import Lv2c from "../lv2c.png";
import Lv3c from "../lv3c.png";
import Lv4c from "../lv4c.png";
import Lv5c from "../lv5c.png";
import Lv6c from "../lv6c.png";
function Profil(props) {
    const pseudo = props.cookies.user.data[0].login;
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [myTotalsCards, setMyTotalsCards] = useState(null);
    const [myLastTenCards, setMyLastTenCards] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
    const [list,setList] = useState([]);
    const [pourcent, setPourcent] = useState();
    const [pourcentCard, setPourcentCard] = useState();
    const [modalIsOpenToken, setIsOpenToken] = React.useState(false);
    const [openTime, setOpenTime] = React.useState(false);
    const [isLoad, setIsLoad] = React.useState(true);
    useEffect(() => {
        const progressBars = document.querySelectorAll('.progress-container');

        const animateValue = (selector, start, end, duration) => {
            var obj = selector;
            var range = end - start;

            // no timer shorter than 50ms (not really visible any way)
            var minTimer = 50;

            // calc step time to show all interediate values
            var stepTime = Math.abs(Math.floor(duration / range));

            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);

            // get current time and calculate desired end time
            var startTime = new Date().getTime();
            var endTime = startTime + duration;
            var timer;

            function run() {
                var now = new Date().getTime();
                var remaining = Math.max((endTime - now) / duration, 0);
                var value = Math.round(end - remaining * range);
                obj.innerHTML = value + "%";
                if (value == end) {
                    clearInterval(timer);
                }
            }

            var timer = setInterval(run, stepTime);
            run();
        }

        const progress = (value) => {
            var progress = value / 100;
            var dashoffset = circumference * (1 - progress);

            progressValue.style.strokeDashoffset = dashoffset;
        }

// Iterate over each progress bar
        for (var el of progressBars) {
            var dataValue = el.getAttribute('data-value');
            var progressValue = el.querySelector('.progress-value');
            var valueContainer = el.querySelector('span');

            var radius = progressValue.getAttribute("r");

            var circumference = 2 * Math.PI * radius;

            progressValue.style.strokeDasharray = circumference;
            progress(dataValue);
        }
    }, []);
    function openToken() {
        setOpenTime(true)
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                if(response.data[0].pkmToken -1 > -1){
                    Axios.post('/api/removeToken',
                        {
                            user:pseudo
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setOpenTime(false)
                                    setProfil(response.data);
                                    setIsOpenToken(true);
                                    Axios
                                        .get("/api/getByUser/"+pseudo)
                                        .then(function(response){
                                            setList(response.data);
                                            setPourcent(Math.round((response.data.length / 1025) * 100));
                                        })
                                })
                        })
                }
            })
    }
    function closeModalToken() {
        Axios.get("/api/getProfil/"+pseudo)
        setIsOpenToken(false);
    }
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function (response){
                setProfil(response.data);
                Axios.get("/api/getMyTotalCards/"+pseudo)
                    .then(function (response){
                        setPourcentCard(Math.round((response.data[0].nbCard / 15937) * 100));
                        setMyTotalsCards(response.data)
                        Axios.get("/api/getMyLastTenCards/"+pseudo)
                            .then(function(response){
                                setMyLastTenCards(response.data)
                                Axios
                                    .get("/api/getByUser/"+pseudo)
                                    .then(function(response){
                                        setIsLoad(false)
                                        setList(response.data);
                                        setPourcent(Math.round((response.data.length / 1025) * 100));
                                    })
                            })
                    })
            })
    }, [])
    useEffect(() => {
        Axios
            .get("/api/getSkins/"+pseudo)
            .then(function(response){
                setSkins(response.data);
            })
    }, [setIsOpen])

    const customStyles = {
        extBar: {
            backgroundColor: '#00368a',
            position: 'relative',
            zIndex: '1',
            borderRadius: '50px',
            height:'30px',
            width:'300px'
        }
    };
    function handleProfileImage() {
        setIsOpen(true);
    }
    function handleTeam(e) {
        const teamToUpdate = e.target.value;
        setTeamToHandle(teamToUpdate);
        setIsOpenTeam(true);
    }
    function closeModalTeam() {
        setIsOpenTeam(false);
    }
    function closeModal() {
        setIsOpen(false);
    }
    function changeSkin(e) {
        const skin = e.target.value;
        Axios.post('/api/updateSkin',
            {
                user:pseudo,
                skin:e.target.value
            }
        )
            .then(function(response){
                Axios
                    .get("/api/getProfil/"+pseudo)
                    .then(function(response){
                        setProfil(response.data);
                        setIsOpen(false);
                    })
            })
    }
    function openSkin(e) {
        if(profil[0].box - 1 > -1){
            Axios.post('/api/removeBoxSkin',
                {
                    user:pseudo
                }
            )
                .then(function(response){
                    Axios.post('/api/addSkin',
                        {
                            user:pseudo,
                            skin:Math.floor((Math.random() * 734) + 1)
                        }
                    )
                        .then(function(response){
                            Axios.get("/api/getProfil/"+pseudo)
                                .then(function(response){
                                    setProfil(response.data);
                                    Axios
                                        .get("/api/getSkins/"+pseudo)
                                        .then(function(response){
                                            setSkins(response.data);
                                        })
                                })
                        })
                })
        }
    }
    function handleState() {
        Axios.get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
                Axios
                    .get("/api/getSkins/"+pseudo)
                    .then(function(response){
                        setSkins(response.data);
                        setIsOpenTeam(false);
                        setIsOpen(false);
                    })
            })
    }
    return (
        <>
            <div className={"contentContainer"}>
                <div className={"profilContainer"}>
                    {isLoad === false &&
                        profil &&
                        profil.length > 0 &&
                        <>
                            <OnStream/>
                            <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                            <div className={"profilVisuals"}>
                                <div style={{width: "120px"}}>
                                    {profil[0].pkmToken > 0 ?
                                        <button className="anchorTooltip"
                                                data-tooltip-content="Clique our capturer un pokemon"
                                                disabled={openTime}
                                                className={"openLeaderBoardButton"} onClick={openToken}
                                                style={{
                                                    width: "120px",
                                                    backgroundSize: "80px",
                                                    filter: "drop-shadow(white 0 0 4px)",
                                                    backgroundImage: "url(/token.png)"
                                                }}>
                                            <div className="infoPkm">
                                                <div
                                                    className="infoNbPkmToken">{profil[0].pkmToken != 0 ? profil[0].pkmToken : 0}</div>
                                            </div>
                                        </button>
                                        :
                                        <button disabled={openTime} className={"openLeaderBoardButton"}
                                                style={{
                                                    filter: "drop-shadow(0px 0px 15px white)",
                                                    backgroundImage: "url(/token.png)"
                                                }}>
                                            <div className="infoPkm">
                                                <div
                                                    className="infoNbPkmToken">0
                                                </div>
                                            </div>
                                        </button>
                                    }
                                </div>
                                <div onClick={handleProfileImage} className="progress-container" data-value="100">
                                    <svg className="progress-bar" id="svg" width="120" height="120"
                                         viewPort="0 0 100 100"
                                         version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="progress-meter" r="16" cx="30" cy="90" fill="transparent"
                                                stroke-width="13" strokeDashoffset="0"></circle>
                                        <circle className="progress-value" r="16" cx="30" cy="90" fill="transparent"
                                                stroke-width="13"
                                                style={{strokeDashoffset: -parseFloat(profil[0].xp / (profil[0].level * 50) * 100).toFixed(2)}}
                                                stroke-dasharray="301.59"></circle>
                                    </svg>
                                    <span>
                                <button style={{
                                    width: "100px",
                                    display: "block",
                                    margin: "auto",
                                    borderRadius: "100px"
                                }}
                                        className="uniquePokemonContainer">
                                    {profil[0].box > 0 &&
                                        <div className="infoPkm">
                                            <div className="infoNbBox">{profil[0].box}</div>
                                        </div>
                                    }
                                    {profil[0].profil_picture ?
                                        <img style={{width: "75px"}}
                                             src={"/images/Trainers/Trainer" + profil[0].profil_picture + ".png"}/>
                                        :
                                        <img style={{width: "75px"}} src={"/images/random.png"}/>
                                    }
                                    <div className="infoPkm">
                                        <div className="infoEdit"><i style={{marginLeft: "-6px", marginTop: "4px"}}
                                                                     className="fa-solid fa-pencil"></i></div>
                                    </div>
                                </button>
                            </span>
                                    <div
                                        style={{width: "max-content", left: "-20px", position: "absolute", top: "85px"}}
                                        className={"xpText"}>
                                        <p style={{fontSize: "13px", textAlign: "left", width: "fit-content"}}
                                           className={"levelProfil"}>N.{profil[0].level}</p>
                                        <p style={{fontSize: "13px", textAlign: "left", width: "fit-content"}}
                                           className={"levelProfil"}>{profil[0].xp + " / " + profil[0].level * 50}</p>
                                    </div>
                                </div>
                                <div className="anchorTooltip"
                                     data-tooltip-content={pourcent == 100 ? "100% du Pokedex Complété" : pourcent >= 80 ? "80% du Pokedex Complété" : pourcent >= 60 ? "60% du Pokedex Complété" : pourcent >= 40 ? "40% du Pokedex Complété" : pourcent >= 20 ? "20% du Pokedex Complété" : "Au moins 1 Pokémon capturé"}
                                     style={{width: "120px", height: "95px"}}>
                                    <img style={{width: "60px"}}
                                         src={pourcent == 100 ? Lv6 : pourcent >= 80 ? Lv5 : pourcent >= 60 ? Lv4 : pourcent >= 40 ? Lv3 : pourcent >= 20 ? Lv2 : Lv1}/>
                                </div>
                                <Tooltip style={{zIndex: "1"}} anchorSelect=".anchorTooltip"/>
                            </div>
                            <p className={"pseudoProfil"}>Mon équipe</p>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"first_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"second_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"third_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"fourth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"fifth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                    onClick={handleTeam} value={"sixth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                            <p style={{marginTop:"20px",marginBottom:"20px"}} className={"pseudoProfil"}>Dernier Booster</p>
                            <Tooltip style={{zIndex: "1"}} anchorSelect=".anchorTooltip"/>
                            <img style={{marginBottom:"35px"}} className="anchorTooltip"
                                data-tooltip-content={pourcentCard == 100 ? "100% du Cartodex Complété" : pourcentCard >= 80 ? "80% du Cartodex Complété" : pourcentCard >= 60 ? "60% du Cartodex Complété" : pourcentCard >= 40 ? "40% du Cartodex Complété" : pourcentCard >= 20 ? "20% du Cartodex Complété" : "Au moins 1 carte obtenue"} src={pourcentCard == 100 ? Lv6c : pourcentCard >= 80 ? Lv5c : pourcentCard >= 60 ? Lv4c : pourcentCard >= 40 ? Lv3c : pourcentCard >= 20 ? Lv2c : Lv1c} />
                            <div className={"profilCards"}>
                                {myLastTenCards.map((val, key) => {
                                    return (
                                        <img className={"profilCard"} style={{filter:val.stade == 1 ? "drop-shadow(rgb(17, 208, 154) 0px 0px 5px) drop-shadow(rgb(17, 210, 154) 0px 0px 5px) drop-shadow(rgb(17, 208, 154) 0px 0px 5px)" : val.stade == 2 ? "drop-shadow(rgb(14, 208, 214) 0px 0px 3px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px) drop-shadow(rgb(14, 208, 214) 0px 0px 5px)" : val.stade == 3 && "drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px) drop-shadow(rgb(200, 185, 19) 0px 0px 5px)"}}
                                        src={"https://images.pokemontcg.io/"+val.booster+"/"+val.card.split("-").pop()+"_hires.png"} />
                                    )
                                })

                                }
                            </div>
                        </>
                    }
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <p style={{textAlign: "center"}}>Choisis ton Skin</p>
                {profil &&
                    profil.length > 0 &&
                    profil[0].box > 0 &&
                    <button className={"openSkinBox"} onClick={openSkin}
                            style={{backgroundImage: "url(/images/skinClose.png)"}}>
                        <div className="infoPkm">
                            <div className="infoNbBoxSkin">{profil[0].box}</div>
                        </div>
                    </button>
                }
                <div style={{
                    overflow: "overlay",
                    display: "flex",
                    gap: "10px",
                    flexFlow: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {skins &&
                        skins.map((val, key) => {
                            return (
                                <button value={val.skin} style={{
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage: "url(/images/Trainers/Trainer" + val.skin + ".png)",
                                    border: "solid",
                                    borderRadius: "25px",
                                    padding: "20px",
                                    width: "100px",
                                    height: "100px"
                                }} onClick={changeSkin}></button>
                            )
                        })
                    }
                < /div>
            </Modal>
            <Modal isOpen={modalTeamIsOpen} onRequestClose={closeModalTeam} style={customStyles}
                   contentLabel="Example Modal">
                <PokedexTeam list={list} change={handleState} pkmToUpdate={teamToHandle} cookies={props.cookies}/>
            </Modal>
            <Modal overlayClassName={"overlayModalToken"} className={"modalToken"} isOpen={modalIsOpenToken} onRequestClose={closeModalToken} contentLabel="Example Modal">
                <SpawnPokemonToken  change={closeModalToken} pseudo={pseudo}/>
            </Modal>
        </>
    )
}

export default Profil
