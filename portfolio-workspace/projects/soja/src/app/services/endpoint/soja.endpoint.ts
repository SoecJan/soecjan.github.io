import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SojaItem } from "../../types/soja";

@Injectable({providedIn: 'root'})
export class SojaEndpoint {
    constructor(private readonly httpClient: HttpClient) {}

    public getAll(): Observable<SojaItem[]> {
        return this.httpClient.get<SojaItem[]>('soja.json');
    }
}