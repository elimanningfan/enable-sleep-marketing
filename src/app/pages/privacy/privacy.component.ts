import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  readonly canonicalUrl = 'https://docs.enablesleep.com/privacy-policy';

  ngOnInit(): void {
    window.location.replace(this.canonicalUrl);
  }
}
