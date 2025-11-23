import { Injectable } from "@angular/core";
import { SojaStore } from "../../stores/soja/soja.store";
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
import { SojaItem } from '../../types/soja';
import { SojaStoreState } from "../../stores/soja/soja.store.state";
import { SojaEndpoint } from "../endpoint/soja.endpoint";

@Injectable({ providedIn: 'root' })
export class SojaService {
    constructor(private readonly sojaStore: SojaStore, private readonly sojaEndpoint: SojaEndpoint) { }

    public getAll(): Observable<SojaStoreState> {
        return this.sojaEndpoint.getAll().pipe(
            tap((sojaArray) => this.sojaStore.setState({sojas: sojaArray, index: 0})),
            switchMap(() => this.sojaStore.state$)
        );
    }

    public add(sojaItem: SojaItem): void {
        // TODO: add to state
    }

    public remove(sojaItem: SojaItem): void {
        // TODO: remove from state
    }

    public removeAll(): void {
        // TODO: clear store
    }

    public update(sojaItem: SojaItem): void {
        // TODO: update existing item
    }

    public download(): void {
        var sJson = JSON.stringify(this.sojaStore.state);
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
        element.setAttribute('download', "soja.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
    }

    public upload(smorles: any): void {
        this.readText(smorles).subscribe(result => {
            const uploadedState: SojaStoreState = JSON.parse(result as string) as SojaStoreState;
            uploadedState.sojas.forEach(entry => this.add({ ...entry, id: 0 }));
        });
    }

    private readText(event: any): Observable<unknown> {
        const file = event.target.files.item(0)
        return from(file.text());
    }

    public nextSoja() {
        const currentState: SojaStoreState = this.sojaStore.state;
        let index = currentState.index + 1;
        index = index % currentState.sojas.length;
        this.sojaStore.setState({ ...currentState, index: index }); // update ui
    }

    public restart() {
        this.sojaStore.setState({ ...this.sojaStore.state, index: 0 });
    }
}