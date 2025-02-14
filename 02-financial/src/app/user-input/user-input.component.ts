import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestimentService } from '../investiment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  enteredInitialInvestiment = '0';
  enteredAnnualInvestiment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';

  constructor(public investmentService: InvestimentService){}

  onSubmit(){
    this.investmentService.calculateInvestmentResults({
        initialInvestment: +this.enteredInitialInvestiment,
        duration: +this.enteredDuration,
        expectedReturn: +this.enteredExpectedReturn,
        annualInvestment: +this.enteredAnnualInvestiment,
    });
  }
}
