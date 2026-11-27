import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnnonceDetail } from './annonce-detail';

describe('AnnonceDetail', () => {
  let component: AnnonceDetail;
  let fixture: ComponentFixture<AnnonceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceDetail],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnonceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
