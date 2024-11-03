import React,{useState, useEffect} from 'react';
import '../App.css'

function UniqueCard(props) {
    const [items, setItems] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [tenCards, setTenCards] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [pkm, setPkm] = React.useState(null);
    let [state, setState] = useState("Initial");
    const [glow, setGlow] = React.useState(null);
    const customStyles = {
        content: {
            position: 'relative',
            bottom: '107px',
            zIndex: 1,
            fontSize: '100px',
            height: 'inherit',
            right: '-7px'
        },
        image: {
            width:'100%'
        }
    };
    useEffect(() => {
        fetch("https://api.pokemontcg.io/v2/cards/"+props.cardId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPkm(result);
                    if(props.stade == 4){
                        setGlow("bigImageRainbow")
                    }else if(props.stade == 3){
                        setGlow("bigImageGold")
                    }else if(props.stade == 2){
                        setGlow("bigImageRare")
                    }else if(props.stade == 1){
                        setGlow("bigImageBase")
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    function errorImage(e){
        e.target.onerror = null;
        e.target.src = "https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+".png";
    }
    function handleState() {
            props.change();
    }
        return (
            <>
                {pkm &&
                    pkm.data.supertype == "Pokémon" ?
                    <>
                        <button onClick={handleState} className={"exitModalButton"}>X</button>
                        <div className="card">
                            <div className={"wrapper "+glow}>
                                <p className={"nbCardHover"}>{"X "+props.cardNb}</p>
                                <img src={"https://images.pokemontcg.io/"+pkm.data.set.id+"/"+pkm.data.number+"_hires.png" } onError={errorImage}
                                     className={"cover-image "+glow}/>
                            </div>
                            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+pkm.data.nationalPokedexNumbers[0]+".png"} className="character"/>
                        </div>
                    </>
                    :
                    <>
                        <button onClick={handleState} className={"exitModalButton"}>X</button>
                        <div className="card">
                            <div className={"wrapper "+glow}>
                                <p className={"nbCardHover"}>{"X "+props.cardNb}</p>
                                <img src={"https://images.pokemoncard.io/images/"+props.idBooster+"/"+props.cardId+"_hiresopt.jpg" } onError={errorImage}
                                     className={"cover-image "+glow}/>
                            </div>
                        </div>
                    </>
                }
            </>
        )
}
export default UniqueCard
