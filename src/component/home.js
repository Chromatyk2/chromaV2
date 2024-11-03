import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'
import PkmList from './pkmList.js'
import OnStream from "./onStream";

function HomePage(props) {
  return (
    <>
        <div className={"contentContainer"}>
            <OnStream/>
            <p style={{textAlign: "center", color: "white"}}>Bienvenue, {props.cookies.user.data[0].login}</p>
            <p style={{textAlign: "center", color: "white"}}>Capture des Pokemons, fait ton profil et collectionne les cartes
                avec les points de chaines que tu gagnes sur les streams de chromatyk, tu gagnes un booster sur le site
                tous les 2h en plus de ceux dispo avec les tokens ( 300 points de chaine ), rejoins le discord si tu as
                des questions et hésite pas à claquer ton follow sur twitch !</p>
            <div className="socialContainer">
                <a className="socialLink" target='_blank' href="https://discord.gg/8V6fyQdSCG"><i
                    class="fa-brands fa-discord"></i></a>
                <a className="socialLink" target='_blank' href="https://twitch.tv/chromatyk"><i
                    class="fa-brands fa-twitch"></i></a>
                <a className="socialLink" target='_blank' href="https://twitter.com/Chromatyk_"><i
                    class="fa-brands fa-twitter"></i></a>
                <a className="socialLink" target='_blank' href="https://www.instagram.com/chromatyk_/"><i
                    class="fa-brands fa-instagram"></i></a>
            </div>
        </div>
    </>
  )
}

export default HomePage
