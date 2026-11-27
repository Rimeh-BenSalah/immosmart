import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnnonceurLayout } from './annonceur-layout';

describe('AnnonceurLayout', () => {
  let component: AnnonceurLayout;
  let fixture: ComponentFixture<AnnonceurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceurLayout],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnonceurLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
