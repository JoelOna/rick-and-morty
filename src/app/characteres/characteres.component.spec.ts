import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteresComponent } from './characteres.component';

describe('CharacteresComponent', () => {
  let component: CharacteresComponent;
  let fixture: ComponentFixture<CharacteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
