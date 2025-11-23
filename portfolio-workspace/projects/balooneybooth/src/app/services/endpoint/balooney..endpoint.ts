import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaloneyStoreState } from "../../stores/balooneybooth.store.state";

@Injectable({ providedIn: 'root' })
export class BalooneyEndpoint {
    constructor(private readonly httpClient: HttpClient) { }

    public getAll(): Observable<BaloneyStoreState> {
        return this.httpClient.get<BaloneyStoreState>('balooney.json');
    }
}