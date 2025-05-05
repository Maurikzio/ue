import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyListComponent } from './crazy-list.component';

describe('CrazyListComponent', () => {
  let component: CrazyListComponent;
  let fixture: ComponentFixture<CrazyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrazyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrazyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
