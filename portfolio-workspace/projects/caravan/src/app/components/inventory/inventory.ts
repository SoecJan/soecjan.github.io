import { ChangeDetectionStrategy, Component, Input, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PlayerInventoryService } from '../../services/inventory/player-inventory.service';
import { Observable } from 'rxjs';
import { PlayerInventoryStoreState } from '../../stores/inventory/player-inventory.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inventory implements OnInit {

  playerInventoryState$: Observable<PlayerInventoryStoreState>;

  constructor(private readonly playerInventoryService: PlayerInventoryService) {
    this.playerInventoryState$ = this.playerInventoryService.playerInventory$;
  }
  
  ngOnInit(): void {
  }
}
