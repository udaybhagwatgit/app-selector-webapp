import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamictdcformComponent } from './dynamictdcform.component';

describe('DynamictdcformComponent', () => {
  let component: DynamictdcformComponent;
  let fixture: ComponentFixture<DynamictdcformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamictdcformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamictdcformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
