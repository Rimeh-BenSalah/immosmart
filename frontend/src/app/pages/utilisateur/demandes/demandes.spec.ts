import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Demandes } from './demandes';

describe('Demandes', () => {
  let component: Demandes;
  let fixture: ComponentFixture<Demandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Demandes],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Demandes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
