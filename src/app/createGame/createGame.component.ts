import {Component, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
//import {select} from "ng2-redux";
//import {Observable} from "rxjs";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {GameData, gameData} from '../../data/game_data';
//import {getGameData, setGameData, GameData} from '../../data/game_data';
//import {Router} from 'angular2/router';


@Component({
    selector: 'createGame',
    styleUrls: ['create-game.scss'],
    templateUrl: 'createGame.html',
    encapsulation: ViewEncapsulation.None
})

export class CreateGameComponent implements OnInit {
    @Output()  startGame:EventEmitter<Object>=new EventEmitter<Object>();
    gameData: GameData = gameData;
    tempData: GameData = new GameData();
    selectedColor:string;
    selectedLevel:string;
    selectedNumPlayers:string;
    public oneAtATime:boolean = true;
    public status:Object = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
    constructor() {  
         this.tempData.route = {source: 'הדף היומי 6 תל אביב',
             destination: 'הצנחנים 22 תל אביב'};
    }

    ngOnInit() {
    }
    
    start(){
      this.startGame.emit({sourceStr: this.tempData.route.source,destinationStr: this.tempData.route.destination});
    }
    setSelectedColor(selectedColor:string){
      this.tempData.carColor = selectedColor;
      document.getElementById("labelColor").style.backgroundColor = selectedColor;
    }

    setSelectedLevel(selectedLevel:string){
      this.tempData.level = selectedLevel;
    }

    setSelectednNumPlayers(selectedNumPlayers:number){
      this.tempData.numPlayers = selectedNumPlayers;
    }

    saveGameData(){
      console.log('save game data', this.tempData);
      this.gameData.setData(this.tempData);
      //add players with route according num and level
      /*
      index:number;
      for(index = 0;index<this.tempData.numPlayers;index++)
      {
        create new player with name , route
        0-create name
        1-create route 
        2-create new player(name,route)
        arrPlayers.add('player' + index , route)
      }
       */
    }
    
}



 

