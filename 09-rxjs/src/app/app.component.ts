import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount)

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$);

  signalInverval = signal(0);
  doubleInterval =  computed(() => this.signalInverval() * 2)

  constructor(){
    effect(() =>{
      console.log(`clickCount ${this.clickCount} times`)
    })
  }

  ngOnInit(): void {
    setInterval(() =>{
      this.signalInverval.update(prev => prev+1)
    }, 1000)

      // const subscription = interval(1000).pipe(
      //   map((val) => val * 2)
      // ).subscribe({
      //   next: (val) => console.log(val),
      //   complete: () => {}
      // });

      // this.destroyRef.onDestroy(() =>{
      //   subscription.unsubscribe();
      // })

      this.clickCount$.subscribe({
        next: (val) => console.log(`clickCount$ ${this.clickCount()} times`)
      })
  }

  onClick(){
    this.clickCount.update(prevCount => prevCount+1)
  }
}
