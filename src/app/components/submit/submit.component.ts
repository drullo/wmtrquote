import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuoteService } from '@services/quote.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(private quoteService: QuoteService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.quoteService.currentStep = 'Finished';
    this.quoteService.currentStepNum = null;
    this.quoteService.initialize();
    this.toastr.success('Quote Request Submitted');
  }

}
