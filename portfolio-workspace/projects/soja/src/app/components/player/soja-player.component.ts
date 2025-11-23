import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerStoreService } from '../../stores/players/player-store.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-soja-player',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './soja-player.component.html',
  styleUrls: ['./soja-player.component.scss']
})
export class SojaPlayerComponent {
  form: FormGroup<{
    players: FormArray<FormGroup<string>>,
  }>;

  get playerAmount(): number {
    let number = 0;
    const playersFormArray = this.form.get('players') as FormArray;
    playersFormArray.controls.forEach(control => {
      if (!!control.value && control.value !== '') {
        number++;
      }
    });
    return number;
  }

  get playerControls(): FormControl<string>[] {
    return (this.form.get('players') as FormArray).controls as FormControl[];
  }

  constructor(private formBuilder: FormBuilder, private playerStore: PlayerStoreService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      players: new FormArray<FormGroup<string>>([]),
    });
    this.playerStore.state.players.forEach(value => {
      this.addPlayer(value.name);
    });
  }

  onChange(id: number, changes: any) {
    const value = changes.target.value;
    this.playerStore.add(id, value);
  }

  createPlayerFormGroup(name?: string): FormGroup {
    return this.formBuilder.group({
      name: name
    });
  }

  addPlayer(name?: string): void {
    const playersFormArray = this.form.get('players') as FormArray;
    playersFormArray.push(this.createPlayerFormGroup(name));
  }

  onStartClick() {
    const playersFormArray = this.form.get('players') as FormArray;
    const playerNames = playersFormArray.value as { name: string }[];
    playerNames.forEach((value, index) => {
      this.playerStore.add(index, value?.name);
    })
    this.router.navigate(['questions'], { relativeTo: this.activatedRoute });
  }
}
