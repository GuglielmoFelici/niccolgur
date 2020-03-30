import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueElementComponent } from './queue-element.component';

describe('QueueElementComponent', () => {
  let component: QueueElementComponent;
  let fixture: ComponentFixture<QueueElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
