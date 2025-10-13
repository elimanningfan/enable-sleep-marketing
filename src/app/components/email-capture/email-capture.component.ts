import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field';
import { EmailCaptureService } from '../../services/email-capture.service';

declare const gtag: Function;

@Component({
  selector: 'app-email-capture',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TextFieldModule
  ],
  templateUrl: './email-capture.component.html',
  styleUrls: ['./email-capture.component.scss']
})
export class EmailCaptureComponent {
  emailForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage = '';

  roles = [
    { value: 'dentist', label: 'Dentist' },
    { value: 'dental-staff', label: 'Dental Office Staff' },
    { value: 'sleep-specialist', label: 'Sleep Medicine Specialist' },
    { value: 'practice-owner', label: 'Practice Owner/Manager' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    private emailCaptureService: EmailCaptureService
  ) {
    this.emailForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['dentist'],
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      this.emailCaptureService.submitEmail(this.emailForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            this.isSubmitted = true;
            this.isSubmitting = false;

            // Track conversion in GA4
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'event_category': 'waitlist',
                'event_label': this.emailForm.value.role || 'not-specified'
              });
            }
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = 'Something went wrong. Please try again.';
          console.error('Email submission error:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.emailForm.reset();
  }
}
