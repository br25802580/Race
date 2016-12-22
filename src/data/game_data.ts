
export class Route{
    source: string;
    destination: string;
}

//props ???
export class GameData {
    carColor: string;
    route: Route;
    level: string;
    numPlayers: number;
    player: string;
    constructor(carColor: string,route: Route,level: string,numPlayers: number,player: string){
        this.carColor = carColor;   
        this.route = route;
        this.level = level;
        this.numPlayers = numPlayers;
        this.player = player;
    }
    constructor(){
        this.carColor = '';   
        this.route = new Route();
        this.level = '';
        this.numPlayers = 1;
        this.player = '';
    }
    
    setData(gameData: GameData){
        this.carColor = gameData.carColor? gameData.carColor : 'red' ;   
        this.route = gameData.route? gameData.route: {source:'HaDaf HaYomi 6 Tel Aviv', destination: 'HaZanchanim 22 Tel Aviv'};
        this.level = gameData.level? gameData.level : 'low' ;
        this.numPlayers = gameData.numPlayers? gameData.numPlayers : 1 ;
        this.player = gameData.player? gameData.player : 'unknown';
    }
}

export class Point {
    lat: number;
    lng: number;
}

// let ???
export let gameData: GameData = new GameData('red',{source:'HaDaf HaYomi 6 Tel Aviv', destination: 'HaZanchanim 22 Tel Aviv'},'',0, 'Zipi') {


