import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaAddComponent } from './recompensa-add.component';

describe('RecompensaAddComponent', () => {
  let component: RecompensaAddComponent;
  let fixture: ComponentFixture<RecompensaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecompensaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecompensaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
