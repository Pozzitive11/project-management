import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementRolesListComponent } from './role-management-roles-list.component';

describe('RoleManagementRolesListComponent', () => {
  let component: RoleManagementRolesListComponent;
  let fixture: ComponentFixture<RoleManagementRolesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleManagementRolesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
