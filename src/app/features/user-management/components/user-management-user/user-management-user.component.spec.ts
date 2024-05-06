import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementUserComponent } from './user-management-user.component';

describe('UserManagementUserComponent', () => {
  let component: UserManagementUserComponent;
  let fixture: ComponentFixture<UserManagementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagementUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserManagementUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
