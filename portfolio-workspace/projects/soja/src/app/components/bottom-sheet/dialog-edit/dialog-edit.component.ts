import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, SojaItem } from '../../../types/soja';
import { SojaStore } from '../../../stores/soja/soja.store';
import { SojaStoreState } from '../../../stores/soja/soja.store.state';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SojaService } from '../../../services/soja/soja.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-smorle-dialog-edit',
  imports: [CommonModule, MatIconModule, MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnDestroy {
  
  subscription: Subscription;
  smorle: SojaItem = {id: -1, title: '', content: '', category: Category.RULE};
  
  form: FormGroup<{title: FormControl<string | null>, content: FormControl<string | null>}> = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });;

  constructor(private readonly sojaStore: SojaStore, private readonly sojaService: SojaService) { 
    this.subscription = this.sojaStore.state$.subscribe((sojaState: SojaStoreState) => {
      if (sojaState.sojas.length === 0) return;
      this.smorle = sojaState.sojas[sojaState.index];
      this.form = new FormGroup({
        title: new FormControl(this.smorle.title),
        content: new FormControl(this.smorle.content),
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.smorle.id === -1) return;
    let value: any = this.form.value;
    const smorle: SojaItem = {
      id: this.smorle.id,
      title: value.title,
      content: value.content,
      category: this.smorle.category
    };
    this.sojaService.update(smorle);
  }
}
