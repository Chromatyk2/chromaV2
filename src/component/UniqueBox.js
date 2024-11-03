import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import '../App.css';
import $ from 'jquery';

function UniqueBox(props) {

    if(props.console == "GB"){
        var max = 432
    }
    if(props.console == "GBA"){
        var max = 424
    }
    if(props.console == "GBC"){
        var max = 233
    }
    if(props.console == "MASTER SYSTEM"){
        var max = 194
    }
    if(props.console == "MEGADRIVE"){
        var max = 400
    }
    if(props.console == "N64"){
        var max = 133
    }
    if(props.console == "NDS"){
        var max = 488
    }
    if(props.console == "NES"){
        var max = 280
    }
    if(props.console == "NGC"){
        var max = 234
    }
    if(props.console == "PS1"){
        var max = 147
    }
    if(props.console == "PSP"){
        var max = 286
    }
    if(props.console == "SNES"){
        var max = 458
    }
    var randomNumber = Math.floor(Math.random()*max) + 1;
    function displayNormalLaderboard(e) {
        Axios.post('/api/addCurrentImage',
        {
            image:"/images/jaquettes/"+props.console+"/Jaquette ("+randomNumber+").png"
        })
        var console = props.console;
        var nbJaquette = randomNumber;
        $('#imgModal').attr("src","/images/jaquettes/"+console+"/Jaquette ("+nbJaquette+").png");
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
        $("#nbBox"+boxNumber).parent(".button2").parent(".box-list li").attr('checked','checked');
        if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "200px","left": "600px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px", "left": "50px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "200px", "left": "300px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "230px", "left": "50px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top":"30px","left": "600px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top":"30px","left": "50px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px", "left": "600px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "-200px","left": "300px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        } else if (($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)) {
            $("[checked=checked]").animate({"top": "30px","left": "300px"}, 1500);
            $("[checked=checked]").children(".button2").children(".button2").animate({"height": "500px", "width": "500px"}, 1500);
        }
        var others = $('.box-list li').not($("[checked=checked],[alreadyopen=alreadyopen]"));
        others.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 1500);
        if($("#nbBox"+boxNumber).hasClass('open'))
        {
            return;
        }
        setTimeout(function (){
            let rare = Math.floor((Math.random() * 100) + 1);
            $("#nbBox"+boxNumber).animate(
                { deg: 1440 },
                {
                    duration: 500,
                    iterations: 1,
                    step: function(now) {
                        $(this).css({ transform: 'rotate(' + now + 'deg)' });
                    }
                }
            );
            if(rare < 99){
                let epic = Math.floor((Math.random() * 2) + 1);
                setTimeout(function (){
                    $("#nbBox"+boxNumber).toggleClass("rareBox");
                    $('#containerGlobal').toggleClass('shakeGreen');
                },2000);
                setTimeout(function (){
                    $("#nbBox"+boxNumber).animate(
                        { deg: 1440 },
                        {
                            duration: 500,
                            iterations: 1,
                            step: function(now) {
                                $(this).css({ transform: 'rotate(' + now + 'deg)' });
                            }
                        }
                    );
                },2000);
                if(epic == 1){
                    let legendary = Math.floor((Math.random() * 5) + 1);
                    setTimeout(function (){
                        $("#nbBox"+boxNumber).toggleClass("epicBox");
                        $('#containerGlobal').toggleClass('shakeBlue');
                    },4500);
                    setTimeout(function (){
                        $("#nbBox"+boxNumber).animate(
                            { deg: 2880 },
                            {
                                duration: 500,
                                iterations: 1,
                                step: function(now) {
                                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                                }
                            }
                        );
                    },4500);
                    if(legendary == 1){
                        let ultra = Math.floor((Math.random() * 10) + 1);
                        setTimeout(function (){
                            $("#nbBox"+boxNumber).toggleClass("legendaryBox");
                            $('#containerGlobal').toggleClass('shakeOrange');
                        },6500);
                        setTimeout(function (){
                            $("#nbBox"+boxNumber).animate(
                                { deg: 11520 },
                                {
                                    duration: 3000,
                                    iterations: 1,
                                    step: function(now) {
                                        $(this).css({ transform: 'rotate(' + now + 'deg)' });
                                    }
                                }
                            );
                        },6500);
                        if(ultra == 1){
                            $('.5000Texte').css('display','inline-flex');
                            setTimeout(function (){
                                $("#nbBox"+boxNumber).toggleClass("ultraBox");
                                $('#containerGlobal').toggleClass('shakeRainbow');
                            },8500);
                            setTimeout(function ()
                            {
                                $("#nbBox"+boxNumber).animate(
                                  { deg: 11520 },
                                  {
                                      duration: 3000,
                                      iterations: 1,
                                      step: function(now) {
                                          $(this).css({ transform: 'rotate(0)' });
                                      }
                                  }
                                );
                                $('audio#rainbowWin')[0].play()
                                $("#nbBox"+boxNumber).removeClass('click');
                                $("#nbBox"+boxNumber).toggleClass('closed open');
                            }, 10500);
                            setTimeout(function (){
                                $('#modal-container').removeAttr('class').addClass("one");
                                $('audio#karateka')[0].pause()
                                $('audio#karateka')[0].currentTime = 0
                            },10700);
                        }else{
                            $('.1000Texte').css('display','block');
                            setTimeout(function (){
                                $("#nbBox"+boxNumber).animate(
                                  { deg: 11520 },
                                  {
                                      duration: 3000,
                                      iterations: 1,
                                      step: function(now) {
                                          $(this).css({ transform: 'rotate(0)' });
                                      }
                                  }
                                );
                                $("#nbBox"+boxNumber).removeClass('click');
                                $("#nbBox"+boxNumber).toggleClass('closed open');
                            }, 8500);
                            setTimeout(function (){
                                $('#modal-container').removeAttr('class').addClass("one");
                                $('audio#orangeWin')[0].play()
                                $('audio#karateka')[0].pause()
                                $('audio#karateka')[0].currentTime = 0
                            },8700);
                        };
                    }else{
                        $('.500Texte').css('display','block');
                        setTimeout(function (){
                            $("#nbBox"+boxNumber).animate(
                              { deg: 11520 },
                              {
                                  duration: 3000,
                                  iterations: 1,
                                  step: function(now) {
                                      $(this).css({ transform: 'rotate(0)' });
                                  }
                              }
                            );
                            $("#nbBox"+boxNumber).removeClass('click');
                            $("#nbBox"+boxNumber).toggleClass('closed open');
                        }, 6500);
                        setTimeout(function (){
                            $('#modal-container').removeAttr('class').addClass("one");
                            $('audio#blueWin')[0].play()
                            $('audio#karateka')[0].pause()
                            $('audio#karateka')[0].currentTime = 0
                        },6700);
                    };
                }else{
                    $('.100Texte').css('display','block');
                    setTimeout(function (){
                        $("#nbBox"+boxNumber).animate(
                          { deg: 11520 },
                          {
                              duration: 3000,
                              iterations: 1,
                              step: function(now) {
                                  $(this).css({ transform: 'rotate(0)' });
                              }
                          }
                        );
                        $("#nbBox"+boxNumber).removeClass('click');
                        $("#nbBox"+boxNumber).toggleClass('closed open');
                    }, 4000);
                    setTimeout(function (){
                        $('#modal-container').removeAttr('class').addClass("one");
                        $('audio#greenWin')[0].play()
                        $('audio#karateka')[0].pause()
                        $('audio#karateka')[0].currentTime = 0
                    },4200);
                };
            }else{
                $('.looseTexte').css('display','block');
                setTimeout(function (){
                    $("#nbBox"+boxNumber).animate(
                      { deg: 11520 },
                      {
                          duration: 3000,
                          iterations: 1,
                          step: function(now) {
                              $(this).css({ transform: 'rotate(0)' });
                          }
                      }
                    );
                    $("#nbBox"+boxNumber).removeClass('click');
                    $("#nbBox"+boxNumber).toggleClass('closed open');
                }, 10000);
                setTimeout(function (){
                    $('#modal-container').removeAttr('class').addClass("one");
                    $('audio#loose')[0].play()
                    $('audio#karateka')[0].pause()
                    $('audio#karateka')[0].currentTime = 0
                },100000);
            };
        },1500);
    }

    return(
        <>
            <li onClick={displayNormalLaderboard} className={"uniqueBox"} id={props.number === 5 ? 'centerBox' : 'otherBox'}>
                <div id="one" className="button2">
                    <p className="nbBox">{props.number}</p>
                    <div type="button" className={"button2 box closed"}  id={"nbBox"+props.number}></div>
                </div>
            </li>
        </>
    )
}
export default UniqueBox
