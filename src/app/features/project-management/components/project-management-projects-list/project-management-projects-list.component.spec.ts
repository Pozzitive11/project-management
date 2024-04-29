import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementListComponent } from './project-management-list.component';

describe('ProjectManagementListComponent', () => {
  let component: ProjectManagementListComponent;
  let fixture: ComponentFixture<ProjectManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
