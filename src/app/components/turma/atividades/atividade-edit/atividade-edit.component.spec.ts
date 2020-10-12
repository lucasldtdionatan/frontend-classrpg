import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeEditComponent } from './atividade-edit.component';

describe('AtividadeEditComponent', () => {
  let component: AtividadeEditComponent;
  let fixture: ComponentFixture<AtividadeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
