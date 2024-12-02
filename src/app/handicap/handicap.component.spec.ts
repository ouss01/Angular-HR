import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapComponent } from './handicap.component';

describe('HandicapComponent', () => {
  let component: HandicapComponent;
  let fixture: ComponentFixture<HandicapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandicapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
