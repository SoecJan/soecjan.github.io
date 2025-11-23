import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from './dialog-add/dialog-add.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SojaService } from '../../services/soja/soja.service';

@Component({
  selector: 'app-smorle-bottom-sheet',
  imports: [CommonModule, MatIconModule, MatListModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private sojaService: SojaService,
    public dialog: MatDialog) {}

  onDeleteClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onAddClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(DialogAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onChangeClick(event: MouseEvent): void {
    const dialogRef = this.dialog.open(DialogEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onRefreshClick(event: MouseEvent): void {
    this.sojaService.getAll();
  }

  onDownloadClick(event: MouseEvent): void {
    this.sojaService.download();
  }

  onUploadClick(fileInputEvent: any): void {
    this.sojaService.upload(fileInputEvent);
  }

  onRestartClick() {
    this.sojaService.restart();
  }
}
