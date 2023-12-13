import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixturesPage } from './fixtures.page';

describe('FixturesPage', () => {
  let component: FixturesPage;
  let fixture: ComponentFixture<FixturesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FixturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
