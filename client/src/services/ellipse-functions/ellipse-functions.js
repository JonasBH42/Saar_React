export const ellipseMaxCoordinates = (coordinate, radius) =>
  Number(coordinate) + radius / Math.sqrt(2) / 100;

export const ellipseMinCoordinates = (coordinate, radius) =>
  Number(coordinate) - radius / Math.sqrt(2) / 100;
