import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MTicketComponent } from './m-ticket.component';

describe('MTicketComponent', () => {
  let component: MTicketComponent;
  let fixture: ComponentFixture<MTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
