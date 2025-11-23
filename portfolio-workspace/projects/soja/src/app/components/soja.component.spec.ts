import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SojaComponent } from './soja.component';
import { SojaStoreState } from '../stores/soja/soja.store.state';
import { Category, SojaItem } from '../types/soja';
import { SojaStore } from '../stores/soja/soja.store';
import { PlayerStoreService } from '../stores/players/player-store.service';

describe('SojaComponent', () => {
  let component: SojaComponent;
  let fixture: ComponentFixture<SojaComponent>;

  const testState: SojaStoreState = {
    index: 0, sojas: [{
      id: 1,
      title: 'title',
      content: 'content',
      category: Category.TASK
    }]
  };

  let smorleStoreService: {
    state$: Observable<SojaStoreState>,
    refresh: jest.Mock,
    add: jest.Mock,
    remove: jest.Mock,
    removeAll: jest.Mock,
    update: jest.Mock,
    download: jest.Mock,
    upload: jest.Mock,
    nextSmorle: jest.Mock,
    restart: jest.Mock
  };

  let playerStoreService: {
    add: jest.Mock,
    nextPlayer: jest.Mock,
    randomPlayer: jest.Mock
  }

  beforeEach(async () => {
    playerStoreService = {
      add: jest.fn(),
      nextPlayer: jest.fn(),
      randomPlayer: jest.fn()
    }

    smorleStoreService = {
      state$: of(testState),
      refresh: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
      removeAll: jest.fn(),
      update: jest.fn(),
      download: jest.fn(),
      upload: jest.fn(),
      nextSmorle: jest.fn(),
      restart: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SojaComponent, MatCardModule, MatIconModule, MatBottomSheetModule],
      declarations: [],
      providers: [
        { provide: SojaStore, useValue: smorleStoreService },
        { provide: PlayerStoreService, useValue: playerStoreService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    component.soja$.subscribe(data => {
      expect(data.title).toBe(testState.sojas[0].title);
      expect(data.content).toBe(testState.sojas[0].content);
      expect(data.progress).toBe('1 von 1');
      done();
    })
  });

  describe('getPlayernames', () => {
    const playername0: string = 'player1';
    const playername1: string = 'player2';
    const playername2: string = 'player3';

    beforeEach(() => {
      playerStoreService.nextPlayer.mockReturnValueOnce(playername0).mockReturnValueOnce(playername1).mockReturnValueOnce(playername2);
      playerStoreService.randomPlayer.mockReturnValueOnce(playername1).mockReturnValueOnce(playername2).mockReturnValueOnce(playername0);
    });
    
    it('should replace placeholders with player names', () => {
      // arrange
      const inputData = { progress: '1 von 1', smorle: { id: 1, title: 'Player {name0}, Player {name1}', content: 'Content {name0}, Content {name1}', category: Category.TASK } };

      // act
      const output: {
        progress: string;
        soja: SojaItem;
      } = component.getPlayernames(inputData);

      // assert
      expect(output.progress).toBe('1 von 1');
      expect(output.soja).toBeTruthy();
      expect(output.soja.title).toEqual(`Player ${playername0}, Player ${playername1}`);
      expect(output.soja.content).toEqual(`Content ${playername0}, Content ${playername1}`);
      expect(playerStoreService.nextPlayer).toHaveBeenCalledTimes(1);
      expect(playerStoreService.randomPlayer).toHaveBeenCalledTimes(1);
    });

    it('should not replace placeholders with player names', () => {
      // arrange
      const inputData = { progress: '1 von 1', smorle: { id: 1, title: 'Player {name0}, Player {name1}', content: 'Content {name0}, Content {name1}', category: Category.TASK } };

      // act
      const output: {
        progress: string;
        soja: SojaItem;
      } = component.getPlayernames(inputData);

      // assert
      expect(output.progress).toBe('1 von 1');
      expect(output.soja).toBeTruthy();
      expect(output.soja.title).toEqual(`Player ${playername0}, Player ${playername1}`);
      expect(output.soja.content).toEqual(`Content ${playername0}, Content ${playername1}`);
    });
  });
});
