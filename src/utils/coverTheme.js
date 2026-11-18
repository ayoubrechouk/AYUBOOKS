function toHex(value) {
  return value.toString(16).padStart(2, "0");
}

function parseHex(color) {
  const normalized = color.replace("#", "");
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function mixColors(first, second, firstWeight) {
  const [firstRed, firstGreen, firstBlue] = parseHex(first);
  const [secondRed, secondGreen, secondBlue] = parseHex(second);
  const secondWeight = 1 - firstWeight;

  return `#${toHex(Math.round(firstRed * firstWeight + secondRed * secondWeight))}${toHex(
    Math.round(firstGreen * firstWeight + secondGreen * secondWeight),
  )}${toHex(Math.round(firstBlue * firstWeight + secondBlue * secondWeight))}`;
}

function relativeLuminance(color) {
  const channels = parseHex(color).map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(first, second) {
  const luminance = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (luminance[0] + 0.05) / (luminance[1] + 0.05);
}

function getTextColor(background) {
  return contrastRatio(background, "#ffffff") >= contrastRatio(background, "#251d19")
    ? "#ffffff"
    : "#251d19";
}

function colorFromPixels(pixels) {
  const colors = new Map();

  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3];
    if (alpha < 200) {
      continue;
    }

    const red = pixels[index];
    const green = pixels[index + 1];
    const blue = pixels[index + 2];
    const brightness = (red + green + blue) / 3;
    if (brightness < 28 || brightness > 242) {
      continue;
    }

    const saturation =
      Math.max(red, green, blue) === 0
        ? 0
        : (Math.max(red, green, blue) - Math.min(red, green, blue)) /
          Math.max(red, green, blue);
    const key = [red, green, blue].map((channel) => Math.round(channel / 16)).join(",");
    const current = colors.get(key);

    if (current) {
      current.score += 1 + saturation;
      current.samples += 1;
    } else {
      colors.set(key, {
        red: Math.round(red / 16) * 16,
        green: Math.round(green / 16) * 16,
        blue: Math.round(blue / 16) * 16,
        samples: 1,
        score: 1 + saturation,
      });
    }
  }

  const dominant = [...colors.values()].sort((first, second) => second.score - first.score)[0];
  if (!dominant) {
    throw new Error("The cover image did not contain a usable color palette.");
  }

  return `#${toHex(dominant.red)}${toHex(dominant.green)}${toHex(dominant.blue)}`;
}

export function extractDominantCoverColor(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 48;
        canvas.height = 64;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          throw new Error("A canvas context is unavailable for cover color extraction.");
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        resolve(colorFromPixels(pixels));
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => reject(new Error(`Could not load the book cover: ${imageUrl}`));
    image.src = imageUrl;
  });
}

export function createCoverTheme(dominantColor, fallbackTheme) {
  const accent = contrastRatio(dominantColor, "#ffffff") < 3
    ? mixColors(dominantColor, "#000000", 0.75)
    : dominantColor;
  const [red, green, blue] = parseHex(accent);

  return {
    ...fallbackTheme,
    background: mixColors(accent, "#ffffff", 0.08),
    panel: mixColors(accent, "#ffffff", 0.16),
    accent,
    accentContrast: getTextColor(accent),
    border: `${accent}40`,
    shadow: `rgba(${red}, ${green}, ${blue}, 0.3)`,
  };
}
