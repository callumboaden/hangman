// import { words } from '../words';

import words from 'an-array-of-english-words';

export default class Game { 
    constructor() {
        this.word = this.getRandomWord();
        this.guessedWord = new Array(this.word.length).fill('_');
        this.totalGuesses = 6;
        this.guesses = 0;
        this.score = 0;
    }
    
    reset() {
        this.word = this.getRandomWord();
        this.guessedWord = new Array(this.word.length).fill('_');
        this.guesses = 0;
    }

    isGameOver() {
        if (this.isTooManyGuesses() || this.isCorrect()) {
            if (this.isCorrect()) {
                this.score += 1;
            }
            return true;
        }
    }

    isTooManyGuesses() {
        return this.guesses >= this.totalGuesses;
    }

    isCorrect() {
       return this.word === this.guessedWord.join('');
    }

    getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    isInWord(letter) {
        return this.word.indexOf(letter)
    }

    updateGuesses() {
        return this.guesses += 1;
    }

    updateGuessedWord(letter) {
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                this.guessedWord.splice(i, 1, letter); 
            }
        }
    }

}