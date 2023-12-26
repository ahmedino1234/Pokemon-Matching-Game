# Pokemon-Matching-Game

### Deliverables

This is a recreation of the matching pairs card game with a pokemon theme -- one of my favorite games growing up.

### Rules of the game

The rules are pretty simple and just like the traditional matching pairs card game:

1. Objective of the game is to find all the matching pairs of pokemon laid out on the gameboard (ie. the screen).
1. Click on a card to flip it over, if it is the first card flipped, it will stay face up until a second card has been selected.
1. If the two selected cards match, great job, you've found a pair, if not, both cards will flip back over and process repeats.
1. You only have 60 seconds to complete the task to win the game, otherwise, it's game over :(
1. Complete the task in 30 seconds or less to achieve a Master trainer level, in 45 seconds or less, and you're an intermediate, and less than 60 seconds, and you're an amateur.

### Technologies Used

- Javascript
- HTML
- CSS 

Implemented object oriented programming in javascript for game functionality.

No external frameworks or libraries that have been used for this project, however, a lot of help came from the below resources: 
- [Card Shuffling Algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
- [CSS Grid](https://www.w3schools.com/css/css_grid.asp)
- [Poker Card Game in js](https://www.101computing.net/poker-card-game-javascript/)
- [Countdown function](https://stackoverflow.com/questions/20618355/how-to-write-a-countdown-timer-in-javascript/20618592#20)
- [Shuffle Card function](https://www.programiz.com/javascript/examples/shuffle-card)
- [JS Tutorial](https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript)



### Any Known Bugs

As of March 19th, 2021 (Unit 1 Project submission), the following bug(s) exist in the game:
- As soon as the page is refreshed, the user can see the animation of the cards flipping in the background, which was not intentional, however, this does not affect the game whatsoever. 
- Sometimes the sound effects dont playback on the restart of the game.

### How I Implemented the Game 

The nature of the game was pretty simple to explain in words, but the tricky part was obviously translating plain written English into code. Here's how I achieved this:

- I first started designing the layout of the game with the help of certain tools online and writing down notes as well. These design were then implemented into the html page. The body in the html page consists of the 'Page Title', 'Game information' (time and score), and then the gameboard itself. Note,the gameboard is what holds the cards (styled as divs). After all the importants elements were coded into the html file, it was time to style it. 
- Then I started to construct my css style sheet as per my design specifications. I decided to style my page before entering the javascript functionality just to make it easier to visualize the final product. With the being, said, only minimal styling was completed just to make the page more readable. Once I felt I had formatted the page enough, I moved into the javascript file.
- As stated above, I implemented object oriented progamming into my js file. As this was very new to me, I spent a lot of time researching into it and found it was very much ideal for the functions that I was trying to make. I first made the class called 'MatchClass' which includes all the in-game functions needed such as starting the game, flipping the cards, seeing if the cards match, etc. I did seek help for some of these functions and how they were constructed in other applications. For example, I looked up how a function was written for a countdown timer in an arcade game, how to check for matching cards in a game of blackjack, and so and so forth. 
-  While the 'MatchClass' held all the necessary functions, the function to actually run the game was done in a function called 'begin' where the overlay text was implemented, the countdown timer was set, and my clickable event listeners were enabled.

### Significant problems you ran into and how you overcame them

- I ran into an audio issue when running my begin function once the game restarts. The issue was that the audio became very loud and distored. After extensive research into the problem and contemplating removing the audio all together, the issue was fixed by writing certain true/false parameters and using the setTimeout function... I followed a tutorial on how to do this on youtube and it proved to be very helpful. 
- The most difficult part of the game was figuring out how to flip the cards and look for a match -- at the same time, not allowing the user to continue flipping other cards. I knew that only two cards can be shown at any given time, so I knew I had to construct a function with two parameters, card1 and card2. Essentially, if card1 and card2 are the same, keep them face up, if not flip them over. The way I made it so the user couldnt interact with anything else once the two cards have been selected was by creating a function called 'canFlipCard' which only returned true if it passed certain conditions. 
- This game required a lot of functions being called within other functions, and for that reason, the object oriented programming was a life-saver. It allowed me to keep everything in order and organized.

### User Stories

1. As a user, I want to pick matching pairs so that i can clear the deck and win the game.
1. As a user, I want to select a card and have it flip over so that I can see what the card is.
1. As a user, I want to be able to see the flipped over card(s) for a short amount of time so that I can recognize what I clicked on before it flips back over (if the cards do not match) 
1. As a user, I want to match the 8 pairs of pokemon within 60 seconds so that I can win the game.
1. As a user, I want to see my matching pairs face up if I find them so that I know which cards are left.
1. As a user, I want to be able to restart the game once the game is won/lost so that I can play again.
1. As a developer, I want 16 cards laid out in a 4by4 grid so that the user interface is simple and familiar.
1. As a developer, I want to incorporate a countdown timer, moves counter, and trainer level so that the user can have a score.
1. As a developer, I want to include sounds effects and background music so that the game is more engaging and unique.
