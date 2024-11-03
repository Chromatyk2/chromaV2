import React,{useState, useEffect} from 'react';
import { Cookies, useCookies } from 'react-cookie';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import ProfilList from "./profilList";
import {Link} from "react-router-dom";
import allProfils from "./allProfils";

function RandomProfil(props) {
    const [allProfil,setAllProfil] = useState([]);
    const [randomIndex,setRandomIndex] = useState(-1);
    useEffect(() => {
        Axios
            .get("/api/getAllProfilRandom")
            .then(function(response){
                setAllProfil(response.data);
                setRandomIndex(Math.floor(Math.random() * response.data.length));
            })
    }, [])
    useEffect(() => {
        const interval = setInterval(
            () => setRandomIndex(Math.floor(Math.random() * allProfil.length)), 5000
        );
        return () => {
            clearInterval(interval);
        };
    }, [allProfil.length > 0]);
    return (
        <>
            {randomIndex > -1 &&
                    <div style={{
                        width: "65%",
                        margin: "auto",
                        background: "rgba(0,0,0,.5)",
                        borderRadius: "50px",
                        padding: "20px",
                        position:"absolute",
                        left:"300px",
                        top:"300px"
                    }}>
                        <p className={"pseudoProfilList"}>{allProfil[randomIndex].pseudo}</p>
                        <p className={"levelProfilList"}>Niveau {allProfil[randomIndex].level}
                            <small> ( {allProfil[randomIndex].xp} xp )</small>
                        </p>
                        <p className={"levelProfilList"}>
                            <small> Rang : {randomIndex + 1}</small>
                        </p>
                        <div className={"profilVisualsList"}>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].first_pokemon ? 'url(' + allProfil[randomIndex].first_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"first_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].second_pokemon ? 'url(' + allProfil[randomIndex].second_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"second_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].third_pokemon ? 'url(' + allProfil[randomIndex].third_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"third_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                            </div>
                            <div style={{width: "150px"}} className="anchorTooltip uniquePokemonContainer">
                                {allProfil[randomIndex].profil_picture ?
                                    <img style={{width: "100%"}}
                                         src={"/images/Trainers/Trainer" + allProfil[randomIndex].profil_picture + ".png"}/>
                                    :
                                    <img style={{width: "100%"}} src={"/images/random.png"}/>
                                }
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fourth_pokemon ? 'url(' + allProfil[randomIndex].fourth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fourth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam closePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].fifth_pokemon ? 'url(' + allProfil[randomIndex].fifth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"fifth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam middlePokemonProfilList">
                            </div>
                            <div
                                style={{backgroundImage: allProfil[randomIndex].sixth_pokemon ? 'url(' + allProfil[randomIndex].sixth_pokemon + ')' : 'url(/images/random.png)'}}
                                value={"sixth_pokemon"}
                                className="anchorTooltip uniquePokemonContainerTeam">
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default RandomProfil
