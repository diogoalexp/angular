import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
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

  onSelectPlace(selectedPlace: Place){
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace.id)
    .subscribe({
      next: (resData) => console.log(resData)
    });

    this.destroyRef.onDestroy(() =>{
      subscription.unsubscribe();
    })
  }
}
