import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdcsampleoneComponent } from './tdcsampleone.component';

describe('TdcsampleoneComponent', () => {
  let component: TdcsampleoneComponent;
  let fixture: ComponentFixture<TdcsampleoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdcsampleoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdcsampleoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
