import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-two',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  quotes: string[] = this._httpService.quotes
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
  }

}