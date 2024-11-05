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
function OtherProfil(props) {
    const [profil, setProfil] = useState(null);
    const [skins, setSkins] = useState(null);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalTeamIsOpen, setIsOpenTeam] = React.useState(false);
    const [teamToHandle, setTeamToHandle] = React.useState("");
    const { pseudo } = useParams()
    const [list,setList] = useState([]);
    const [pourcent, setPourcent] = useState();
    useEffect(() => {
        Axios
            .get("/api/getProfil/"+pseudo)
            .then(function(response){
                setProfil(response.data);
                Axios
                    .get("/api/getByUser/"+pseudo)
                    .then(function(response){
                        setList(response.data);
                        setPourcent(Math.round((response.data.length / 1025) * 100));
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
            backgroundColor: '#fc72a1',
            position: 'relative',
            zIndex: '1',
            borderRadius: '50px',
            margin:'auto',
            marginBottom: '15px',
            height:'30px',
            width:'300px'
        }
    };
    return (
        <>
            <div className={"contentContainer"}>
                <div className={"profilContainer"}>
                    {
                        profil &&
                        <>
                            <OnStream/>
                            <p className={"pseudoProfil"}>{profil[0].pseudo}</p>
                            <div className={"profilVisuals"}>
                                <div style={{width: "120px", display: "flex", justifyContent: "center"}}>
                                    {profil[0].pkmToken > 0 ?
                                        <button className="anchorTooltip"
                                                data-tooltip-content="Clique our capturer un pokemon"
                                                className={"openLeaderBoardButton"}
                                                style={{
                                                    filter: "drop-shadow(0px 0px 15px white)",
                                                    backgroundImage: "url(/token.png)"
                                                }}>
                                            <div className="infoPkm">
                                                <div
                                                    className="infoNbPkmToken">{profil[0].pkmToken != 0 ? profil[0].pkmToken : 0}</div>
                                            </div>
                                        </button>
                                        :
                                        <button className={"openLeaderBoardButton"}
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
                                <div className="progress-container" data-value="100">
                                    <svg className="progress-bar" id="svg" width="120" height="120" viewPort="0 0 100 100"
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
                                    <div style={{width: "max-content", left: "-20px", position: "absolute", top: "85px"}}
                                         className={"xpText"}>
                                        <p style={{fontSize: "13px", textAlign: "left", width:"fit-content"}}
                                           className={"levelProfil"}>N.{profil[0].level}</p>
                                        <p style={{fontSize: "13px", textAlign: "left", width:"fit-content"}}
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
                            <p className={"pseudoProfil"}>Son équipe</p>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].first_pokemon ? 'url(' + profil[0].first_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"first_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].second_pokemon ? 'url(' + profil[0].second_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"second_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].third_pokemon ? 'url(' + profil[0].third_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"third_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                            <div className={"threePokemon"}>
                                <button
                                    style={{backgroundImage: profil[0].fourth_pokemon ? 'url(' + profil[0].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"fourth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].fifth_pokemon ? 'url(' + profil[0].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"fifth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                                <button
                                    style={{backgroundImage: profil[0].sixth_pokemon ? 'url(' + profil[0].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                    value={"sixth_pokemon"}
                                    className="anchorTooltip uniquePokemonContainerTeam">
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default OtherProfil
