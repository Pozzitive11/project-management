import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementCreateProjectComponent } from './project-management-create-project.component';

describe('ProjectManagementCreateProjectComponent', () => {
  let component: ProjectManagementCreateProjectComponent;
  let fixture: ComponentFixture<ProjectManagementCreateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementCreateProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
