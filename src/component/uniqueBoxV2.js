import React,{useState, useEffect} from 'react';
import '../App.css';
import UniqueBox from "./UniqueBox";
import $ from 'jquery';
import Modal from "react-modal";
import OpeningBooster from "./openingBooster";
import Axios from "axios";

function UniqueBoxV2(props) {
    const [randomNumber, setRandomNumber] = React.useState(null)
    const [max, setMax] = React.useState(null);
    const [typeBox, setTypeBox] = React.useState("basic");
    const [finalState, setFinalState] = React.useState(null);
    useEffect(() => {
        if(props.consolePicked == "GB"){
            setMax(432);
        }
        if(props.consolePicked == "GBA"){
            setMax(424);
        }
        if(props.consolePicked == "GBC"){
            setMax(233);
        }
        if(props.consolePicked == "MASTER SYSTEM"){
            setMax(194);
        }
        if(props.consolePicked == "MEGADRIVE"){
            setMax(400);
        }
        if(props.consolePicked == "N64"){
            setMax(133);
        }
        if(props.consolePicked == "NDS"){
            setMax(488);
        }
        if(props.consolePicked == "NES"){
            setMax(280);
        }
        if(props.consolePicked == "NGC"){
            setMax(234);
        }
        if(props.consolePicked == "PS1"){
            setMax(147);
        }
        if(props.consolePicked == "PSP"){
            setMax(286);
        }
        if(props.consolePicked == "SNES"){
            setMax(458);
        }
    }, [])
    function openBox(e) {
        $('audio#karateka')[0].play()
        setRandomNumber(Math.floor(Math.random()*max) + 1);
        var rare = Math.floor(Math.random() * 100);
        if(rare < 99){
            setTimeout(function() {
                document.getElementById("box").classList.toggle("spinBox");
            }.bind(this), 1000)
            var epic = Math.floor(Math.random() * 100);
            if(epic < 99) {
                setTimeout(function() {
                    document.getElementById("box").classList.toggle("spinBox");
                }.bind(this), 3000)
                setTimeout(function() {
                    document.getElementById("box").classList.toggle("spinBox");
                }.bind(this), 5000)
                var legendary = Math.floor(Math.random() * 100);
                if(legendary < 99){
                    setTimeout(function() {
                        document.getElementById("box").classList.toggle("spinBox");
                    }.bind(this), 7000)
                    setTimeout(function() {
                        document.getElementById("box").classList.toggle("spinBox");
                    }.bind(this), 9000)
                    var ultra = Math.floor(Math.random() * 100);
                    if(ultra < 99){
                        setTimeout(function() {
                            setTypeBox("rare");
                        }.bind(this), 2000)
                        setTimeout(function() {
                            setTypeBox("epic");
                        }.bind(this), 6000)
                        setTimeout(function() {
                            setTypeBox("legendary");
                        }.bind(this), 10000)
                        setTimeout(function() {
                            setTypeBox("legendary");
                        }.bind(this), 13000)
                        setTimeout(function() {
                            document.getElementById("box").classList.toggle("spinBox");
                        }.bind(this), 11000)
                        setTimeout(function() {
                            setTypeBox("ultraOpen");
                            setFinalState("ultra");
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
                            $('audio#rainbowWin')[0].play()
                        }.bind(this), 13000)
                    }else{
                        setTimeout(function() {
                            setTypeBox("rare");
                        }.bind(this), 2000)
                        setTimeout(function() {
                            setTypeBox("epic");
                        }.bind(this), 6000)
                        setTimeout(function() {
                            setTypeBox("legendary");
                        }.bind(this), 10000)
                        setTimeout(function() {
                            document.getElementById("box").classList.toggle("spinBox");
                        }.bind(this), 11000)
                        setTimeout(function() {
                            setTypeBox("legendaryOpen");
                            setFinalState("legendary");
                            $('audio#orangeWin')[0].play()
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
                        }.bind(this), 13000)
                    }
                }else{
                    setTimeout(function() {
                        setTypeBox("rare");
                    }.bind(this), 2000)
                    setTimeout(function() {
                        setTypeBox("epic");
                    }.bind(this), 6000)
                    setTimeout(function() {
                        document.getElementById("box").classList.toggle("spinBox");
                    }.bind(this), 7000)
                    setTimeout(function() {
                        setTypeBox("epicOpen");
                        setFinalState("epic");
                        $('audio#karateka')[0].pause()
                        $('audio#karateka')[0].currentTime = 0
                        $('audio#blueWin')[0].play()
                    }.bind(this), 9000)
                }
            }else {
                setTimeout(function() {
                    setTypeBox("rare");
                }.bind(this), 2000)
                setTimeout(function() {
                    document.getElementById("box").classList.toggle("spinBox");
                }.bind(this), 3000)
                setTimeout(function() {
                    setTypeBox("rareOpen");
                    setFinalState("rare");
                    $('audio#karateka')[0].pause()
                    $('audio#karateka')[0].currentTime = 0
                    $('audio#greenWin')[0].play()
                }.bind(this), 5000)
            }
        }else{
            setTimeout(function() {
                setTypeBox("basicOpen");
                setFinalState("basic");
                $('audio#karateka')[0].pause()
                $('audio#karateka')[0].currentTime = 0
                $('audio#loose')[0].play()
            }.bind(this), 1000)
        }
    }
    useEffect(() => {
        if(finalState !== null){
            setTimeout(function() {
                document.getElementById("imgGame"+randomNumber).style.display = "block";
            }.bind(this), 300)
        }
    }, [finalState])
    function handleState() {
        props.change();
    }

    return(
        <>
            <div className={"gettedBoxContainer"}>
                {randomNumber &&
                    <div style={{display:"none"}} className={"gettedGameImg"} onClick={handleState} id={"imgGame"+randomNumber}>
                        <img className={"imgInBox"} src={"/images/jaquettes/"+props.consolePicked+"/jaquette ("+randomNumber+").png"}/>
                    </div>
                }
                <img id={"box"} onClick={openBox} uConsole={props.consolePicked} className={"gettedBoxImg"} src={"/"+typeBox+".png"} />
            </div>
        </>
    )
}
export default UniqueBoxV2
