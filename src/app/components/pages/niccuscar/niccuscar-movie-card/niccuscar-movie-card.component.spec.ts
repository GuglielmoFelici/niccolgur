import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiccuscarMovieCardComponent } from './niccuscar-movie-card.component';

describe('NiccuscarMovieCardComponent', () => {
  let component: NiccuscarMovieCardComponent;
  let fixture: ComponentFixture<NiccuscarMovieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiccuscarMovieCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiccuscarMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
