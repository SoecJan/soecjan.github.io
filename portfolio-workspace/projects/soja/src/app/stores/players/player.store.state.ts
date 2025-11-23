export interface PlayerStoreState {
    index: number;
    players: Array<{
        id: number;
        name: string;
    }>
}