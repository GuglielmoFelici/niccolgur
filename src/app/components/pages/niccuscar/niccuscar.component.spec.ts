import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiccuscarComponent } from './niccuscar.component';

describe('NiccuscarComponent', () => {
  let component: NiccuscarComponent;
  let fixture: ComponentFixture<NiccuscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiccuscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiccuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
