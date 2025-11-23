import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SojaPlayerComponent } from './soja-player.component';

describe('SojaPlayerComponent', () => {
  let component: SojaPlayerComponent;
  let fixture: ComponentFixture<SojaPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SojaPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SojaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
