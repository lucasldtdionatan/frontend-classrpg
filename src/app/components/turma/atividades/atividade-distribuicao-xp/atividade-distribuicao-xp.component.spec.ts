import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeDistribuicaoXPComponent } from './atividade-distribuicao-xp.component';

describe('AtividadeDistribuicaoXPComponent', () => {
  let component: AtividadeDistribuicaoXPComponent;
  let fixture: ComponentFixture<AtividadeDistribuicaoXPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeDistribuicaoXPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeDistribuicaoXPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
