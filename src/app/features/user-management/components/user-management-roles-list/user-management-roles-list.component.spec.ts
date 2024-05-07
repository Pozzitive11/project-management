import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementRolesListComponent } from './user-management-roles-list.component';

describe('UserManagementRolesListComponent', () => {
  let component: UserManagementRolesListComponent;
  let fixture: ComponentFixture<UserManagementRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementRolesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
