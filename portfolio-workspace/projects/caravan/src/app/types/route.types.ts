export type RouteElement = {
    name: string;
    type: 'Straße' | 'See' | 'Wald';
    distance: number;
    terrain: 'Ebene' | 'See' | 'Hügel' | 'Gebirge' | 'Meer';
    travelTime: number;
}