import { Component, OnInit, Input } from '@angular/core';
import { FlightModel, Param, UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-flight-item',
  templateUrl: './flight-item.component.html',
  styleUrls: ['./flight-item.component.scss']
})
export class FlightItemComponent implements OnInit {

  @Input('item') item: FlightModel;

  startDate: Date = new Date()
  endDate: Date = new Date()

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    console.log(this.item);

    this.startDate.setDate(parseInt(this.item.startDate.split('-')[1]));
    this.startDate.setMonth(parseInt(this.item.startDate.split('-')[0]) - 1);
    this.startDate.setFullYear(parseInt(this.item.startDate.split('-')[2]));

    this.endDate.setDate(parseInt(this.item.endDate.split('-')[1]));
    this.endDate.setMonth(parseInt(this.item.endDate.split('-')[0]) - 1);
    this.endDate.setFullYear(parseInt(this.item.endDate.split('-')[2]));
  }


  showTravellersSelect(){

    let list = [] as Param[];

    for(let i = 1; i <= Math.min(parseInt(this.item.seats), 6); i++){
      list.push({ name: i.toString(), value: i.toString()})
    }

    this.utils.setListData(list, this.item._id);

    this.utils.selectedFlight = this.item;

    document.getElementById('list_dialog').classList.add('show');
  }

}
