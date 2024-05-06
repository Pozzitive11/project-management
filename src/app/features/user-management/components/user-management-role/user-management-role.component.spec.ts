import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementRoleComponent } from './user-management-role.component';

describe('UserManagementRoleComponent', () => {
  let component: UserManagementRoleComponent;
  let fixture: ComponentFixture<UserManagementRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
