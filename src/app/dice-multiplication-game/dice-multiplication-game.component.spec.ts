import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceMultiplicationGameComponent } from './dice-multiplication-game.component';

describe('DiceMultiplicationGameComponent', () => {
  let component: DiceMultiplicationGameComponent;
  let fixture: ComponentFixture<DiceMultiplicationGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceMultiplicationGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceMultiplicationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
