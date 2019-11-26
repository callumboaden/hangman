/* HANGMAN GAME */

import Game from './models/Game';
import { elements } from './views/base';
import * as hangmanView from './views/hangmanView';
import * as gameView from './views/gameView';
import './../styles/main.css';

//get the canvas context
let ctx = elements.canvas.getContext('2d');

// global state
const state = {};

/* 
* GAME CONTROLLER
*/
elements.buttons.addEventListener('click', e => {

    if (e.target.matches('.btn')) {

        const btn = e.target;
        const letter = e.target.textContent;

        // remove button from UI
        gameView.removeButton(btn);
   
        if (state.game.isInWord(letter) !== -1) {

            state.game.updateGuessedWord(letter);

            gameView.clearWordDisplay();

            gameView.renderLetters(state.game.guessedWord);
            
        } else {

            let guesses = state.game.updateGuesses();

            // Draw part of the hangman
            hangmanView.drawHangman(guesses)
        }

        if (state.game.isGameOver()) {
            
            gameView.clearWordDisplay();
            gameView.clearButtons();

            gameView.showWord(
                state.game.word,
                state.game.isCorrect()
            );
            
            gameView.gameOver(state.game.score);

        } 
        
        gameView.clearHeader();

        gameView.renderHeader(
            state.game.score,
            state.game.guesses,
            state.game.totalGuesses
        );
    }

    console.log(state.game);

});

elements.buttons.addEventListener('click', e => {
    if (e.target.matches('.btn-replay')) {

        state.game.reset();

        gameView.clearAll();
    
        setup();
    }
});

elements.header.addEventListener('click', e => {
    if (e.target.matches('.btn-new-game')) {

        state.game = new Game();

        setup();
    }
});


function setup() {
    gameView.clearHeader();

    gameView.renderHeader(
        state.game.score,
        state.game.guesses,
        state.game.totalGuesses
    );

    gameView.renderLetters(state.game.guessedWord);

    gameView.renderButtons();

    hangmanView.clearCanvas();

    hangmanView.fix_dpi();

    hangmanView.drawGallows();
}

function init() {

    // Render home screen
    elements.header.innerHTML = `
        <h1>Hangman</h1>
        <button class="btn-new-game">New Game</button>
    `;

    // Remove first child text node so letters insert into correct index
    elements.wordDisplay.childNodes.item(0).remove();
}

init();


