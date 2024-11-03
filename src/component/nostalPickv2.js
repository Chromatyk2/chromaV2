import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2.js";
import Axios from "axios";
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

function NostalPickV2(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pickConsole, setPickConsole] = React.useState("null");
    const [randomConsoles, setRandomConsoles] = React.useState(null);
    var numbers = [1,2,3,4,5,6,7,8,9,10];
    useEffect(() => {
        var consoles = ["GBA","GBC","MEGADRIVE","N64","NDS","NGC","PS1","PSP","SNES","NES","MASTER SYSTEM"];
        setRandomConsoles(consoles.sort(() => Math.random() - 0.5));
    }, []);
    const customStyles = {
        content: {
            position:'initial',
            border: 'none',
            background: 'transparent',
            borderRadius: '4px',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textModal: {
            fontSize:'30px',
            textAlign:'center'
        },
    };
    function openModal(e) {
        var uConsole = e.target.getAttribute("uConsole");
        var buttonClick = document.getElementById("buttonBox"+uConsole);
        setPickConsole(uConsole);
        buttonClick.classList.toggle("getBox");
        setTimeout(function() { //Start the timer
            setIsOpen(true);
        }.bind(this), 800)
    }
    function handleState() {
        setIsOpen(false);
    }
    return(
        <>
            <div className="boxContainer">
                    {randomConsoles &&
                        numbers.map((val, key) => {
                        return (
                            <button id={"buttonBox"+randomConsoles[val]} onClick={openModal} className={"uniqueBoxContainer"}>
                                <p className={"nbBox"}>{val}</p>
                                <img uConsole={randomConsoles[val]} className={"imgBox"} src={"/basic.png"}/>
                            </button>
                        )
                    })}
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
                <UniqueBoxV2 consolePicked = {pickConsole} change={handleState} />
            </Modal>
        </>
    )
}
export default NostalPickV2
