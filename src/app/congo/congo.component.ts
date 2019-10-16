import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congo',
  templateUrl: './congo.component.html',
  styleUrls: ['./congo.component.scss']
})
export class CongoComponent implements OnInit {

  localStorage = null;

  constructor() {
    this.localStorage = localStorage;
  }

  ngOnInit() {
  }

}
