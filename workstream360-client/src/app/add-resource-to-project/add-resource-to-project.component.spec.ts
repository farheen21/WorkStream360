import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourceToProjectComponent } from './add-resource-to-project.component';

describe('AddResourceToProjectComponent', () => {
  let component: AddResourceToProjectComponent;
  let fixture: ComponentFixture<AddResourceToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResourceToProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResourceToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
