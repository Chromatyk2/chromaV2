import React,{useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useCookies } from 'react-cookie';
import $ from "jquery";
import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import HomePage from './component/home.js';
import Pokedex from './component/pokedex.js';
import LaderBoard from './component/laderboard.js';
import NavBar from './component/navbar.js';
import Login from './services/auth.services.js';
import PokemonPage from './component/pokemonPage.js';
import MyTradePlace from './component/myTradePlace.js';
import TradePlace from './component/tradePlace.js';
import GuessTrade from './component/guessTrade.js';
import Guess from './component/guess.js';
import MyNote from './component/myNote.js';
import AllNotes from './component/allNotes.js';
import ViewersNote from './component/viewersNote.js';
import NostalPick from './component/nostalPick.js';
import CurrentGameImage from "./component/currentGameImage.js";
import LastGames from "./component/lastGame.js";
import BangerOverlay from "./component/BangerOverlay.js";
import CardsHub from "./component/cardsHub.js";
import OnStream from "./component/onStream";
import NostalPickV2 from "./component/nostalPickv2";
import LastBanger from "./component/lastBanger";
import LastBangerAlert from "./component/lastBangerAlert";
import Mentions from "./component/Mentions";
import Footer from "./component/footer";
import authServices from "./services/auth.services.js";
import AuthService from "./services/auth.services.js";
import SpawnPokemonRob from "./component/spawnPokemonRob";
import SpawnPokemon from "./component/spawnPokemon";
import Profil from "./component/profil";
import AllProfils from "./component/allProfils";
import OtherDex from "./component/otherDex";
import RandomProfil from "./component/randomProfil";
import OtherProfil from "./component/otherProfil";
import Pedandex from "./component/pedandex";
import StartPedandex from "./component/startPedandex";
import SpecificPedandex from "./component/specificPedandex";
import CardsHubTest from "./component/test/cardsHub";
function App(props) {
  const [cookies, setCookie] = useCookies();
  if(Object.keys(cookies).length == 0 || cookies.token === undefined ) {
    return <Login />
  }
  return(
    <>
      {cookies.user !== undefined &&
      <BrowserRouter>
          <NavBar cookies={cookies} />
        <OnStream />
        <Routes>
          <Route path="/" element={<HomePage cookies={cookies} />} />
          <Route path="/pokedex" element={<Pokedex cookies={cookies} />} />
          <Route path="/pokedex/:pseudo" element={<OtherDex cookies={cookies} />} />
          <Route path="/leaderboard" element={<LaderBoard cookies={cookies} />} />
          <Route path="/pokemon/:id" element={<PokemonPage cookies={cookies} />} />
          <Route path="/myTrades" element={<MyTradePlace cookies={cookies} />} />
          <Route path="/tradePlace" element={<TradePlace cookies={cookies} />} />
          <Route path="/guessTrade/:id" element={<GuessTrade cookies={cookies} />} />
          <Route path="/guess/:id" element={<Guess cookies={cookies} />} />
          <Route path="/aNu5YwZ5X75m5j" element={<MyNote cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8ue" element={<AllNotes cookies={cookies} />} />
          <Route path="/t4m4Q2zE3LV8uf" element={<ViewersNote cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGS" element={<NostalPickV2 cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGM" element={<CurrentGameImage cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGL" element={<LastGames cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGB" element={<BangerOverlay cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGT" element={<CardsHub cookies={cookies} />} />
          <Route path="/tcg/cartes" element={<CardsHub page={"myCards"} cookies={cookies} />} />
          <Route path="/tcg/boosters" element={<CardsHub page={"myBoosters"} cookies={cookies} />} />
          <Route path="/tcg/boutique" element={<CardsHub page={"cardsShop"} cookies={cookies} />} />
          <Route path="/tcg/echange" element={<CardsHub page={"sellCards"} cookies={cookies} />} />
          <Route path="/tcg/liste" element={<CardsHub page={"listuserTcg"} cookies={cookies} />} />
          <Route path="/profil" element={<Profil cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGP" element={<LastBanger cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGK" element={<LastBangerAlert cookies={cookies} />} />
          <Route path="/Mentions" element={<Mentions cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGSp" element={<SpawnPokemonRob cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGSpw" element={<SpawnPokemon cookies={cookies} />} />
          <Route path="/profil/:pseudo" element={<OtherProfil cookies={cookies} />} />
          <Route path="/allProfils" element={<AllProfils cookies={cookies} />} />
          <Route path="/29ct92B3ZrvxGSrp" element={<RandomProfil cookies={cookies} />} />
          <Route path="/pedandex" element={<Pedandex cookies={cookies} />} />
          <Route path="/oldpedandex" element={<SpecificPedandex cookies={cookies} />} />
          <Route path="/49Vs5sWVS2e7qs" element={<StartPedandex cookies={cookies} />} />
          <Route path="/49Vs5sWVS2e7qds" element={<CardsHubTest page={"cardsShop"} cookies={cookies} />} />
        </Routes>
        {/*<Footer cookies={cookies} />*/}
      </BrowserRouter>
      }
    </>
  );
}

export default App;
