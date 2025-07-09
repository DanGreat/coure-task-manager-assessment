import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrityBadgeComponent } from './prority-badge.component';

describe('ProrityBadgeComponent', () => {
  let component: ProrityBadgeComponent;
  let fixture: ComponentFixture<ProrityBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProrityBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProrityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
