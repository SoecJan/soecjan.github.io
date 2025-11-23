import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Category, SojaItem } from '../../../types/soja';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SojaService } from '../../../services/soja/soja.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-soja-dialog-add',
  imports: [CommonModule, MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatButtonModule],
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {

  selectedCategory: Category = Category.TASK;
  textForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  ruleForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  actionForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private readonly sojaService: SojaService) { }

  onSubmit() {
    let value: any;
    switch (this.selectedCategory) {
      case Category.TASK:
        value = this.textForm.value;
        break;
      case Category.RULE:
        value = this.ruleForm.value;
        break;
      case Category.ACTION:
        value = this.actionForm.value;
        break;
    }
    const soja: SojaItem = {
      id: 0,
      title: value.title,
      content: value.content,
      category: this.selectedCategory
    };
    this.sojaService.add(soja);
  }

  onTabChange(event: MatTabChangeEvent) {
    const label = event.tab.textLabel;
    switch (label) {
      case 'Text':
        this.selectedCategory = Category.TASK;
        break;
      case 'Regel':
        this.selectedCategory = Category.RULE;
        break;
      case 'Pflicht':
        this.selectedCategory = Category.ACTION;
        break;
    }
  }
}
