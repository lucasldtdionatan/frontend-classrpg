import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColherRecompensaComponent } from './colher-recompensa.component';

describe('ColherRecompensaComponent', () => {
  let component: ColherRecompensaComponent;
  let fixture: ComponentFixture<ColherRecompensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColherRecompensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColherRecompensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
