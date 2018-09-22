import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
   }
   getPokemon(){
    const bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/'); 
    bulbasaur.subscribe(<Object>(data) =>{
        console.log("Bulbasaur has the ability " + data.abilities[1].ability.name+ "and "+ data.abilities[0].ability.name);
        console.log("Got a Bulbasaur", data); 
    });
   }
}