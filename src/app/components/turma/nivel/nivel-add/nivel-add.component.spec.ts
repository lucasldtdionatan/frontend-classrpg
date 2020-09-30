import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelAddComponent } from './nivel-add.component';

describe('NivelAddComponent', () => {
  let component: NivelAddComponent;
  let fixture: ComponentFixture<NivelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
