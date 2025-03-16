import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEpisodeComponent } from './info-episode.component';

describe('InfoEpisodeComponent', () => {
  let component: InfoEpisodeComponent;
  let fixture: ComponentFixture<InfoEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEpisodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
