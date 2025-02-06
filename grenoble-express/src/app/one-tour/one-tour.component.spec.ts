import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTourComponent } from './one-tour.component';

describe('OneTourComponent', () => {
  let component: OneTourComponent;
  let fixture: ComponentFixture<OneTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
