import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient.get<{places: Place[]}>("http://localhost:3000/places", {
      observe: 'response'
    })
    .pipe(
      map((response) => response.body),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Fail to fetch available places"));
      })
    )
    .subscribe({
      next: (data) =>{
        console.log(data)
        this.places.set(data?.places)
      },
      error: (error: Error) => {
        this.error.set(error.message)
      },
      complete: () =>{
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() =>{
      subscription.unsubscribe();
    })
  }
}
