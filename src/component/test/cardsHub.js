import React,{useState, useEffect} from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import MyCards from '../myCards.js';
import CardsShop from './cardsShop.js';
import Axios from 'axios'
import MyBoosters from "../myBoosters";
import ListUserTcg from "../listUserTcg";
import SellCards from "../SellCards.js";
import Succes from "../Succes.js";
import OnStream from "../onStream";
function CardsHubTest(props) {
    const [points,setPoints] = useState(-1);
    const [canOpen,setCanOpen] = useState(-1);
    const pseudo = props.cookies.user.data[0].login;
    useEffect(() => {
        Axios
            .get("/api/getCardsPoint/"+pseudo)
            .then(function(response){
                Axios.get("/api/getCanOpen/"+pseudo)
                    .then(function(response){
                        setCanOpen(response.data[0].canOpen)
                    })
                setPoints(response.data[0].points);
            })
    }, [])
    return(
        <>
            <div className={"contentContainer"}>
            <div className={"allCards"}>
                    {props.page === null &&
                        <div className={"introTCGtext"}>
                            <p>
                                Bienvenue sur la partie du site consacrée à la collection de cartes Pokémon !!!<br />
                                Ici, l'aventure commence dès que tu cliques sur le bouton rouge !<br />
                                Le premier clique t'offre 10 000 points pour la boutique !<br />
                                Ensuite reviens cliquer sur le bouton tous les 1h pour en gagner 1 000 à chaque fois !<br />

                                Ce mini site a été fait par Chromatyk !<br />
                                Retrouve le en stream ici : <a className={"introTCGLink"} href={"https://twitch.tv/chromatyk"}>Chaîne de Chromatyk</a><br />
                                Il est également possible de gagner des points grâce aux points de chaines cumulés lors des streams !<br />

                                N'hésite pas à Follow ça fait toujours plaisir !<br />

                                Amuse toi bien !
                            </p>
                        </div>
                    }
                    {props.page == "myCards" &&
                        <MyCards user={pseudo} />
                    }
                    {props.page == "cardsShop" &&
                        <CardsShop canOpen={canOpen} user={pseudo} points={points}/>
                    }
                    {props.page == "myBoosters" &&
                        <MyBoosters user={pseudo}/>
                    }
                    {props.page == "listuserTcg" &&
                        <ListUserTcg user={pseudo}/>
                    }
                    {props.page == "sellCards" &&
                        <SellCards user={pseudo}/>
                    }
                    {props.page == "succes" &&
                        <Succes user={pseudo}/>
                    }
            </div>
            </div>
        </>
    );
}

export default CardsHubTest;