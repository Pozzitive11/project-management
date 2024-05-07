import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementPermissionsListComponent } from './user-management-permissions-list.component';

describe('UserManagementPermissionsListComponent', () => {
  let component: UserManagementPermissionsListComponent;
  let fixture: ComponentFixture<UserManagementPermissionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementPermissionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementPermissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
