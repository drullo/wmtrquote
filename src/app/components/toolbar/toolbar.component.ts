import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '@services/quote.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(private router: Router,
    public quoteService: QuoteService) { }

  ngOnInit(): void {
    const quote = this.quoteService.quote;

    if (quote.contactInfo.untouched || !quote.contactInfo.valid) {
      this.router.navigate(['/contact']);
    }
  }
}
