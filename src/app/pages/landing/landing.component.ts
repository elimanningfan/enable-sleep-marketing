import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmailCaptureComponent } from '../../components/email-capture/email-capture.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    EmailCaptureComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  currentYear = new Date().getFullYear();

  stats = [
    { value: '84 Million', label: 'Americans estimated to have sleep-disordered breathing' },
    { value: 'Rapidly Increasing', label: 'Prevalence rising due to aging populations and obesity' }
  ];

  financialStats = [
    { value: '~$2,000', label: 'Profit per patient for compliant oral appliance therapy' },
    { value: '1 in 5', label: 'Adult patients in dental offices have sleep apnea' }
  ];

  problems = [
    {
      icon: 'receipt_long',
      title: 'Medical Insurance Billing',
      description: 'Sleep apnea requires medical insurance billing—not dental. Most dentists lack experience with medical billing codes and claims processes.'
    },
    {
      icon: 'schedule',
      title: 'Sleep Physician Coordination Takes Months',
      description: 'You need a sleep doctor diagnosis before treatment. Finding and coordinating with sleep physicians can take months, losing patients and revenue.'
    },
    {
      icon: 'description',
      title: 'No Sleep-Specific Documentation Software',
      description: 'Existing dental software doesn\'t handle sleep medicine compliance. Manual workflows risk audit failures and payment recoupment.'
    },
    {
      icon: 'gavel',
      title: 'Compliance Risk Without Expert Guidance',
      description: 'One documentation error can trigger full payment recoupment. You need bulletproof workflows that withstand Medicare and insurance audits.'
    }
  ];

  solutions = [
    {
      icon: 'checklist',
      title: 'Guided Workflows for Every Visit',
      description: 'Step-by-step templates tell you exactly what to document at each appointment—from screening to treatment to follow-up. Never wonder if you\'re doing it right.'
    },
    {
      icon: 'local_hospital',
      title: 'Sleep Physician Access in Days, Not Months',
      description: 'Connect your patients to board-certified sleep physicians through our network. Get diagnosis and treatment authorization fast so you don\'t lose patients.'
    },
    {
      icon: 'verified',
      title: 'Audit-Proof Compliance Documentation',
      description: 'Built by dental sleep medicine experts. Every workflow ensures compliance with Medicare and insurance requirements. Sleep easy knowing you\'re protected.'
    },
    {
      icon: 'payments',
      title: 'Medical Billing Engine Built In',
      description: 'We handle the complex medical billing codes (not dental codes). Submit claims correctly the first time and get paid faster with our claims optimization.'
    },
    {
      icon: 'psychology',
      title: 'AI Medical Scribe',
      description: 'Our AI assistant takes notes during patient visits, automatically documenting everything you need for compliance. Spend more time with patients, less on paperwork.'
    },
    {
      icon: 'folder_shared',
      title: 'Complete Sleep EMR System',
      description: 'Purpose-built electronic medical records for sleep medicine patients. Calendaring, patient tracking, and task management all in one HIPAA-compliant platform.'
    }
  ];

  team = [
    // Temporarily removed - can be easily restored later
    // {
    //   name: 'Dr. Tran Miller-Quach',
    //   title: 'Chief Dental Officer & Co-Founder',
    //   image: '/assets/logos/team/dr-miller.jpg',
    //   achievements: [
    //     { text: 'Owner/operator of Stillwater Dental and Sleep Better Bend Clinic in Bend, Oregon' },
    //     { text: 'Only Diplomat by the American Academy of Dental Sleep Medicine in Central Oregon' },
    //     { text: 'Built thriving dental sleep medicine practice from ground up' }
    //   ]
    // },
    // {
    //   name: 'Dr. Joseph Zelk',
    //   title: 'Chief Sleep Officer & Co-Founder',
    //   image: '/assets/logos/team/dr-zelk.jpg',
    //   achievements: [
    //     { text: '20+ years in dental sleep medicine' },
    //     { text: 'His telemedicine service sees patients in all 50 states' },
    //     { text: 'Expert in mandibular advancement device billing codes (HCPCS E0486)' },
    //     {
    //       text: 'Co-author of "Beautiful Faces: The Architects of Attractiveness and Breathing"',
    //       link: 'https://www.amazon.com/Beautiful-Faces-Architects-Attractiveness-Breathing/dp/B0DSS3T9SX'
    //     }
    //   ]
    // }
  ];
}
