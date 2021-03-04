import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserStore } from './user.store';

/**
 * Using fake user for now.
 */
@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private userStore: UserStore, private http: HttpClient) {
  }

  get(id) {
    return this.http.get(`users/${id}`).pipe(tap(entities => this.userStore.update(entities)));
  }

}
