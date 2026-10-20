import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [],
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.css'
})
export class PlanCard {

  seleccionarPlan(plan: string): void {
    console.log('Plan seleccionado:', plan);
  }

}