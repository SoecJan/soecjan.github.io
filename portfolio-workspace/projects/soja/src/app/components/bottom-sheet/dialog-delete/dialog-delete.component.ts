import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, SojaItem } from '../../../types/soja';
import { SojaStore } from '../../../stores/soja/soja.store';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { SojaService } from '../../../services/soja/soja.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-soja-dialog-delete',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {

  soja: SojaItem;

  constructor(private readonly sojaStore: SojaStore, private readonly sojaService: SojaService) {
    const sojaState = this.sojaStore.state;
    if (sojaState.sojas.length == 0) {
      this.soja = { id: -1, title: '', content: '', category: Category.RULE };
    } else {
      this.soja = sojaState.sojas[sojaState.index];
    }
  }

  onSubmit() {
    if (this.soja.id === -1) return;
    this.sojaService.remove(this.soja);
  }

  onSubmitAll() {
    if (this.soja.id === -1) return;
    this.sojaService.removeAll();
  }
}
