import { Injectable } from '@angular/core';
import { Store } from 'store';
import { PlayerStoreState } from './player.store.state';

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreService extends Store<PlayerStoreState> {

  constructor() {
    super({ index: 0, players: [] });
  }

  public add(id: number, playerName: string): void {
    const currentState = { ...this.state };
    const player = { id: id, name: playerName };
    if (id > this.state.players.length) {
      this.state.players.push(player);
    } else {
      this.state.players[id] = player;
    }
    super.setState(currentState);
  }

  public nextPlayer(): string {
    this.setState({...this.state, index: (this.state.index + 1) % this.state.players.length})
    const nextPlayer = this.state.players[this.state.index];
    return nextPlayer?.name;
  }

  public randomPlayer(existingPlayers: string[]): string {
    if (existingPlayers.length === this.state.players.length) {
      return this.state.players[this.state.index]?.name;
    } else {
      let index = Math.floor(Math.random() * this.state.players.length);
      let player = this.state.players[index]
      const openPlayers = this.state.players.filter(value => !existingPlayers.includes(value.name))
      while (existingPlayers.includes(player.name)) {
        if (openPlayers.length === 0) {
          return this.state.players[this.state.index]?.name;
        }
        index = Math.floor(Math.random() * openPlayers.length);
        player = openPlayers[index]
      }
      return player.name;
    }
  }

  public replacementText(text: string, playernames: string[]): string {
    let splitIndex: number = 0;
    let hasNamePlaceholder: boolean = text.includes('{name');
    let splitString: string = `{name${splitIndex}}`
    let replacedTitle = text;
    while (hasNamePlaceholder) {
      if (splitIndex === 0 && playernames.length === 0) {
        playernames.push(this.nextPlayer());
      } else if (splitIndex >= playernames.length) {
        playernames.push(this.randomPlayer(playernames));
      }
      replacedTitle = this.replacePlaceholderWithName(replacedTitle, splitString, playernames[splitIndex]);
      splitIndex++;
      splitString = `{name${splitIndex}}`;
      hasNamePlaceholder = replacedTitle.includes('{name');
    }
    return replacedTitle;
  }

  public replacePlaceholderWithName(text: string, placeholder: string, name: string): string {
    let output: string = '';
    const textSplit = text.split(placeholder);
    textSplit.forEach((element, index) => {
      output += element;
      if (index < (textSplit.length - 1)) {
        output += name;
      }
    });
    return output;
  }
}