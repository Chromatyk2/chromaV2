import React, {useEffect, useState} from 'react';
import '../App.css'
import Axios from "axios";
import moment from "moment/moment";
import card from "../cards.png"
function SpawnPokemonToken(props) {
    const pseudo = props.pseudo;
    const [pokemon, setPokemon] = useState([])
    const [balls, setBalls] = useState(['poke','great','ultra','safari','premier','sport','net','dive','nest','repeat','timer','luxury','dusk','heal','quick','fast','level','lure','heavy','love','friend','moon','park','dream','beast']);
    const [useBall, setUseBall] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [reloadFetch, setReloadFetch] = useState(0);
    const [shiny, setShiny] = useState(false);
    const [getToken, setGetToken] = useState(false);
    // setTimeout(() => {
    //     props.change();
    // }, 6000);
    useEffect(() => {
        var tokenBonus = Math.floor(Math.random() * 10);
        if(tokenBonus == 0){
            setGetToken(true);
            Axios.post('/api/addCardsPointTw',
                {
                    user:pseudo
                }
            )
        }
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+Math.floor((Math.random() * 1025) + 1))
            .then(res => res.json())
            .then(
                (result) => {
                    const isLegendary = Math.floor((Math.random() * 5) + 1);
                    const isMythical = Math.floor((Math.random() * 10) + 1);
                    const queryParameters = new URLSearchParams(window.location.search)
                    const isShiny = Math.floor((Math.random() * 50) + 1);
                    const name = result.names.find((element) => element.language.name == "fr").name;
                    switch (result.is_legendary){
                        case true:
                            switch (isLegendary){
                                case 1 :
                                    setUseBall("master")
                                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                let root = document.querySelector(':root');
                                                switch (isShiny){
                                                    case 1 :
                                                        setIsLoaded(false);
                                                        setShiny(true);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                        Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_shiny,pkmId:result.id, shiny:1, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: pseudo,
                                                                win: 999999999,
                                                                wins: 999999999
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+pseudo)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 50){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: pseudo
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                        break;
                                                    default :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                        Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_default,pkmId:result.id, shiny:0, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: pseudo,
                                                                win: 100,
                                                                wins: 100
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+pseudo)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 50){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: pseudo
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                }
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                                    break;
                                default:
                                    console.log("Légendaire Refusé")
                                    setReloadFetch(reloadFetch + 1);
                            }
                            break;
                        default :
                            switch (result.is_mythical){
                                case true:
                                    switch (isMythical){
                                        case 1 :
                                            setUseBall("cherish")
                                            fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {
                                                        let root = document.querySelector(':root');
                                                        switch (isShiny){
                                                            case 1 :
                                                                setIsLoaded(false);
                                                                setShiny(true);
                                                                root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                                Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_shiny,pkmId:result.id, shiny:1, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                                Axios.post('/api/addXp',
                                                                    {
                                                                        user: pseudo,
                                                                        win: 999999999,
                                                                        wins: 999999999
                                                                    }
                                                                )
                                                                    .then(function(response){
                                                                        Axios.get("/api/getProfil/"+pseudo)
                                                                            .then(function(response){
                                                                                if(response.data[0].xp >= response.data[0].level * 50){
                                                                                    Axios.post('/api/levelUp',
                                                                                        {
                                                                                            pseudo: pseudo
                                                                                        }
                                                                                    )
                                                                                }
                                                                            })
                                                                    })
                                                                break;
                                                            default :
                                                                setIsLoaded(false);
                                                                root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                                Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_default,pkmId:result.id, shiny:0, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                                Axios.post('/api/addXp',
                                                                    {
                                                                        user: pseudo,
                                                                        win: 300,
                                                                        wins: 300
                                                                    }
                                                                )
                                                                    .then(function(response){
                                                                        Axios.get("/api/getProfil/"+pseudo)
                                                                            .then(function(response){
                                                                                if(response.data[0].xp >= response.data[0].level * 50){
                                                                                    Axios.post('/api/levelUp',
                                                                                        {
                                                                                            pseudo: pseudo
                                                                                        }
                                                                                    )
                                                                                }
                                                                            })
                                                                    })
                                                        }
                                                    },
                                                    (error) => {
                                                        setIsLoaded(true);
                                                        setError(error);
                                                    }
                                                )
                                            break;
                                        default :
                                            console.log("Mythique non Autorisé !")
                                            setReloadFetch(reloadFetch + 1);
                                    }
                                    break;
                                default:
                                    setUseBall(balls[Math.floor(Math.random() * balls.length)])
                                    fetch("https://pokeapi.co/api/v2/pokemon/"+result.id)
                                        .then(res => res.json())
                                        .then(
                                            (result) => {
                                                let root = document.querySelector(':root');
                                                switch (isShiny){
                                                    case 1 :
                                                        setIsLoaded(false);
                                                        setShiny(true);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_shiny+')');
                                                        Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_shiny,pkmId:result.id, shiny:1, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: pseudo,
                                                                win: 999999999,
                                                                wins: 999999999
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+pseudo)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 50){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: pseudo
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                        break;
                                                    default :
                                                        setIsLoaded(false);
                                                        root.style.setProperty('--backGgroundImage', 'url('+result.sprites.front_default+')');
                                                        Axios.post('/api/capture', {pseudo: pseudo, pkmName: name, pkmImage:result.sprites.front_default,pkmId:result.id, shiny:0, dateCapture:moment(new Date()).utc().format('YYYY-MM-DD hh:mm:ss')})
                                                        Axios.post('/api/addXp',
                                                            {
                                                                user: pseudo,
                                                                win: 20,
                                                                wins: 20
                                                            }
                                                        )
                                                            .then(function(response){
                                                                Axios.get("/api/getProfil/"+pseudo)
                                                                    .then(function(response){
                                                                        if(response.data[0].xp >= response.data[0].level * 50){
                                                                            Axios.post('/api/levelUp',
                                                                                {
                                                                                    pseudo: pseudo
                                                                                }
                                                                            )
                                                                        }
                                                                    })
                                                            })
                                                }
                                            },
                                            (error) => {
                                                setIsLoaded(true);
                                                setError(error);
                                            }
                                        )
                            }
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [reloadFetch])
    return (
        <>
            {isLoaded === false &&
                <>
                    <div className="pokemonContentToken">
                        <div style={{left:"0"}}  className="pkmn exit left token">
                            <div className={useBall+" ball"}>
                                <span className="x">
                                  <span className="y">
                                    <span className="sprite">
                                    </span>
                                  </span>
                                </span>
                            </div>
                            <div className="mon">
                                {getToken === true && <div className="fav-token"><img src={card} style={{width:"50px"}} /><p className={"moreToken"}>+1</p></div> }
                                {shiny === true &&
                                    <div className="fav">
                                        <svg className="fav-star" viewBox="0 0 114 110">
                                            <path
                                                d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                                        </svg>

                                        <svg className="fav-star2" viewBox="0 0 114 110">
                                            <path
                                                d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                                        </svg>

                                        <svg className="fav-star3" viewBox="0 0 114 110">
                                            <path
                                                d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                                        </svg>
                                        <span className="fav-round"></span>
                                        <span className="fav-sparkle">
                                        <span className="fav-sparkle-i"></span>
                                        <span className="fav-sparkle-i"></span>
                                        <span className="fav-sparkle-i"></span>
                                        <span className="fav-sparkle-i"></span>
                                        <span className="fav-sparkle-i"></span>
                                    </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default SpawnPokemonToken
