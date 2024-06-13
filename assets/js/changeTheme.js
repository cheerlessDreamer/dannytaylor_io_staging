const palettes = [
  {
    name: "Albatross",
    background: "#29BDAD",
    text: "#FFFF00",
    accent: "#B1FFF7",
  },
  {
    name: "Rhiannon",
    background: "#003E83",
    text: "#F5F5B8",
    accent: "#FF8C00",
  },
  {
    name: "Emerald Eyes",
    background: "#1B3644",
    text: "#B5FFC2",
    accent: "#47FF47",
  },
  {
    name: "Black Magic Woman",
    background: "#172713",
    text: "#B5D1CC",
    accent: "#FA9442",
  },
  {
    name: "Gold Dust Woman",
    background: "#0F261F",
    text: "#FAED8F",
    accent: "#FF616B",
  },
];

window.onload = function () {
  const palette = palettes[Math.floor(Math.random() * palettes.length)];
  document.body.style.backgroundColor = palette.background;
  document.body.style.color = palette.text;
  document.documentElement.style.setProperty("--accent-color", palette.accent);

  console.info(
    `The selected colour theme is based on '${palette.name}' by Fleetwood Mac.`
  );
};
