import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordRandomComponent } from './word-random.component';

describe('WordRandomComponent', () => {
  let component: WordRandomComponent;
  let fixture: ComponentFixture<WordRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
