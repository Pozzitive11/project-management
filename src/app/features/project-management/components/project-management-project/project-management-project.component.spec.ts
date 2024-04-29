import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementProjectComponent } from './project-management-project.component';

describe('ProjectManagementProjectComponent', () => {
  let component: ProjectManagementProjectComponent;
  let fixture: ComponentFixture<ProjectManagementProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
