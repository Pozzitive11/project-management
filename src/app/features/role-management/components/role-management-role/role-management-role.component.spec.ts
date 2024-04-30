import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementRoleComponent } from './role-management-role.component';

describe('RoleManagementRoleComponent', () => {
  let component: RoleManagementRoleComponent;
  let fixture: ComponentFixture<RoleManagementRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
