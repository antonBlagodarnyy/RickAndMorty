import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEpisodeComponent } from './display-episode.component';

describe('DisplayEpisodeComponent', () => {
  let component: DisplayEpisodeComponent;
  let fixture: ComponentFixture<DisplayEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEpisodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
