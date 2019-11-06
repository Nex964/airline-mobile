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
      src: "assets/1.png",
      name: "Submit details",
      info: "Enter all details, destination, date etc."
    } as InfoItem)
    this.infoList.push({
      src: "assets/2.png",
      name: "Details checking",
      info: "Our executive will check availability of flight"
    } as InfoItem)
    this.infoList.push({
      src: "assets/3.png",
      name: "Confirmation Mail/Call",
      info: "You will received confirmation mail or call."
    } as InfoItem)
    this.infoList.push({
      src: "assets/4.png",
      name: "Make payment",
      info: "Make payment on given link in mail."
    } as InfoItem)
    this.infoList.push({
      src: "assets/5.png",
      name: "Ticket Successfully booked",
      info: "And your ticket will be booked"
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
