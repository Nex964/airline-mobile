import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-map',
  templateUrl: './info-map.component.html',
  styleUrls: ['./info-map.component.scss']
})
export class InfoMapComponent implements OnInit {

  infoList: InfoItem[] = []

  constructor() { 
    this.infoList.push({
      src: "https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png",
      name: "Nice",
      info: "Nice, very nice, Expensive, Explosion"
    } as InfoItem)
    this.infoList.push({
      src: "https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png",
      name: "Nice",
      info: "Very Nice"
    } as InfoItem)
    this.infoList.push({
      src: "https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png",
      name: "Nice",
      info: "Very Nice"
    } as InfoItem)
    this.infoList.push({
      src: "https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png",
      name: "Nice",
      info: "Very Nice"
    } as InfoItem)
  }

  ngOnInit() {
  }

}

interface InfoItem{
  src: String,
  name: String,
  info: String
}
