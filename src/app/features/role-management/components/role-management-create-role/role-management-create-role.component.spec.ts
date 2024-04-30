import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementCreateRoleComponent } from './role-management-create-role.component';

describe('RoleManagementCreateRoleComponent', () => {
  let component: RoleManagementCreateRoleComponent;
  let fixture: ComponentFixture<RoleManagementCreateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementCreateRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementCreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
