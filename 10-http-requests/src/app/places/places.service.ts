import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
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
    )
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put("http://localhost:3000/user-places", {
      placeId: placeId
    })
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
