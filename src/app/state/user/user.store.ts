import { Injectable } from '@angular/core';
import { ID, Store, StoreConfig } from '@datorama/akita';
import { UserRole } from '../models/userrole';

export interface User {
  id: ID;
  name: string;
  role: UserRole
}

export interface UserState {
  key: string;
}

export function createInitialState(): UserState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

}
