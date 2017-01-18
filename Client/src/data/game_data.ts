export class marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
    iconUrl?: string;
}

export class Route {
    source: string;
    sourcePoint: Point;
    destination: string;
    destPoint: Point;

    constructor() {
        this.source = 'HaDaf HaYomi 6 Tel Aviv';
        this.destination = 'HaZanchanim 22 Tel Aviv';
        this.destPoint = { lat: 32.1167004, lng: 34.84040849999997 };
        this.sourcePoint = { lat: 32.115633, lng: 34.84027600000002 };
    }
}

export class markerLocation {
    marker: string;
    currentLocation: Point;
}

//props ???
export class GameData {
    carColor: string;
    route: Route;
    level: number;
    numPlayers: number;
    player: string;
    //delete
    sourcePoint?: Point;
    destinationPoint?: Point;

    constructor() {
        this.carColor = 'red';
        this.route = new Route();
        this.level = 2;
        this.numPlayers = 3;
        this.player = '';
        this.destinationPoint = { lat: 32.1167004, lng: 34.84040849999997 }
        this.sourcePoint = { lat: 32.115633, lng: 34.84027600000002 };
    }

    setData(gameData: GameData) {
        this.carColor = gameData.carColor ? gameData.carColor : 'red';
        this.route = gameData.route ? gameData.route : {
            source: 'HaDaf HaYomi 6 Tel Aviv',
            destination: 'HaZanchanim 22 Tel Aviv',
            destPoint: { lat: 32.1167004, lng: 34.84040849999997 },
            sourcePoint: { lat: 32.115633, lng: 34.84027600000002 }
        };
        this.level = gameData.level ? gameData.level : 1;
        this.numPlayers = gameData.numPlayers ? gameData.numPlayers : 3;
        this.player = gameData.player ? gameData.player : 'unknown';
        this.destinationPoint = gameData.destinationPoint ? gameData.destinationPoint : null;
        this.sourcePoint = gameData.sourcePoint ? gameData.sourcePoint : null;
    }
}

export class Point {
    lat: number;
    lng: number;
}

// let ???
export class Locations {
    private points: Point[] = [];
    addPoint(lat: number, lng: number) {
        this.points.push({ lat: lat, lng: lng });
    }
}

export class SavedGame {
    id: string;
    numPlayers: number;
    dateStart: string;
    dateEnd: string;
    playerName: string;
    routePoints: Point[];
    route: Route;
}


export let gameData: GameData =  new GameData();
export let locations: Locations = new Locations();
export let markersLocation: markerLocation[];

