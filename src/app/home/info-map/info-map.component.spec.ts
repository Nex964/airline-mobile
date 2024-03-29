import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMapComponent } from './info-map.component';

describe('InfoMapComponent', () => {
  let component: InfoMapComponent;
  let fixture: ComponentFixture<InfoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
