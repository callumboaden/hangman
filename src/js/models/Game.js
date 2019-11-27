// import { words } from '../words';

import axios from 'axios';
import words from 'an-array-of-english-words';

export default class Game { 
    constructor() {
        this.word = this.getRandomWord();
        this.guessedWord = new Array(this.word.length).fill('_');
        this.definition = this.getDefinition();
        this.totalGuesses = 6;
        this.guesses = 0;
        this.score = 0;
    }
    
    reset() {
        this.word = this.getRandomWord();
        this.definition = this.getDefinition();
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

    async getDefinition() {

        // reset definition
        this.definition = '';

        // Api key 
        // Env not working!!!
        let key = process.env.KEY;
    
        const instance = axios.create({
            baseURL: 'https://wordsapiv1.p.mashape.com/words/',
            headers: {'X-Mashape-Key': `c88162d579msh5b81fc27b4ef6d7p1bad35jsn18bb1ed57eb7`}
        });
    
        try {
            
            const res = await instance.get(`${this.word}`);
            
            const definition =  res.data.results[0].definition;

            this.definition = definition;
            
            return definition;
    
        } catch (err) { 
    
            console.log(err);

            this.definition = '';

            return this.definition;
    
        }
    }

}