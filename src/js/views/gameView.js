import { elements, letters } from './base';

export const renderButtons = () => {
    let buttons = letters.map(l => 
        `<button class="btn">${l}</button>`
    ).join('');

    elements.buttons.insertAdjacentHTML('beforeend', buttons);
}

export const renderLetters = (word) => {

    let markup = word.map(l => `<span>${l ? l : '_'}</span>`).join('');

    elements.wordDisplay.insertAdjacentHTML('beforeend', markup);
}

// If user has too many guesses, show word
export const showWord = (word, isCorrect) => {

    console.log(word)

    let markup = word.split('').map(l => `<span class="${isCorrect ? 'green' : 'red'}">${l}</span>`).join('');
    // prepare UI for changes
    elements.wordDisplay.innerHTML = '';
    
    // render changes on UI
    elements.wordDisplay.insertAdjacentHTML('beforeend', markup);
}

// If user guesses a correct letter replace blank space(s) with letter
export const updateLetters = (letter) => {
    // check if letter is in array
    for (let i = 0; i < state.word.length; i++) {
        if (state.word[i] === letter) {

            let l = elements.wordDisplay.childNodes.item(i);
            state.guessedWord.splice(i, 1, letter); 

            l.innerHTML = letter;
        }
    }
}

export const updateGuesses = (guesses, totalGuesses) => {
    let markup = `<p>${guesses} guesses, out of ${totalGuesses}</p>`;

    elements.gameStatus.innerHTML = '';
    elements.gameStatus.insertAdjacentHTML('beforeend', markup);
}

export const renderHeader = (score, guesses, totalGuesses) => {
    let markup = `
        <div class="title">
            <h3>Hangman</h3>
        </div>
        <div class="status">
            <p class="score"><span>Score:</span> ${score}</p>
            <p class="guesses"><span>Guesses:</span> ${guesses} of ${totalGuesses}</p>
        </div>
    `;

    elements.header.classList.remove('home--screen');
    elements.header.classList.add('game--status');
    elements.header.insertAdjacentHTML('beforeend', markup);
}

export const gameOver = (score, definition) => {
    elements.gameStatus.innerHTML = `
        <p class="score">Score: ${score}</p>
        <p class="definition"><em>${definition}</em></p>
    `;

    elements.buttons.innerHTML = `
        <button class="btn-replay">Replay</button>
    `;
}

export const clearHeader = () => elements.header.innerHTML = '';

export const clearWordDisplay = () => elements.wordDisplay.innerHTML = '';

export const clearGameStatus = () => elements.gameStatus.innerHTML = '';

export const clearButtons = () => elements.buttons.innerHTML = '';

export const removeButton = (btn) => btn.parentNode.removeChild(btn);

export const clearAll = () => {
    clearButtons();
    clearHeader();
    clearWordDisplay();
    clearGameStatus();
}
