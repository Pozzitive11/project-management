import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementAppComponent } from './project-management-app.component';

describe('ProjectManagementAppComponent', () => {
  let component: ProjectManagementAppComponent;
  let fixture: ComponentFixture<ProjectManagementAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
