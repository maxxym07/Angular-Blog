import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Homework16Component } from './homework16.component';

describe('Homework16Component', () => {
  let component: Homework16Component;
  let fixture: ComponentFixture<Homework16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Homework16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Homework16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
