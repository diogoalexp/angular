import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectCount, selectDoubleCount } from '../store/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  standalone: true,
  imports: [AsyncPipe]
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  // counter = 0;
  // counterServiceSub?: Subscription;

  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor (private store : Store<{counter: number}>){
    this.count$ = this.store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount);
    this.count$.subscribe();
  }

  // constructor(private counterService: CounterService) {}

  ngOnInit(): void {
  //   this.counterServiceSub = this.counterService.counterChanged.subscribe(
  //     (newVal) => (this.counter = newVal)
  //   );
  }

  ngOnDestroy(): void {
  //   if (this.counterServiceSub) {
  //     this.counterServiceSub.unsubscribe();
  //   }
  }
}
