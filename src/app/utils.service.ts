import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  showFlight = new Subject<boolean>();
  getAddedFlight = new Subject<AirportModel>();
  listData = new Subject<Param[]>();
  listDataType = 'dest'

  flightDataSubject = new Subject<FlightModel[]>();

  flightData: FlightModel[] = [];

  selectedFlight: FlightModel;

  state = new Subject<number>()

  selectedDest: Param = null;

  travellers = 0;

  selectedDate = new Date();

  lastUsedAirport = '';
  lastTraveller = '';

  private baseUrl = 'https://mobile.mytrippartner.com/apis/v1';

  constructor(private http: HttpClient) {
    this.getFlight("", data => {
      this.flightData = data;
    })
  }

  getListData() {
    return this.listData;
  }

  setListData(data: Param[], type: string) {
    this.listDataType = type;
    this.listData.next(data);

    try{
      document.getElementById(this.lastTraveller).textContent = "Select Travellers";
    }catch(e){}

    if(type != 'from'){
      this.lastTraveller = type;
    }
  }

  getState() {
    return this.state;
  }

  setState(val: number) {
    this.state.next(val);
  }

  getShowFlight(): Subject<boolean> {
    return this.showFlight;
  }

  setShowFlight(val: boolean) {
    this.showFlight.next(val);
  }

  post(req: any, url: string, callback: any) {
    //TODO: Show Loading
    this.http.post<CommonResp>(this.baseUrl + url, req, {}).subscribe(data => {
      //TODO: Hide Loading
      if (data.success == 1) { callback(data.data); }
      else { alert("Error: " + data.message); }
    })
  }
  get(values: Param[], url: string, callback: any) {
    let params = new HttpParams();
    values.forEach(e => {
      params = params.append(e.name, e.value);
    });
    // TODO: Show Loading
    this.http.get<CommonResp>(this.baseUrl + url, { 'params': params }).subscribe(data => {
      // TODO: Hide Loading
      if (data.success == 1) { callback(data.data); }
      // else { alert("Error: " + data.message); }
    })
  }

  addAirport(req: AddAirpotRequest) {
    this.post(req, '/airport', data => this.getAddedFlight.next(data as AirportModel));
  }

  addFlight(req: AddFlightRequest, callback) {
    this.post(req, '/flight', data => callback(data));
  }

  getAirportSearch(text: string, callback) {
    this.get([{ name: 'search', value: text } as Param], '/airport/search', data => callback(data));
  }
  getAirport(callback) {
    this.get([], '/airport', data => callback(data));
  }

  getFlight(text: string, callback) {
    this.get([{ name: 'search', value: text } as Param], '/flight/search', data => callback(data));
  }

  getInitFlights(callback) {
    this.get([], '/flight/init', data => callback(data));
  }

  getFlightBetween(from: string, to: string, callback) {
    const params = [];
    params.push({ name: 'from', value: from } as Param);
    params.push({ name: 'to', value: to } as Param);

    console.log(params);

    this.get(params, '/flight/between', data => callback(data));
  }

  addTraveller(req: AddTravellerRequest, callback) {
    this.post(req, '/traveller', data => callback(data));
  }

  createRequest(req: AddRequestModel, callback) {
    this.post(req, '/request', data => callback(data));
  }

  getRequestById(id: string, callback) {
    this.get([], `/request/${id}`, data => callback(data));
  }

  getPolicies(callback) {
    this.get([], '/text', data => callback(data[data.length - 1].text));
  }
}

export interface Param {
  name: string,
  value: any
}

interface CommonResp {
  success: number,
  data: any,
  error: {},
  message: String
}

export interface AddAirpotRequest {
  name: string;
  code: string;
  city: string;
  country: string;
}
export interface AddFlightRequest {
  amenities: string[];
  name: string;
  code: string;
  number: string;
  checkin: string;
  baggage: string;
  between: string;
  startDate: string;
  endDate: string;
  totalTime: string;
  meal: boolean;
  stops: string;
  rate: string;
  source: string;
  dest: string;
  takeOff: string;
  landing: string;
}

export interface AirportModel {
  country: string;
  status: number;
  _id: string;
  name: string;
  code: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface FlightModel {
  amenities: any[];
  meal: boolean;
  status: number;
  _id: string;
  name: string;
  number: string;
  checkin: string;
  baggage: string;
  startDate: string;
  endDate: string;
  totalTime: string;
  stops: number;
  rate: string;
  source: AirportModel;
  seats: string;
  dest: AirportModel;
  takeOff: string;
  landing: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Contact {
  mobile: string;
  email: string;
}

export interface Data {
  requests: any[];
  status: number;
  _id: string;
  name: string;
  contact: Contact;
  passengers: Passenger[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Contact {
  mobile: string;
  email: string;
}

export interface Passenger {
  name: string;
  age: string;
  gender: string;
}

export interface AddTravellerRequest {
  _id: string,
  name: string;
  flight: string;
  contact: Contact;
  passengers: Passenger[];
}

export interface AddRequestModel {
  name: string;
  traveller: string;
  flight: string;
}

export interface FlightSelectorModel {
  display: string;
  src: string;
  dest: string;
}

export interface Traveller {
  contact: Contact;
  requests: any[];
  seats: number;
  amount: number;
  status: number;
  _id: string;
  name: string;
  flight: FlightModel;
  passengers: Passenger[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RequestModel {
  pnr: string;
  status: number;
  _id: string;
  name: string;
  traveller: Traveller;
  createdAt: Date;
  updatedAt: Date;
  requestId: number;
  __v: number;
}

