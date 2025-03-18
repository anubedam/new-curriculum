import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { IndentificationService } from '../../../service/indentification.service';
import { IdentificationResponse } from '../../../interfaces';

@Component({
  selector: 'app-aside',
  standalone: false,
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit, OnDestroy {
  identificationResponse!: IdentificationResponse;
  subscriptions: Subscription[] = [];

  constructor(private identificationService: IndentificationService) {}

  ngOnInit(): void {
    const susbscription = this.identificationService.getIdentification().subscribe({
      next: response => this.identificationResponse = response,
      error: error => console.error(error)
    });
    this.subscriptions.push(susbscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
