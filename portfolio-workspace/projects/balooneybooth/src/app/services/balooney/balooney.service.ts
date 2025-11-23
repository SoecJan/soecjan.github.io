import { Injectable } from "@angular/core";
import { BaloneyStoreState } from "../../stores/balooneybooth.store.state";
import { from, Observable, switchMap, tap } from "rxjs";
import { BalooneyStore } from "../../stores/balooneybooth.store";
import { BalooneyEndpoint } from "../endpoint/balooney..endpoint";
import { Baloney, BaloneyType } from "../../types/balooneybooth";

@Injectable({ providedIn: 'root' })
export class BalooneyService {

    constructor(private readonly balooneyStore: BalooneyStore, private readonly balooneyEndpoint: BalooneyEndpoint) { }

    public getAll(): Observable<BaloneyStoreState> {
        if (this.balooneyStore.state?.baloneys?.length > 0) {
            return this.balooneyStore.state$;
        }
        return this.balooneyEndpoint.getAll().pipe(
            tap((balooneyStoreState) => this.balooneyStore.setState(balooneyStoreState)),
            switchMap(() => this.balooneyStore.state$)
        );
    }

    public add(baloney: Baloney): void {
        // TODO: add to state
    }

    public remove(baloney: Baloney): void {
        // TODO: remove from state
    }

    public removeAll(): void {
        // TODO: clear store
    }

    public update(baloney: Baloney): void {
        // TODO: update existing item
    }

    public download(): void {
        var sJson = JSON.stringify(this.balooneyStore.state);
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
        element.setAttribute('download', "balooney.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
    }

    public upload(smorles: any): void {
        this.readText(smorles).subscribe(result => {
            const uploadedState: BaloneyStoreState = JSON.parse(result as string) as BaloneyStoreState;
            uploadedState.baloneys.forEach(entry => this.add({ ...entry, id: 0 }));
        });
    }

    private readText(event: any): Observable<unknown> {
        const file = event.target.files.item(0)
        return from(file.text());
    }

    public nextSoja() {
        const currentState: BaloneyStoreState = this.balooneyStore.state;
        let index = currentState.index + 1;
        index = index % currentState.baloneys.length;
        this.balooneyStore.setState({ ...currentState, index: index }); // update ui
    }

    public restart() {
        this.balooneyStore.setState({ ...this.balooneyStore.state, index: 0 });
    }
}