import React from 'react';
import '../App.css'

function MyUniqueSucces(props) {
    return (
        <div style={{filter: props.maxBooster == props.nbCard.nbCard && 'drop-shadow(0px 0px 6px orange) drop-shadow(0px 0px 47px yellow)'}} className="uniqueTradeContainer">
            {props.maxBooster == props.nbCard.nbCard &&
                <img className={"done"} src={"/images/done.png"}/>
            }
            <div className={"containerImgBooster"}>
                <img className="fit-picture" src={"https://images.pokemontcg.io/" + props.nbCard.booster + "/logo.png"} alt="Grapefruit slice atop a pile of other slices"/>
            </div>
            <p className="pokemonNameTrade">{props.nbCard.nbCard} carte(s)</p>
            <button value={props.nbCard.booster} className="guessTradeButton">Voir toute mes cartes</button>
        </div>
    )
}
export default MyUniqueSucces
