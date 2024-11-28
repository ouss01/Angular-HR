import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinActivityComponent } from './add-fin-activity.component';

describe('AddFinActivityComponent', () => {
  let component: AddFinActivityComponent;
  let fixture: ComponentFixture<AddFinActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFinActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFinActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
