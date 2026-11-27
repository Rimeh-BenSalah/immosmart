import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceurLayout } from './annonceur-layout';

describe('AnnonceurLayout', () => {
  let component: AnnonceurLayout;
  let fixture: ComponentFixture<AnnonceurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnonceurLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnonceurLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
