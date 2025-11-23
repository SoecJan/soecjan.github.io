import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _state: T;
  private readonly _state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this._state = initialState;
  }

  get state(): T {
    return this._state;
  }

  get state$(): Observable<T> {
    return this._state$;
  }

  setState(state: T) {
    this._state = state;
    this._state$.next(state);
  }
}
