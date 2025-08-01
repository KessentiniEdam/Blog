import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleComponentComponent } from './new-article-component.component';

describe('NewArticleComponentComponent', () => {
  let component: NewArticleComponentComponent;
  let fixture: ComponentFixture<NewArticleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArticleComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArticleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
