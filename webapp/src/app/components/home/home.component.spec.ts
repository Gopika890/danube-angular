import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty featuredProducts array initially', () => {
    expect(component.featuredProducts).toEqual([]);
  });

  it('should have an empty newProducts array initially', () => {
    expect(component.newProducts).toEqual([]);
  });

  it('should have an empty bannerImages array initially', () => {
    expect(component.bannerImages).toEqual([]);
  });
});
