export default {
    init: function () {
        let tempStorage = JSON.parse(localStorage.getItem('games')) || [];
        if (!tempStorage.length) {
            localStorage.clear();
            localStorage.setItem('games', JSON.stringify([
                {
                    id: '3',
                    playerName: 'Zipi Saibert',
                    numPlayers: 5,
                    date: new Date()
                },
                {
                    id: '4',
                    playerName: 'Zipi Weitsman',
                    numPlayers: 3,
                    date: new Date()
                }
            ]));
        }
    }
};