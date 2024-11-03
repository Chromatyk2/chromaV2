import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import '../App.css';
import $ from 'jquery';
import UniqueBoxV2 from "./uniqueBoxV2";

function BangerBox(props) {

    if(props.console == "GB"){
        var max = 8
    }
    if(props.console == "GBA"){
        var max = 57
    }
    if(props.console == "GBC"){
        var max = 14
    }
    if(props.console == "MASTER SYSTEM"){
        var max = 7
    }
    if(props.console == "MEGADRIVE"){
        var max = 13
    }
    if(props.console == "N64"){
        var max = 31
    }
    if(props.console == "NDS"){
        var max = 99
    }
    if(props.console == "NES"){
        var max = 280
    }
    if(props.console == "NGC"){
        var max = 53
    }
    if(props.console == "PS1"){
        var max = 34
    }
    if(props.console == "PSP"){
        var max = 38
    }
    if(props.console == "SNES"){
        var max = 30
    }
    var randomNumber = Math.floor(Math.random()*max) + 1;
    function displayNormalLaderboard(e) {
        Axios.post('/api/addCurrentImage',
        {
            image:"/images/jaquettes/"+props.console+"/Jaquette ("+randomNumber+").png"
        })
        var console = props.console;
        var nbJaquette = randomNumber;
        $('#imgModal').attr("src","/images/Banger/"+console+"/Banger ("+nbJaquette+").png");
        $('audio#karateka')[0].play()
        $('.looseTexte').css('display','none');
        $('.100Texte').css('display','none');
        $('.500Texte').css('display','none');
        $('.1000Texte').css('display','none');
        $('.5000Texte').css('display','none');
        $('#containerGlobal').removeClass('shakeGreen');
        $('#containerGlobal').removeClass('shakeBlue');
        $('#containerGlobal').removeClass('shakeOrange');
        $('#containerGlobal').removeClass('shakeRainbow');
        $("#containerGlobal").animate({backgroundColor:'rgba(0,0,0,0.8)'}, 1500);
        var boxNumber = props.number;
        $("#bangerBox").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        if($("#bangerBox").hasClass('open'))
        {
            return;
        }
        setTimeout(function (){
            let rare = Math.floor((Math.random() * 100) + 1);
            $("#bangerBox").animate(
                { deg: 360 },
                {
                    duration: 500,
                    step: function(now) {
                        $(this).css({ transform: 'rotate(' + now + 'deg)' });
                    }
                }
            );
            if(rare < 99){
                let epic = Math.floor((Math.random() * 100) + 1);
                setTimeout(function (){
                    $("#bangerBox").toggleClass("rareBox");
                    $('#containerGlobal').toggleClass('shakeGreen');
                },1000);
                setTimeout(function (){
                    $("#bangerBox").animate(
                        { deg: 1440 },
                        {
                            duration: 500,
                            step: function(now) {
                                $(this).css({ transform: 'rotate(' + now + 'deg)' });
                            }
                        }
                    );
                },2000);
                if(epic < 90){
                    let legendary = Math.floor((Math.random() * 100) + 1);
                    setTimeout(function (){
                        $("#bangerBox").toggleClass("epicBox");
                        $('#containerGlobal').toggleClass('shakeBlue');
                    },3000);
                    setTimeout(function (){
                        $("#bangerBox").animate(
                            { deg: 2880 },
                            {
                                duration: 500,
                                step: function(now) {
                                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                                }
                            }
                        );
                    },4000);
                    if(legendary < 75){
                        let ultra = Math.floor((Math.random() * 100) + 1);
                        setTimeout(function (){
                            $("#bangerBox").toggleClass("legendaryBox");
                            $('#containerGlobal').toggleClass('shakeOrange');
                        },5000);
                        setTimeout(function (){
                            $("#bangerBox").animate(
                                { deg: 11520 },
                                {
                                    duration: 3000,
                                    step: function(now) {
                                        $(this).css({ transform: 'rotate(' + now + 'deg)' });
                                    }
                                }
                            );
                        },6000);
                        if(ultra < 50){
                            $('.5000Texte').css('display','inline-flex');
                            setTimeout(function (){
                                $("#bangerBox").toggleClass("ultraBox");
                                $('#containerGlobal').toggleClass('shakeRainbow');
                            },10000);
                            setTimeout(function (){
                                $('audio#rainbowWin')[0].play()
                                $("#bangerBox").removeClass('click');
                                $("#bangerBox").toggleClass('closed open');
                            }, 10501);
                            setTimeout(function (){
                                $('#modal-container').removeAttr('class').addClass("one");
                                $('audio#karateka')[0].pause()
                                $('audio#karateka')[0].currentTime = 0
                            },10502);
                        }else{
                            $('.1000Texte').css('display','block');
                            setTimeout(function (){
                                $("#bangerBox").removeClass('click');
                                $("#bangerBox").toggleClass('closed open');
                            }, 10501);
                            setTimeout(function (){
                                $('#modal-container').removeAttr('class').addClass("one");
                                $('audio#orangeWin')[0].play()
                                $('audio#karateka')[0].pause()
                                $('audio#karateka')[0].currentTime = 0
                            },10502);
                        };
                    }else{
                        $('.500Texte').css('display','block');
                        setTimeout(function (){
                            $("#bangerBox").removeClass('click');
                            $("#bangerBox").toggleClass('closed open');
                        }, 4501);
                        setTimeout(function (){
                            $('#modal-container').removeAttr('class').addClass("one");
                            $('audio#blueWin')[0].play()
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
                        },4502);
                    };
                }else{
                    $('.100Texte').css('display','block');
                    setTimeout(function (){
                        $("#bangerBox").removeClass('click');
                        $("#bangerBox").toggleClass('closed open');
                    }, 2501);
                    setTimeout(function (){
                        $('#modal-container').removeAttr('class').addClass("one");
                        $('audio#greenWin')[0].play()
                        $('audio#karateka')[0].pause()
                        $('audio#karateka')[0].currentTime = 0
                    },2502);
                };
            }else{
                $('.looseTexte').css('display','block');
                setTimeout(function (){
                    $("#bangerBox").removeClass('click');
                    $("#bangerBox").toggleClass('closed open');
                }, 501);
                setTimeout(function (){
                    $('#modal-container').removeAttr('class').addClass("one");
                    $('audio#loose')[0].play()
                    $('audio#karateka')[0].pause()
                    $('audio#karateka')[0].currentTime = 0
                },502);
            };
        },1501);
    }

    return(
        <>

            <div className="boxContainer">
                <button id={"buttonBox" + randomConsoles[val]} onClick={openModal}
                        className={"uniqueBoxContainer"}>
                    <p className={"nbBox"}>{val}</p>
                    <img uConsole={randomConsoles[val]} className={"imgBox"} src={"/basic.png"}/>
                </button>
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
                <UniqueBoxV2 consolePicked={pickConsole} change={handleState}/>
            </Modal>
        </>
    )
}

export default BangerBox
