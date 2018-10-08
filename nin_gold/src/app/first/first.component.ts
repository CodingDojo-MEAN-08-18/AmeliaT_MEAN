import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { COMPILER_OPTIONS } from '@angular/core/src/linker/compiler';
import { concat } from 'rxjs/internal/observable/concat';

@Component({
  selector: 'app-one',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  Explore(type){
    if(type == "house"){
      this._httpService.addgold(7,16,"house")
    }
    else if(type == "cave"){
      this._httpService.addgold(5,11,"cave")
    }
    else if(type == "farm"){
      this._httpService.addgold(2,6,"farm")
    }
    else if(type == "casino"){
      this._httpService.addgold(0,101,"casino")
    }
    else{
      console.log("it was else")
    }
  }
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

}