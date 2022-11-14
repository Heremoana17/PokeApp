export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// generer un nombre alleatoir entre un min et un max
export function getRamdomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// melanger l'ordre d'un array
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
