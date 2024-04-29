import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementCreateAppComponent } from './project-management-create-app.component';

describe('ProjectManagementCreateAppComponent', () => {
  let component: ProjectManagementCreateAppComponent;
  let fixture: ComponentFixture<ProjectManagementCreateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementCreateAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementCreateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
