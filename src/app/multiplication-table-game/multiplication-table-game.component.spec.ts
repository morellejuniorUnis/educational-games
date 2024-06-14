import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicationTableGameComponent } from './multiplication-table-game.component';

describe('MultiplicationTableGameComponent', () => {
  let component: MultiplicationTableGameComponent;
  let fixture: ComponentFixture<MultiplicationTableGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplicationTableGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplicationTableGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
