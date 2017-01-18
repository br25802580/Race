//we use local storage to simulate sending and persisting data to a remote server
import {SavedGame} from '../data/game_data';
import moment = require("moment");


function id() {
    return '1';
}

export const GameAPI = {
    getAll: () => {
        return JSON.parse(localStorage.getItem('games')) || [];
    },

    saveGame: (game) => {
        let tempStorage = JSON.parse(localStorage.getItem('games')) || [];
        let gameId = id();
        const newGame: SavedGame = {
            id: gameId,
            playerName: game.playerName,
            numPlayers: game.numPlayers,
            dateEnd: moment().format('DD/MM/YYYY - HH:mm:ss'),
            dateStart: game.dateStart,
            routePoints: game.routePoints,
            route: game.route
        };
        tempStorage.push(newGame);
        console.log('tempStorage', tempStorage);
        localStorage.setItem('games', JSON.stringify(tempStorage));
    }
}
