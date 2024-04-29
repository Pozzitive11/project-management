import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementCreateAppsListComponent } from './project-management-create-apps-list.component';

describe('ProjectManagementCreateAppsListComponent', () => {
  let component: ProjectManagementCreateAppsListComponent;
  let fixture: ComponentFixture<ProjectManagementCreateAppsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementCreateAppsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementCreateAppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
