import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Favoris } from './favoris';

describe('Favoris', () => {
  let component: Favoris;
  let fixture: ComponentFixture<Favoris>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favoris],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Favoris);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
