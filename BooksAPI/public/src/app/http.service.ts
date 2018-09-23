import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) {} 
      //this.getTasks();
  
      newAuthor() {
        let tempObservable = this._http.post('/new', false);
        tempObservable.subscribe(data => console.log("Here's a new author!", data));
      }
    }
