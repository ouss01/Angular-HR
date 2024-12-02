import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHandicapComponent } from './add-handicap.component';



describe('AddHandicapComponent', () => {
  let component: AddHandicapComponent;
  let fixture: ComponentFixture<AddHandicapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHandicapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
