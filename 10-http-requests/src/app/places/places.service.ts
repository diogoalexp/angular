import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Fail to fetch available places"
      )
  }

  loadUserPlaces() {
    return this.fetchPlaces(
    "http://localhost:3000/user-places",
    "Fail to fetch your favorite places"
    ).pipe(
      tap({
        next: (userPlaces) => {
          if(userPlaces)
            this.userPlaces.set(userPlaces.places)
        }
      })
    )
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if(!prevPlaces.some((p) => p.id == place.id)){
      this.userPlaces.update(prevPlaces => [...prevPlaces, place]);
    }


    return this.httpClient.put("http://localhost:3000/user-places", {
      placeId: place.id
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to stored selected place')
        return throwError(() => new Error('Failed to stored selected place'))
      })
    );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string){
    return this.httpClient.get<{places: Place[]}>(url, {
      observe: 'response'
    })
    .pipe(
      map((response) => response.body),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    )
  }
}
