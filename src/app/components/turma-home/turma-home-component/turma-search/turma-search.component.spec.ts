import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaSearchComponent } from './turma-search.component';

describe('TurmaSearchComponent', () => {
  let component: TurmaSearchComponent;
  let fixture: ComponentFixture<TurmaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
