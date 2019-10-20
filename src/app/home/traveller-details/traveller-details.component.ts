import { Component, OnInit } from '@angular/core';
import { FlightModel, UtilsService, Passenger, Contact, AddTravellerRequest, AddRequestModel } from 'src/app/utils.service';

@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.scss']
})
export class TravellerDetailsComponent implements OnInit {

  list: Passenger[] = [];

  contact: Passenger = {gender: "", name: "+91", age: ""} as Passenger;

  item: FlightModel;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private utils: UtilsService) {
    this.item = this.utils.selectedFlight;

    let travellers = this.utils.travellers;

    for (let i = 0; i < travellers; i++) {
      this.list[i] = { gender: 'Mrs.', name: '', age: '' } as Passenger;
    }

    this.startDate.setDate(parseInt(this.item.startDate.split('-')[1]));
    this.startDate.setMonth(parseInt(this.item.startDate.split('-')[0]) - 1);
    this.startDate.setFullYear(parseInt(this.item.startDate.split('-')[2]));

    this.endDate.setDate(parseInt(this.item.endDate.split('-')[1]));
    this.endDate.setMonth(parseInt(this.item.endDate.split('-')[0]) - 1);
    this.endDate.setFullYear(parseInt(this.item.endDate.split('-')[2]));
  }

  ngOnInit() { }

  submit() {

    this.list.forEach(e => {
      if (e.gender.length < 1) {
        alert("Select a gender of " + (this.list.indexOf(e) + 1) + " Traveller")
        return
      }
      if (e.name.length < 1) {
        alert("Enter a name of " + (this.list.indexOf(e) + 1) + " Traveller")
        return
      }
      if (e.age.length < 1) {
        alert("Enter a last name of " + (this.list.indexOf(e) + 1) + " Traveller")
        return
      }
    })

    if (this.contact.gender.length < 1) {
      alert("Enter a Email Id")
      return
    }

    if (this.contact.name.length < 1) {
      alert('Enter a country code')
      return
    }

    if (this.contact.age.length < 1) {
      alert('Enter a number')
      return
    }

    let request = {} as AddTravellerRequest;
    request.name = 'name';
    request.flight = this.utils.selectedFlight._id;
    request.passengers = this.list;
    let contact = {} as Contact;
    contact.email = this.contact.gender;
    contact.mobile = this.contact.name + this.contact.age;
    request.contact = contact;
    console.log(request);

    this.utils.addTraveller(request, data => {
      console.log(data._id);

      let reqReq = {} as AddRequestModel;

      reqReq.name = new Date().getTime() + "";
      reqReq.flight = this.utils.selectedFlight._id;
      reqReq.traveller = data._id;

      this.utils.createRequest(reqReq, data => {
        console.log('Code', data);
        localStorage.setItem('code', data.requestId);
        this.utils.state.next(6);
      })
    })
  }
}

interface Traveller {
  type: String,
  first_name: String,
  last_name: String,
}