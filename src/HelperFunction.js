export function generateRandomLightColor() {
    const red = Math.floor(Math.random() * 10) + 246;
    const green = Math.floor(Math.random() * 10) + 246;
    const blue = Math.floor(Math.random() * 10) + 246;
    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  }