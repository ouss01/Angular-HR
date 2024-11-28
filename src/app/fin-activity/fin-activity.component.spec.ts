import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinActivityComponent } from './fin-activity.component';

describe('FinActivityComponent', () => {
  let component: FinActivityComponent;
  let fixture: ComponentFixture<FinActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
