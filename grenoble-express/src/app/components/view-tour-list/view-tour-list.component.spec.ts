import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTourListComponent } from './view-tour-list.component';

describe('ViewTourListComponent', () => {
  let component: ViewTourListComponent;
  let fixture: ComponentFixture<ViewTourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTourListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
