import { Game } from "./game";
import { View } from "./view";
import {WORDS} from "./words";

const game = new Game();
const view = new View();

view.on('onGuess', (guess: {value: string}) => {
    if(guess.value.length === 5 && /^[a-z]+$/.test(guess.value) && isLegalWord(guess.value)) {
        game.addGuess(guess.value);
        view.renderGame(game);
    }
    view.setInput("");
})

view.on('onReset', () => {
    game.reset();
    view.resetCellsView();
})

function isLegalWord(guess: string): boolean {
    let legal = false;
    WORDS.forEach(word => {
        if (word === guess) {
            legal = true;
        }
    })
    return legal;
}
