function isInSpot(x, y) {
  dx = Math.round(x / stateTotalPadding);
  dy = Math.round(y / stateTotalPadding);
  xp = dx * stateTotalPadding;
  yp = dy * stateTotalPadding;

  if ((xp - x) ** 2 + (yp - y) ** 2 < spotSize ** 2 / 4) {
    return [dx, dy]
  }
  return undefined
}