import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUsersComponent } from './admin-users.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getAllUsers', 'deleteUser']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['isAdmin']);

    await TestBed.configureTestingModule({
      imports: [AdminUsersComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockDataService.getAllUsers.and.returnValue(of([]));
    expect(component).toBeTruthy();
  });
});
