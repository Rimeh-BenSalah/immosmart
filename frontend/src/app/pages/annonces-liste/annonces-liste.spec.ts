import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnnoncesListe } from './annonces-liste';

describe('AnnoncesListe', () => {
  let component: AnnoncesListe;
  let fixture: ComponentFixture<AnnoncesListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesListe],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnoncesListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
