import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter, Link} from "react-router-dom";
import env from "react-dotenv";
import {useCookies} from "react-cookie";
import Twitch from '../twitch.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from "react-modal";
import UniqueBoxV2 from "./uniqueBoxV2";


function OnStream() {
    const [cookies, setCookie] = useCookies();
    const [count, setCount] = useState(0);
    const [stream, setStream] = useState(null);
    const [meetUp, setMeetUp] = useState(null);
    const [displayStream, setDisplayStream] = useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const pseudo = cookies.user.data[0].login;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        button:{

            background: "none",
            border: "none",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginBottom: "20px",
            fontWeight: "bolder"
        }
    };
    useEffect(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=chromatyk',
                {
                    headers:{
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function(response){
                setStream(response.data);
                if(response.data.length > 0){
                    setDisplayStream(true)
                    setIsOpen(true)
                }else{
                    setDisplayStream(false)
                }
            })
    }, [])

    useEffect(() => {

        setInterval(() => {
            Axios.get(
                'https://api.twitch.tv/helix/streams?user_login=chromatyk',
                {
                    headers:{
                        'Authorization': `Bearer ${cookies.token.access_token}`,
                        'Client-Id': process.env.REACT_APP_CLIENT_ID
                    }
                }
            ).then(function(response){
                setStream(response.data);
                if(response.data.length > 0){
                    setDisplayStream(true)
                    setIsOpen(true)
                }else{
                    setDisplayStream(false)
                }
            })
        }, 60000)
    }, [])
    function displayStreamOff() {
        setDisplayStream(false);
    }
    function displayStreamOn() {
        setDisplayStream(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
            {stream &&
            stream.data.length > 0 ?
                <>
                    <a className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img style={{width:"50px"}} src={Twitch}/></a>
                </>
                    :
                <a className={"linkOnAirOff"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img style={{width:"50px"}} src={Twitch}/></a>
            }
            {stream &&
                        <div style={displayStream === false ? {visibility:"hidden", height:0, position: "absolute",zIndex: "-10"} : {visibility:"visible", position: "absolute",zIndex: "-10"}} className="twitch">
                            <div className="twitch-video">
                                <iframe
                                    src="https://player.twitch.tv/?channel=chromatyk&parent=chromatyk.fr&autoplay=true&muted=false"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowFullScreen="true"
                                    height="720"
                                    width="1280">
                                </iframe>
                            </div>
                        </div>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button style={customStyles.button} onClick={closeModal}>x</button>
                <p>Chromatyk est en stream !</p>
                <p>Rejoint le en cliquant ici :</p>
                <a style={{position:"initial"}} className={"linkOnAir"} href={"https://twitch.tv/chromatyk"} target={"_blank"}><img style={{display:"block", margin:"auto",width: "50px"}} src={Twitch}/></a>
            </Modal>
        </>

    );
}

export default OnStream;
