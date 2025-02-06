import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTourComponent } from './view-tour.component';

describe('ViewTourComponent', () => {
  let component: ViewTourComponent;
  let fixture: ComponentFixture<ViewTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
