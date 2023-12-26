// Below is my Game Manager, the heart of the game, in this game manager, we set all the functions needed in the game
// As well as all the variables that need defining.
class GameManager {
    constructor(time, pokemon) {
        this.pokemonArray = pokemon;
        this.time = time;
        this.timeLeft = time;
        this.level = document.getElementById('level');
        this.timer = document.getElementById('timer');
        this.counter = document.getElementById('moves');
        this.lose = document.getElementById('losing-text')
        this.win = document.getElementById('winning-text')
        this.audioController = new AudioManager();
    }
    // This is the startgame function, that sets out the defaults when the game starts, this function will 
    // be called in the beginning
    startGame() {
        this.totalMoves = 0;
        this.timeLeft = this.time;
        this.cardChecking = null;
        this.selectedCards = [];
        this.loading = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shufflePokemon(this.pokemonArray);
            this.countdown = this.startCountdown();
            this.loading = false;
        }, 500);
        this.resetCards();
        this.timer.innerText = this.timeLeft;
        this.counter.innerText = this.totalMoves;
        this.level.innerText = "Master"
        }
        // Here we have our countdown function that simply counts down from the time we input into it.
    startCountdown() {
        return setInterval(() => {
            this.timeLeft--;
            this.timer.innerText = this.timeLeft;
            if (this.timeLeft === 0)
                this.lost();
            if (this.timeLeft < 30 && this.timeLeft >= 15){
                this.level.innerText = "Intermediate";
            }
            else if (this.timeLeft < 15 && this.timeLeft > 0){
            this.level.innerText = "Amateur";
            }
                
        },1000);
    }
    // This function removes the visible and matched classes from the pokemon cards essentially to flip them over.
    resetCards() {
        this.pokemonArray.forEach(pokemon => {
            pokemon.classList.remove('visible');
            pokemon.classList.remove('matched');
        })
    }
    // This function allows us to flip over the cards and count the number of flips
    flipPokemonCard(pokemon) {
        if(this.flipRestriction(pokemon)) {
            this.totalMoves++;
            this.counter.innerText = this.totalMoves;
            pokemon.classList.add('visible');
            if(this.cardChecking) {
                this.check(pokemon);
            }
            else {
                this.cardChecking = pokemon;
            }
        }
    }
    // This function is checking if the two cards selected are the same or not, if they are the same
    // it passes it into the pokemonMatched function (defined below), if they're not the same, it gets
    // passed into the pokemonNotMatched function (also defined below).
    check(pokemon) {
        if(this.pokemonType(pokemon) === this.pokemonType(this.cardChecking))
           this.pokemonMatched(pokemon,this.cardChecking);
      
        else 
        this.pokemonNotMatched(pokemon, this.cardChecking);
        this.cardChecking = null;
    }
    // When the pokemon match, they get pushed into an array defined above called selectedCards.
    // Once this array has all the cards in it, that is when the won function gets called 
    pokemonMatched(firstPokemon, secondPokemon) {
        this.selectedCards.push(firstPokemon);
        this.selectedCards.push(secondPokemon);
        firstPokemon.classList.add('matched');
        secondPokemon.classList.add('matched');
        this.audioController.matching();
        if(this.selectedCards.length == 16) {
             this.won();
        }
    }
    // When the pokemon dont match, they have the visible class removed from them, so that they get flipped over.
    pokemonNotMatched(firstPokemon, secondPokemon) {
        this.loading = true;
        setTimeout(() => {
            firstPokemon.classList.remove('visible');
            secondPokemon.classList.remove('visible');
            this.loading = false;
        },1000);
    }
    // In this function, we are getting the source img file from the pokemon in the html file, this is what is being checked to see if the cards match.
    pokemonType(pokemon) {
        return pokemon.getElementsByClassName("pokemon-value")[0].src;
    }
    // This is the lost function, we show the losing screen when the player loses the game and we play the sound effect
    lost() {
        clearInterval(this.countdown); 
        this.lose.classList.add('visible'); 
        this.audioController.lose();
    }
      // This is the won function, we show the winning screen when the player wins the game and we play the sound effect
    won() {
        clearInterval(this.countdown);
        this.win.classList.add('visible');
        this.audioController.win();
        let level = document.getElementById('level').innerText;
        document.getElementById('final-trainer-level').innerText = "Level: " + level;
    }
    // This is the function that shuffles around the pokemon after every game. Using a for loop, we iterate over every card and assign it a random integer in an order.
    shufflePokemon() {
        for(let i = this.pokemonArray.length -1; i>0; i--) {
                let randomIndex = Math.floor(Math.random() * (i+1));
                this.pokemonArray[randomIndex].style.order = i;
                this.pokemonArray[i].style.order = randomIndex;
        }
    }
    // This function defines conditions that allows the user to flip over the cars, this prevents the player from continiously flipping over cards all the time.
    flipRestriction(pokemon) { 
        return !this.loading && !this.selectedCards.includes(pokemon) && pokemon !== this.cardChecking;
    }
}

// Below is my audio manager, where all the audio magic happens
class AudioManager {
    constructor() {
        this.music = new Audio('Objects/Audio/Pokémon Theme Song (320 kbps).mp3')
        this.music.volume = 0.1;
        this.music.loop = false;
        this.winSoundEffect = new Audio('Objects/Audio/count-on-you.mp3')
        this.matchingSound = new Audio('Objects/Audio/pika.mp3')
        this.loseSoundEffect = new Audio('Objects/Audio/Super Mario Bros. - Game Over Sound Effect (320 kbps).mp3')
        this.loseSoundEffect.volume = 0.5;
        this.matchingSound.volume = 0.5;
    }
    // Each function below exists as an audio control feature, whether its on the music or sound effects
    // These functions are called at various moments in the game manager
    startMusic() {
        this.music.play()
    }
    stopMusic() {
        this.music.pause();
        this.music.currentTime = 0;
    }
    win() {
    this.winSoundEffect.play();
    this.stopMusic();  

}
    matching() {
    this.matchingSound.play();
    }
    lose() {
    this.loseSoundEffect.play();
    this.stopMusic();
    }
}

// This begin function defines the initiation of the game, once the user clicks on the coverText, we remove the visible class from it and call
// the startGame() function we define in the Game Manager below.

function begin() {
    let coverTexts = Array.from(document.getElementsByClassName('cover-text'));
    let pokemons = Array.from(document.getElementsByClassName('pokemon'));
    let arcadeGame = new GameManager(60,pokemons);
    // For each cover text, we add a clickable event to remove the cover text, and start the game.
    coverTexts.forEach(coverText => {
        coverText.addEventListener('click', () => {
            coverText.classList.remove('visible');
            arcadeGame.startGame();
        })
    })
    // For each pokemon, we add a clicklable event on each card so the player can flip it over.
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('click', () => {
            arcadeGame.flipPokemonCard(pokemon);
        })
    })
}

// Once the document has been loaded, we run the begin function above. 

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',begin);
} else {
    begin();
}