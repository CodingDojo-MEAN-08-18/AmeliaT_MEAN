import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ninja Gold!';
  games = [];
  activities = [];
  //Initial version: page refresh starts a new game
  yourGold: number = 0;
  constructor(private _httpService: HttpService) {}
  ngOnInit(){
    this.getGamesFromService();
// First iteration refresh starts new game.
    this.newGame();
  }
  getGamesFromService(){
    this._httpService.getGames();
    let observable = this._httpService.getGames();
    observable.subscribe(data => { 
      console.log('Got saved games', data)
      this.games = data['games'];
    });
  }
  newGame(){
    this.yourGold = 0;
  }
  clickFarm(yourGold) {
    let newGold = (Math.floor(Math.random() * Math.floor(4)) + 2);
    let nowDate = new Date();   // 'm-d-Y h:i:s')
    this.yourGold += newGold;
    this.activities = this.activities.reverse();
    this.activities.push('Earned ' + newGold + ' golds from the farm! (' + nowDate + ')');
    this.activities = this.activities.reverse();
  }
  clickHouse(yourGold) {
    let newGold = (Math.floor(Math.random() * Math.floor(9)) + 7);
    let nowDate = new Date();   // 'm-d-Y h:i:s')
    this.yourGold += newGold;
    this.activities = this.activities.reverse();
    this.activities.push('Earned ' + newGold + ' golds from the house! (' + nowDate + ')');
    this.activities = this.activities.reverse();
  }
  clickCave(yourGold) {
    let newGold = (Math.floor(Math.random() * Math.floor(5)) + 5);
    let nowDate = new Date();   // 'm-d-Y h:i:s')
    this.yourGold += newGold;
    this.activities = this.activities.reverse();
    this.activities.push('Earned ' + newGold + ' golds from the cave! (' + nowDate + ')');
    this.activities = this.activities.reverse();
  }
  clickCasino(yourGold) {
    let newGold = Math.floor(Math.random() * 100);
    let nowDate = new Date();
    let winLose = (Math.floor(Math.random() * 2) + 1);
    this.activities = this.activities.reverse();
    if (winLose == 1) {
      this.yourGold -= newGold;
      this.activities.push('Lost ' + newGold + ' golds from the casino! Sad trombone. (' + nowDate + ')');
    } else {
      this.yourGold += newGold;
      this.activities.push('Earned ' + newGold + ' golds from the casino! (' + nowDate + ')')
    }  
    this.activities = this.activities.reverse();    
  }
}