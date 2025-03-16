import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCharacterComponent } from './info-character.component';

describe('InfoCharacterComponent', () => {
  let component: InfoCharacterComponent;
  let fixture: ComponentFixture<InfoCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
