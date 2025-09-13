/* 
Input:
ellipse object - 
{
  radii: [<first radius>, <seconds radius>],
  coordinates: [<latitude>, <longitude>],
  azimut: <the angle>
},
and number of points.

Output:
return an ellipse representation with WKT Polygon string field approximation representation of the ellipse.

Origin: https://stackoverflow.com/questions/28720287/create-ellipse-geography-representation/28762647#28762647
*/

const DEFAULT_NUMBER_OF_POINTS = 100;

export function ellipseToPolygon(ellipse, points = DEFAULT_NUMBER_OF_POINTS) {
  const step = (2 * Math.PI) / points; // creates *points* amount of points (1 for each "step")
  const radians = (Math.PI / 180) * (180 - ellipse.azimut);

  const semiMajorMetres = Math.max(...ellipse.radii) * 1000;
  const semiMinorMetres = Math.min(...ellipse.radii) * 1000;

  const latMetres = ellipse.coordinates[0] * 110575; // converts degree value to metres value
  const lonMetres = ellipse.coordinates[1] * 111303; // assumes you have variables with these known values
  const polygon = [];

  for (let theta = 0; theta <= 2 * Math.PI; theta += step) {
    let lon =
      lonMetres +
      semiMinorMetres * Math.cos(theta) * Math.cos(radians) -
      semiMajorMetres * Math.sin(theta) * Math.sin(radians);
    let lat =
      latMetres +
      semiMinorMetres * Math.cos(theta) * Math.sin(radians) +
      semiMajorMetres * Math.sin(theta) * Math.cos(radians);

    lat /= 110575; // convert metres back to degrees
    lon /= 111303;

    // Create your POLYGON string with these values in format POLYGON((lon lat, lon lat, lon lat, lon lat))
    polygon.push([lat, lon]);
  }

  // Note that the last coordinate set MUST be identical to the first coordinate set - confirm this and rectify the last coordinate double precision, if required
  polygon.push(polygon[0]);

  return polygon;
}
