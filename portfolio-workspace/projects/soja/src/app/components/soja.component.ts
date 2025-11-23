import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { SojaStoreState } from '../stores/soja/soja.store.state';
import { SojaItem } from '../types/soja';
import { SojaStore } from '../stores/soja/soja.store';
import { PlayerStoreService } from '../stores/players/player-store.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SojaService } from '../services/soja/soja.service';
import { MatButtonModule } from '@angular/material/button';

export interface SojaDisplayData { progress: string, title: string, content: string };

@Component({
  selector: 'app-soja-questions',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './soja.component.html',
  styleUrls: ['./soja.component.scss']
})
export class SojaComponent {
  soja$: Observable<SojaDisplayData>;

  constructor(private bottomSheet: MatBottomSheet, private sojaStore: SojaStore, private sojaService: SojaService, private playerStore: PlayerStoreService) {

    this.soja$ = this.sojaService.getAll()
      .pipe(
        filter((sojaStoreState: SojaStoreState) => sojaStoreState.sojas.length > 0),
        // get current active soja
        switchMap((sojaStoreState: SojaStoreState) => {
          return of({
            progress: `${sojaStoreState.index + 1} von ${sojaStoreState.sojas.length}`,
            soja: sojaStoreState.sojas[sojaStoreState.index]
          });
        }),
        // get player names
        map(result => this.getPlayernames(result)),
        // generate actual text
        switchMap((data: { progress: string, soja: SojaItem }) => {
          return of(
            {
              progress: data.progress,
              title: data.soja.title,
              content: data.soja.content
            }
          );
        })
      );
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

  getPlayernames(inputData: { progress: string, soja: SojaItem }): { progress: string, soja: SojaItem } {
    const playernames: string[] = [];
    const replacedNameSoja: SojaItem = {
      ...inputData.soja,
      title: this.playerStore.replacementText(inputData.soja.title, playernames),
      content: this.playerStore.replacementText(inputData.soja.content, playernames)
    };
    return { progress: inputData.progress, soja: replacedNameSoja };
  }

  generateTitle(soja: SojaItem): string {
    return soja.title;
  }

  generateContent(soja: SojaItem): string {
    return soja.content;
  }

  onNextClick() {
    this.sojaService.nextSoja();
  }
}
