import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecompensaEditComponent } from './recompensa-edit.component';

describe('RecompensaEditComponent', () => {
  let component: RecompensaEditComponent;
  let fixture: ComponentFixture<RecompensaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecompensaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecompensaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
