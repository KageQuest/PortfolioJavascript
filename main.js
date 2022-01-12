/*
 * Kage.Quest Main Script
 * Handles section transitions, buttons, and other fun stuff
 *
 * @author Kage Longbotham
 * @year 2021 - 2022
 */

//Define Buttons
const HomeAbout = document.querySelector("#HomeAbout");
const HomeWeb = document.querySelector("#HomeWeb");
const HomeCode = document.querySelector("#HomeCode");
const HomeGames = document.querySelector("#HomeGames");
const HomeContact = document.querySelector("#HomeContact");

//Define Sections
const Home = document.querySelector("#Home");
const About = document.querySelector("#About");
const Web = document.querySelector("#Web");
const Code = document.querySelector("#Code");
const Games = document.querySelector("#Games");
const Contact = document.querySelector("#Contact");
const NotFound = document.querySelector("#NotFound");

//Define Misc. Elements + Vars
const Logo = document.querySelector("#Logo");
const Body = document.body;
const webCarousel = document.querySelector(".web-carousel");
const webPieces = [...webCarousel.children];
const codeCarousel = document.querySelector(".code-carousel");
const codePieces = [...codeCarousel.children];
const gameCarousel = document.querySelector(".game-carousel");
const gamePieces = [...gameCarousel.children];
const sections = [Home, About, Web, Code, Games, Contact, NotFound];
const sectionButtons = [HomeAbout, HomeWeb, HomeCode, HomeGames, HomeContact];

const searchParams = new URLSearchParams(location.search);

//Preset Home style opacity -- this is mostly bug prevention
Home.style.opacity = "100";

/*
 * Removes logo styling on screen-size change
 * This should hopefully prevent bugs or sizing issues on mobile
 * or when resizing screens on desktop
 *
 * @param {none}
 * @returns {void}
 */
window.addEventListener("resize", () => {
	if(Home.style.opacity == "100") {
		Logo.removeAttribute("style");
	}
});

/*
 * Returns a random number between 2 given numbers, rounded down
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

/*
 * Changes the logo
 *
 * @param {String} position CSS Top position, ex: "40%"
 * @returns {void}
 */
const updateLogo = (position) => {
	Logo.style.top = position
	if(position == "40%") {
		Logo.style.width = "250px";
		Logo.style.height = "250px";
	} else if(position == "15%") {
		Logo.style.width = "150px";
		Logo.style.height = "150px";
	}
};

/*
 * Shuffles arrays using the Fisher-Yates (Knuth) shuffle
 *
 * @param {Array} array The array to be shuffled
 * @returns {Array}
 */
const shuffle = (array) => {
	let currentIndex = array.length,
		randomIndex;
	while(currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
};

/*
 * Sets the display of all other elements to the target
 *
 * @param {Element} section The div element to be kept displayed
 * @returns {void}
 */
const hideSectionsExcept = (section) => {
	Home.style.opacity = "0";
	About.style.opacity = "0";
	Web.style.opacity = "0";
	Code.style.opacity = "0";
	Games.style.opacity = "0";
	Contact.style.opacity = "0";
  NotFound.style.opacity = "0";
	setTimeout(() => {
		sections.forEach(s => {
			if(s != section) {
				s.style.display = "none";
			}
		});
	}, 1000);
};

/*
 * Hides all sections and then displays the passed element
 *
 * @param {Element} section The div element to be transitioned into
 * @returns {void}
 */
const swapSections = (section) => {
	//Hide all sections
	hideSectionsExcept(section);
	if(section === Home) {
    searchParams.delete('section');
    searchParams.delete('piece');
		if(Body.style.backgroundColor != "#83bc00") {
			Body.style.backgroundColor = "#83bc00";
		}
		if(Logo.style.top != "40%" && window.innerWidth > 767) {
			updateLogo("40%");
		} else if(window.innerWidth <= 767) {
			Logo.removeAttribute("style");
		}
		section.style.display = "block";
		setTimeout(() => {
			Home.style.display = "block";
			setTimeout(() => {
				Home.style.opacity = "100";
			}, 1000);
		}, 1);
	} else if(section == Contact || section == About || section == NotFound) {
  	searchParams.delete('piece');
		if(Body.style.backgroundColor != "#83bc00") {
			Body.style.backgroundColor = "#83bc00";
		}
		if(Logo.style.top != "15%" && window.innerWidth > 767) {
			updateLogo("15%");
		} else if(window.innerWidth <= 767) {
			Logo.removeAttribute("style");
		}
		setTimeout(() => {
			section.style.display = "block";
			setTimeout(() => {
				if(section == Contact) {
					Contact.style.opacity = "100";
				} else if(section == About) {
					About.style.opacity = "100";
				} else {
        	NotFound.style.opacity = "100";
        }
			}, 1000);
		}, 1);
	} else {
		if(Body.style.backgroundColor != "#62686e") {
			Body.style.backgroundColor = "#62686e";
		}
		if(Logo.style.top != "15%" && window.innerWidth > 767) {
			updateLogo("15%");
		} else if(window.innerWidth <= 767) {
			Logo.removeAttribute("style");
		}
		setTimeout(() => {
			section.style.display = "block";
			setTimeout(() => {
				section.style.opacity = "100";
			}, 1000);
		}, 1);
	}
  if(section === Home) {
		window.history.replaceState({}, '', `${location.pathname}`);
  } else {
  	window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
  }
	if(section !== NotFound) {
  	document.title = section.id + " - Kage.Quest"
  } else {
  	document.title = "404 - Kage.Quest"
  }
};

/*
 * Assign Data
 */
const setDataToPieces = (arr) => {
	for(let i = 0; i < arr.length; i++) {
  	arr[i].setAttribute('data-piece-name', arr[i].childNodes[1].childNodes[1].textContent);
  }
};
setDataToPieces(webPieces);
setDataToPieces(codePieces);
setDataToPieces(gamePieces);

//Back to home buttons
let homeButtons = document.querySelectorAll(".returntohome");
homeButtons.forEach(btn => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({top: 0, behavior: 'smooth'});
		swapSections(Home);
	});
});

//Go To Contact buttons
let contactButtons = document.querySelectorAll(".gotocontact");
contactButtons.forEach(btn => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		window.scrollTo({top: 0, behavior: 'smooth'});
    searchParams.set('section', 'Contact');
		swapSections(Contact);
	});
});

//Home section buttons
sectionButtons.forEach(btn => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
    searchParams.set('section', e.target.textContent);
		switch(e.target.textContent) {
			case "About":
				swapSections(About);
				break;
			case "Web":
        searchParams.set('piece', webCarousel.querySelector('.active').getAttribute('data-piece-name'));
				swapSections(Web);
				break;
			case "Code":
        searchParams.set('piece', codeCarousel.querySelector('.active').getAttribute('data-piece-name'));
				swapSections(Code);
				break;
			case "Games":
        searchParams.set('piece', gameCarousel.querySelector('.active').getAttribute('data-piece-name'));
				swapSections(Games);
				break;
			case "Contact":
				swapSections(Contact);
				break;
		}
	});
});

//@TODO: Everything below should be tidied and consolidated at some point; right now its messy and bulky with a lot of repeated code.

/*
 * Everything for the web portfolio section
 */
shuffle(webPieces);
for(const piece of webPieces) {
	webCarousel.appendChild(piece);
}
webPieces[0].classList.add("active");
let webTotal = webPieces.length;
let webCurrent = 0;
const setWebSlide = (prev, next) => {
  let webSlide = webCurrent;
	if(next > webTotal - 1) {
		webSlide = 0;
		webCurrent = 0;
	}
	if(next < 0) {
		webSlide = webTotal - 1;
		webCurrent = webTotal - 1;
	}
	webPieces[prev].classList.remove("active");
	webPieces[webSlide].classList.add("active");
  searchParams.set('piece', webPieces[webSlide].getAttribute('data-piece-name'));
  window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
	setTimeout(function() {}, 800);
};
const moveWebRight = (e) => {
	e.preventDefault();
	let webNext = webCurrent;
	webCurrent = webCurrent + 1;
	setWebSlide(webNext, webCurrent);
};
const moveWebLeft = (e) => {
	e.preventDefault();
	let webPrev = webCurrent;
	webCurrent = webCurrent - 1;
	setWebSlide(webPrev, webCurrent);
};
document.querySelector(".web-moveright").addEventListener("click", moveWebRight);
document.querySelector(".web-moveleft").addEventListener("click", moveWebLeft);
webCarousel.addEventListener("swiped-right", moveWebRight);
webCarousel.addEventListener("swiped-left", moveWebLeft);

/*
 * Everything for the code portfolio section
 */
shuffle(codePieces);
for(const piece of codePieces) {
	codeCarousel.appendChild(piece);
}
codePieces[0].classList.add("active");
let codeTotal = codePieces.length;
let codeCurrent = 0;
const setCodeSlide = (prev, next) => {
	let codeSlide = codeCurrent;
	if(next>codeTotal-1) {
		codeSlide = 0;
		codeCurrent = 0;
	}
	if(next < 0) {
		codeSlide = codeTotal-1;
		codeCurrent = codeTotal-1;
	}
	codePieces[prev].classList.remove("active");
	codePieces[codeSlide].classList.add("active");
  searchParams.set('piece', codePieces[codeSlide].getAttribute('data-piece-name'));
  window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
	setTimeout(function () {}, 800);
};
const moveCodeRight = (e) => {
	e.preventDefault();
	let codeNext = codeCurrent;
	codeCurrent = codeCurrent+1;
	setCodeSlide(codeNext,codeCurrent);
};
const moveCodeLeft = (e) => {
	e.preventDefault();
	let codePrev = codeCurrent;
	codeCurrent = codeCurrent-1;
	setCodeSlide(codePrev,codeCurrent);
};
document.querySelector(".code-moveright").addEventListener("click",moveCodeRight);
document.querySelector(".code-moveleft").addEventListener("click",moveCodeLeft);
codeCarousel.addEventListener("swiped-right",moveCodeRight);
codeCarousel.addEventListener("swiped-left",moveCodeLeft);

/*
 * Everything for the games portfolio section
 */
shuffle(gamePieces);
for(const piece of gamePieces) {
	gameCarousel.appendChild(piece);
}
gamePieces[0].classList.add("active");
let gameTotal = gamePieces.length;
let gameCurrent = 0;
const setGameSlide = (prev, next) => {
	let gameSlide = gameCurrent;
	if(next > gameTotal - 1) {
		gameSlide = 0;
		gameCurrent = 0;
	}
	if(next < 0) {
		gameSlide = gameTotal - 1;
		gameCurrent = gameTotal - 1;
	}
	gamePieces[prev].classList.remove("active");
	gamePieces[gameSlide].classList.add("active");
  searchParams.set('piece', gamePieces[gameSlide].getAttribute('data-piece-name'));
  window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
	setTimeout(function() {}, 800);
};
const moveGameRight = (e) => {
	e.preventDefault();
	let gameNext = gameCurrent;
	gameCurrent = gameCurrent + 1;
	setGameSlide(gameNext, gameCurrent);
};
const moveGameLeft = (e) => {
	e.preventDefault();
	let gamePrev = gameCurrent;
	gameCurrent = gameCurrent - 1;
	setGameSlide(gamePrev, gameCurrent);
};
document.querySelector(".game-moveright").addEventListener("click", moveGameRight);
document.querySelector(".game-moveleft").addEventListener("click", moveGameLeft);
gameCarousel.addEventListener("swiped-right", moveGameRight);
gameCarousel.addEventListener("swiped-left", moveGameLeft);


/*
 * URL Parameter logic; change the page to the correct section and piece if the params exist
 */
if(searchParams.has('section')) {
	let currentSection = searchParams.get('section');
	let found = false;
  sections.forEach((el) => {
  	if(el.id === currentSection) {
    	found = true;
    	swapSections(el);
    }
  });
  if(!found) {
  	swapSections(NotFound);
  }
  if(searchParams.has('piece')) {
  	let currentCarousel;
    if(currentSection === "Web") {
    	currentCarousel = webPieces;
    } else if(currentSection === "Code") {
    	currentCarousel = codePieces;
    } else if(currentSection === "Games") {
    	currentCarousel = gamePieces;
    }
    currentCarousel[0].classList.remove('active');
    for(const piece of currentCarousel) {
    	if(piece.getAttribute('data-piece-name') == searchParams.get('piece')) {
      	piece.classList.add('active');
        if(currentSection === "Web") {
        	webCurrent = webPieces.indexOf(piece);
        } else if(currentSection === "Code") {
          codeCurrent = codePieces.indexOf(piece);
        } else if(currentSection === "Games") {
          gameCurrent = gamePieces.indexOf(piece);
        }
        break;
      }
    }
  }
}

/*
 * Fun little logo effect
 * Creates random stats increases that appear on screen if the logo is clicked while on the home page
 */
const stats = [
	'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
  'Gumption',
  'Vim',
  'Imagination',
  'Pulchritude',
  'Etiquette',
  'Blood Sugar',
  'Emotions',
  'Sick Burn',
  'Hysteria',
  'Nerves',
  'Vitality',
  'Mangrit',
  'Boon',
  'Fakeness',
  'Aegis',
  'Determination',
  'Suspicion',
  'Crunchyness',
  'Bees',
  'Muscle',
  'Mysticality',
  'Moxie',
  'Panache',
  'Chutzpah',
  'Beard',
  'Sarcasm',
  'Wizardliness',
  'Health',
  'Mana',
  'Moustache',
  'Love',
  'Inventory',
  'Speed',
  'Luck',
  'Bone Density',
  'Cake Baking',
  'Aspiration',
  'Grit',
  'Hair',
  'Audacity',
  'Vigor',
  'Zeal',
  'Synergy',
  'Visibility',
  'Core Competecy',
  'Ballpark',
  'Sustainability',
  'Holistics',
  'Impact',
  'Bandwidth',
  'Disruption',
  'Data',
  'RAM',
  'Memory',
  'Motivation',
  'Supervision',
  'Business Sense'
];

//Logo/Home Button
Logo.addEventListener("click", (e) => {
	e.preventDefault();
	if(Home.style.opacity != "100") {
		window.scrollTo({top: 0, behavior: 'smooth'});
		swapSections(Home);
	} else {
  	let newStat = document.createElement('p');
    let increaseAmt = Math.floor(Math.random() * (6 - 1) + 1);
    let stat = stats[Math.floor(Math.random() * stats.length)];
    newStat.innerText = `${stat} +${increaseAmt}`;
    newStat.classList.add('stat');
    newStat.setAttribute('unselectable', 'on');
    newStat.style.left = getRandomNumber(20, window.innerWidth - 100 - newStat.offsetWidth) + 'px';
    newStat.style.top = getRandomNumber(100, window.innerHeight - 50) + 'px';
    Body.appendChild(newStat);
    setTimeout(() => {
    	newStat.classList.add('statFade');
      setTimeout(() => {
      	newStat.remove();
      }, 3000);
    }, 10);
  }
});
