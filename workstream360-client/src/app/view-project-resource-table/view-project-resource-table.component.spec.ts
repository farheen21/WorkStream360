import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectResourceTableComponent } from './view-project-resource-table.component';

describe('ViewProjectResourceTableComponent', () => {
  let component: ViewProjectResourceTableComponent;
  let fixture: ComponentFixture<ViewProjectResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectResourceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProjectResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
