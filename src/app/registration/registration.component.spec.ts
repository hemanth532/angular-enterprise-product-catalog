import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when passwords do not match', () => {
    component.registrationForm.setValue({
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      confirmPassword: 'password321',
    });

    expect(component.registrationForm.valid).toBeFalse();
    expect(component.registrationForm.hasError('passwordMismatch')).toBeTrue();
  });
});
