import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: Partial<AuthService>;
  let mockCustomerService: Partial<CustomerService>;

  beforeEach(async () => {
    mockAuthService = {
      isAdmin: false,
      isLoggedIn: false,
      userName: 'Test User',
      logout: jasmine.createSpy('logout')
    };

    mockCustomerService = {
      getCategories: jasmine.createSpy('getCategories').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        FormsModule,
        MatIconModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: CustomerService, useValue: mockCustomerService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined element in the template', () => {
    const headerElement = fixture.nativeElement.querySelector('header');
    expect(headerElement).toBeTruthy();
  });

  it('should initialize searchTerm as undefined', () => {
    expect(component.searchTerm).toBeUndefined();
  });

  it('should have an empty categoryList initially', () => {
    expect(component.categoryList).toEqual([]);
  });

  it('should call authService.logout when logout is called', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should clear searchTerm when searchCategory is called', () => {
    component.searchTerm = 'test';
    component.searchCategory('123');
    expect(component.searchTerm).toBe('');
  });

  it('should call getCategories on ngOnInit', () => {
    component.ngOnInit();
    expect(mockCustomerService.getCategories).toHaveBeenCalled();
  });
});
