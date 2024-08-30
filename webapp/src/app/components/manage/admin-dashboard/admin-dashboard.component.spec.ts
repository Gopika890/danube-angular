import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent, MatButtonModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three buttons', () => {
    const buttons = debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(3);
  });

  it('should have a button for managing categories', () => {
    const categoryButton = debugElement.query(By.css('button[routerLink="/admin/categories"]'));
    expect(categoryButton).toBeTruthy();
    expect(categoryButton.nativeElement.textContent.trim()).toBe('Manage Category');
  });

  it('should have a button for managing products', () => {
    const productButton = debugElement.query(By.css('button[routerLink="/admin/products"]'));
    expect(productButton).toBeTruthy();
    expect(productButton.nativeElement.textContent.trim()).toBe('Manage Products');
  });

  it('should have a button for managing brands', () => {
    const brandButton = debugElement.query(By.css('button[routerLink="/admin/brands"]'));
    expect(brandButton).toBeTruthy();
    expect(brandButton.nativeElement.textContent.trim()).toBe('Manage Brands');
  });
});
