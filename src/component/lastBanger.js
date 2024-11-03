import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import $ from "jquery";

function LastBanger(props) {
    const [lastCardUser, setLastCardUser] = useState(null);
    const [newLastCardData, setNewLastCardData] = useState(null);
    const [newLastCardUser, setNewLastCardUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
            setInterval(() => {
                Axios.get("/api/getLastCard/")
                    .then(function(response){
                        response.data.map((val, key) => {
                            if(val.stade == 4){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardUser(val);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }else if(val.stade == 3){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardUser(val);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }else if(val.stade == 2){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardUser(val);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }else if(val.stade == 1){
                                fetch("https://api.pokemontcg.io/v2/cards/"+val.card)
                                    .then(res => res.json())
                                    .then(
                                        (result) => {
                                            setNewLastCardUser(val);
                                            setNewLastCardData(result);
                                        },
                                        (error) => {
                                            setIsLoaded(true);
                                            setError(error);
                                        }
                                    )
                            }
                        })
                    })
            }, 10000)
    }, []);
    useEffect(() => {
        if(newLastCardData != null){
            if(lastCardUser == null){
                setLastCardUser(newLastCardUser);
                document.getElementById("lastBangerContainer").style.animation = "bounceLastBanger 9s forwards";
                setTimeout(() => {
                    setNewLastCardData(null);
                }, 9000);
            }else if(lastCardUser.user !== newLastCardUser.user && lastCardUser.card !== newLastCardUser.card){
                    setLastCardUser(newLastCardUser);
                    document.getElementById("lastBangerContainer").style.animation = "bounceLastBanger 9s forwards";
                    setTimeout(() => {
                        setNewLastCardData(null);
                    }, 9000);

            }else if(lastCardUser.user == newLastCardUser.user && lastCardUser.card !== newLastCardUser.card){
                    setLastCardUser(newLastCardUser);
        }
        }
    }, [newLastCardData])
    return (
        <>
            {newLastCardData &&
                <div id={"lastBangerContainer"} className={"lastBangerContainer"}>
                    <p className={"lastCardUsername"}>{newLastCardUser.user}</p>
                    <img style={{width:"450px"}} src={"https://images.pokemontcg.io/"+newLastCardData.data.set.id+"/"+newLastCardData.data.number+"_hires.png" }/>
                </div>
            }
        </>
    )
}
export default LastBanger
