import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementModalComponent } from './project-management-modal.component';

describe('ProjectManagementModalComponent', () => {
  let component: ProjectManagementModalComponent;
  let fixture: ComponentFixture<ProjectManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManagementModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
