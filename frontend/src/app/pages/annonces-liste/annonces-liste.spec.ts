import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesListe } from './annonces-liste';

describe('AnnoncesListe', () => {
  let component: AnnoncesListe;
  let fixture: ComponentFixture<AnnoncesListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesListe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
