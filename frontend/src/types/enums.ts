export enum Category {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export enum Filter {
  All = 'all',
  Films = Category.Films,
  People = Category.People,
  Planets = Category.Planets,
  Species = Category.Species,
  Starships = Category.Starships,
  Vehicles = Category.Vehicles,
}
