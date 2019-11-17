import {Component, OnInit, ViewChild,} from '@angular/core';
import {
  AddRequestModel,
  AddTravellerRequest,
  Contact,
  FlightModel,
  Passenger,
  UtilsService
} from 'src/app/utils.service';
import {MatAutocompleteTrigger} from '@angular/material';

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
  testVar: any;

  price = "0"

  @ViewChild('meal', {static: false}) auto;
  @ViewChild(MatAutocompleteTrigger, {static: false, read: MatAutocompleteTrigger}) meal: MatAutocompleteTrigger;
  private ac: any;


  constructor(private utils: UtilsService) {
    this.item = this.utils.selectedFlight;

    let travellers = this.utils.travellers;

    for (let i = 0; i < travellers; i++) {
      this.list[i] = {gender: '', name: '', age: ''} as Passenger;
    }


    this.startDate.setDate(parseInt(this.item.startDate.split('-')[2].split('T')[0]));
    this.startDate.setMonth(parseInt(this.item.startDate.split('-')[1]) - 1);
    this.startDate.setFullYear(parseInt(this.item.startDate.split('-')[0]));

    this.endDate.setDate(parseInt(this.item.endDate.split('-')[2].split('T')[0]));
    this.endDate.setMonth(parseInt(this.item.endDate.split('-')[1]) - 1);
    this.endDate.setFullYear(parseInt(this.item.endDate.split('-')[0]));

    // this.startDate.setDate(parseInt(this.item.startDate.split('-')[1]));
    // this.startDate.setMonth(parseInt(this.item.startDate.split('-')[0]) - 1);
    // this.startDate.setFullYear(parseInt(this.item.startDate.split('-')[2]));

    // this.endDate.setDate(parseInt(this.item.endDate.split('-')[1]));
    // this.endDate.setMonth(parseInt(this.item.endDate.split('-')[0]) - 1);
    // this.endDate.setFullYear(parseInt(this.item.endDate.split('-')[2]));
  }

  ngOnInit() {
    this.price = this.utils.travellers * parseInt(this.utils.selectedFlight.rate) + " (" + this.utils.selectedFlight.rate + " x " + this.utils.travellers + " passenger)";
    console.log(this.testVar);
    this.list.push()
  }

  open(e) {
    console.log(e);
    this.ac =  document.getElementById('ashishChutiya');
    // this.ac.focus();
    this.meal.openPanel();
  }
  testFun(e) {
    console.log(this.list);
    console.log(this.testVar);
  }

  // open(meal) {
  //   console.log('clicked');
  //   meal.openPanel();
  // }

  submit() {

    this.list.forEach(e => {
      e.name=e.fName+' '+e.lName;
      if (e.gender.length <= 2) {
        alert("Select a gender of Traveller"+  + (this.list.indexOf(e) + 1) )
        return
      }
      if (e.fName.length <= 1) {
        alert("Enter a first name of "  + " Traveller"+ (this.list.indexOf(e) + 1))
        return
      }
      if (e.lName.length <= 1) {
        alert("Enter a last name of "  + " Traveller"+ (this.list.indexOf(e) + 1))
        return
      }
      // if (e.age.length < 1) {
      //   alert("Enter a last name of " + " Traveller" + (this.list.indexOf(e) + 1))
      //   return
      // }
    })

    if (this.contact.gender.length < 1) {
      alert("Enter Email Address")
      return
    }

    if (this.contact.name.length < 1) {
      alert('Enter a country code')
      return
    }

    if (this.contact.age.length < 10) {
      alert('Enter mobile number')
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
