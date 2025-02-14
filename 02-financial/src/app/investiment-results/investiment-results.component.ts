import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InvestimentService } from '../investiment.service';

@Component({
  selector: 'app-investiment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investiment-results.component.html',
  styleUrl: './investiment-results.component.css'
})
export class InvestimentResultsComponent {
  private investimentService = inject(InvestimentService);

  get results(){
    return this.investimentService.resultData;
  }
}
