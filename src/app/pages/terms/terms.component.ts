import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  readonly canonicalUrl = 'https://docs.enablesleep.com/terms-of-service';

  ngOnInit(): void {
    window.location.replace(this.canonicalUrl);
  }
}
