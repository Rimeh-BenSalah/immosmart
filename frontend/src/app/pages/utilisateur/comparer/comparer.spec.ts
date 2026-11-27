import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Comparer } from './comparer';

describe('Comparer', () => {
  let component: Comparer;
  let fixture: ComponentFixture<Comparer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comparer],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Comparer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
