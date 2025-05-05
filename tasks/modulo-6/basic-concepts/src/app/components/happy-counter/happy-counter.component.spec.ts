import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyCounterComponent } from './happy-counter.component';

describe('HappyCounterComponent', () => {
  let component: HappyCounterComponent;
  let fixture: ComponentFixture<HappyCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HappyCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappyCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
