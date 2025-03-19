import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLocationComponent } from './display-location.component';

describe('DisplayLocationComponent', () => {
  let component: DisplayLocationComponent;
  let fixture: ComponentFixture<DisplayLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
