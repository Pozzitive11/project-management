import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementUsersListComponent } from './user-management-users-list.component';

describe('UserManagementUsersListComponent', () => {
  let component: UserManagementUsersListComponent;
  let fixture: ComponentFixture<UserManagementUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementUsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
