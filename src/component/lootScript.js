$(document).ready(function(){
	var consoles = ["GB","GBA","GBC","MASTER SYSTEM","MEGADRIVE","N64","NDS","NES","NGC","PS1","PSP","SNES"];
	function checkOpen() {
		var allBoxes = $('.box-list li button');
		var allOpenBoxes = $('.box-list li button.open');
		var allBoxesAreOpen = (allBoxes.length === allOpenBoxes.length);

		if(allBoxesAreOpen)
			{
				$('#again').show();
			}
	}
	$('.box-list li').on('click', '.box', function (){
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
		if(localStorage.getItem("array100") === null){
			localStorage.setItem("array100",numbers);
		}
		function getNumber(selectedConsole) {
			var numbers = [];
			if(selectedConsole == "DREAMCAST"){
				var max = 77
			}
			if(selectedConsole == "GB"){
				var max = 432
			}
			if(selectedConsole == "GBA"){
				var max = 424
			}
			if(selectedConsole == "GBC"){
				var max = 233
			}
			if(selectedConsole == "MASTER SYSTEM"){
				var max = 194
			}
			if(selectedConsole == "MEGADRIVE"){
				var max = 400
			}
			if(selectedConsole == "N64"){
				var max = 133
			}
			if(selectedConsole == "NDS"){
				var max = 488
			}
			if(selectedConsole == "NES"){
				var max = 280
			}
			if(selectedConsole == "NGC"){
				var max = 234
			}
			if(selectedConsole == "PS1"){
				var max = 147
			}
			if(selectedConsole == "PSP"){
				var max = 286
			}
			if(selectedConsole == "SNES"){
				var max = 458
			}
			return Math.floor((Math.random() * max) + 1);
		}
		function getConsole() {
				var selectedConsole = consoles[Math.floor(Math.random()*consoles.length)]
				var consoleIndex = consoles.indexOf(selectedConsole);
				consoles.splice(consoleIndex, 1);
				return selectedConsole;
		}
		setTimeout(function (){
			var selectedConsole = getConsole();
			var number = getNumber(selectedConsole);
			$('#imgModal').attr("src","Images/"+selectedConsole+"/Jaquette ("+number+").png");
			var cookieArray = localStorage.getItem("array100").split(/,/);
			cookieArray.splice(cookieArray.indexOf(number), 1);
			localStorage.setItem("array100",cookieArray);
		},0)
		var box = $(this);
		box.parent(".button2").parent(".box-list li").attr('checked','checked');
		if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
					$("[checked=checked]").animate({"top": $("#centerBox").position().top, "left": $("#centerBox").position().left}, 1500);
		}else if (($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)) {
				$("[checked=checked]").animate({"top": "-200px", "left": "-250px"}, 1500);
		}else if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)){
			$("[checked=checked]").animate({"top": "200px"}, 1500);
		}else if(($("[checked=checked]").position().top < $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)){
			$("[checked=checked]").animate({"top": "200px", "left":"-250px"}, 1500);
		}else if(($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
			$("[checked=checked]").animate({"left":"250px"}, 1500);
		}else if(($("[checked=checked]").position().top == $("#centerBox").position().top) && ($("[checked=checked]").position().left > $("#centerBox").position().left)){
			$("[checked=checked]").animate({"left":"-250px"}, 1500);
		}else if(($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left < $("#centerBox").position().left)){
			$("[checked=checked]").animate({"top":"-200px","left":"250px"}, 1500);
		}else if(($("[checked=checked]").position().top > $("#centerBox").position().top) && ($("[checked=checked]").position().left == $("#centerBox").position().left)){
			$("[checked=checked]").animate({"top":"-200px"}, 1500);
		}
		var others = $('.box-list li').not($("[checked=checked],[alreadyopen=alreadyopen]"));
		others.css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 1500);
		if(box.hasClass('open'))
			{
				return;
			}
		setTimeout(function (){
			let rare = Math.floor((Math.random() * 100) + 1);
			$(box).animate(
    		{ deg: 360 },
		    {
		      duration: 500,
		      step: function(now) {
		        $(this).css({ transform: 'rotate(' + now + 'deg)' });
		      }
		    }
		  );
			if(rare <= 99){
				let epic = Math.floor((Math.random() * 2) + 1);
				setTimeout(function (){
					$(box).toggleClass("rareBox");
					$('#containerGlobal').toggleClass('shakeGreen');
				},1000);
				setTimeout(function (){
					$(box).animate(
		    		{ deg: 1440 },
				    {
				      duration: 500,
				      step: function(now) {
				        $(this).css({ transform: 'rotate(' + now + 'deg)' });
				      }
				    }
				  );
				},2000);
				if(epic == 1){
 					let legendary = Math.floor((Math.random() * 5) + 1);;
					setTimeout(function (){
						$(box).removeClass('rareBox'),
 						$(box).toggleClass("epicBox"),
						$('#containerGlobal').toggleClass('shakeBlue');
						$(box).toggleClass('shakeBlue');
						$(box).toggleClass('shakeBlue');
					},3000);
					setTimeout(function (){
						$(box).animate(
			    		{ deg: 2880 },
					    {
					      duration: 500,
					      step: function(now) {
					        $(this).css({ transform: 'rotate(' + now + 'deg)' });
					      }
					    }
					  );
					},4000);
					if(legendary == 1){
  					let ultra = Math.floor((Math.random() * 10) + 1);
						setTimeout(function (){
 							$(box).removeClass('epicBox'),
  						$(box).toggleClass("legendaryBox"),
							$('#containerGlobal').toggleClass('shakeOrange');
							$(box).toggleClass('shakeOrange');
							$(box).toggleClass('shakeOrange');
						},5000);
						setTimeout(function (){
							$(box).animate(
				    		{ deg: 11520 },
						    {
						      duration: 3000,
						      step: function(now) {
						        $(this).css({ transform: 'rotate(' + now + 'deg)' });
						      }
						    }
						  );
 						},6000);
						if(ultra == 1){
							$('.5000Texte').css('display','block');
						setTimeout(function (){
 							$(box).removeClass('legendaryBox'),
  						$(box).toggleClass("ultraBox"),
							$('#containerGlobal').toggleClass('shakeRainbow');
							$(box).toggleClass('shakeRainbow');
							$(box).toggleClass('shakeRainbow');
						},10000);
						setTimeout(function (){
						$('audio#rainbowWin')[0].play()
							box.removeClass('click');
							box.toggleClass('closed open');
							checkOpen();
						}, 10501);
						setTimeout(function (){
					  	$('#modal-container').removeAttr('class').addClass("one");
							$('audio#karateka')[0].pause()
							$('audio#karateka')[0].currentTime = 0
						},10502);
						}else{
							$('.1000Texte').css('display','block');
							setTimeout(function (){
								box.removeClass('click');
								box.toggleClass('closed open');
								checkOpen();
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
							box.removeClass('click');
							box.toggleClass('closed open');
							checkOpen();
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
						box.removeClass('click');
						box.toggleClass('closed open');
						checkOpen();
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
					box.removeClass('click');
					box.toggleClass('closed open');
					checkOpen();
				}, 501);
				setTimeout(function (){
					$('#modal-container').removeAttr('class').addClass("one");
					$('audio#loose')[0].play()
					$('audio#karateka')[0].pause()
					$('audio#karateka')[0].currentTime = 0
				},502);
			};
		},1501);
		// setTimeout(function (){
		// 	$('#containerGlobal').css("background-color","rgba(0,0,0,0.8)");
		// },6503),
		// setTimeout(function (){
		// }, 6502);
	});

	$('#again').on('click', function(){
		$('.box').toggleClass('open closed');
		$(this).hide();
	});
});
