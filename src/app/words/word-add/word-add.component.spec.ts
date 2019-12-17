import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordAddComponent } from './word-add.component';

describe('WordAddComponent', () => {
  let component: WordAddComponent;
  let fixture: ComponentFixture<WordAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
