import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comparer } from './comparer';

describe('Comparer', () => {
  let component: Comparer;
  let fixture: ComponentFixture<Comparer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comparer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comparer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
