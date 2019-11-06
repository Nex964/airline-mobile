import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss']
})
export class TncComponent implements OnInit {

  text = '';

  constructor(private utils: UtilsService) {
    this.utils.getPolicies(data => {
      this.text = data;
    });
  }

  ngOnInit() {}

  agree() {
    this.utils.state.next(5);
  }

  degree() { 
    this.utils.state.next(3);
  }
}
