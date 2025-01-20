const palettes = [{
    name: "Rhiannon",
    primary: "#003E83",
    secondary: "#F5F5B8",
    accent: "#FF8C00",
}, {
    name: "Emerald Eyes",
    primary: "#1B3644",
    secondary: "#B5FFC2",
    accent: "#47FF47",
}, {
    name: "Black Magic Woman",
    primary: "#172713",
    secondary: "#B5D1CC",
    accent: "#FA9442",
}, {
    name: "Gold Dust Woman",
    primary: "#0F261F",
    secondary: "#FAED8F",
    accent: "#FF616B",
}, {
    name: "Landslide",
    primary: "#2B4C3F",
    secondary: "#F0EAD6",
    accent: "#DDA15E"
}, ];

function updateSelectedTheme(themeName) {
    // Reset all options to secondary color and remove old listeners
    document.querySelectorAll('.theme-option').forEach(button => {
        // Remove old listeners by cloning and replacing the button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        // Reset color
        newButton.style.removeProperty('color');

        // Add new hover listeners
        newButton.addEventListener('mouseenter', () => {
            newButton.style.removeProperty('color');
        });

        newButton.addEventListener('mouseleave', () => {
            if (newButton.dataset.theme === themeName) {
                newButton.style.color = 'var(--accent-color)';
            }
        });

        // Re-add click listener
        newButton.addEventListener('click', () => {
            const clickedThemeName = newButton.dataset.theme;
            const palette = palettes.find(p => p.name === clickedThemeName);
            if (palette) applyTheme(palette);
        });
    });

    // Set active theme to accent color
    const selectedButton = document.querySelector(`.theme-option[data-theme="${themeName}"]`);
    if (selectedButton) {
        selectedButton.style.color = 'var(--accent-color)';
    }
}

function applyTheme(palette) {
    document.documentElement.style.setProperty("--primary-color", palette.primary);
    document.documentElement.style.setProperty("--secondary-color", palette.secondary);
    document.documentElement.style.setProperty("--accent-color", palette.accent);
    document.body.style.backgroundColor = palette.primary;
    document.body.style.color = palette.secondary;

    updateSelectedTheme(palette.name);

    console.info(
        `The selected colour theme is based on '${palette.name}' by Fleetwood Mac.`
    );

    // Set selection color
    const style = document.createElement('style');
    style.textContent = `
        ::selection {
            background-color: ${palette.accent};
            color: ${palette.primary};
        }
    `;

    // Remove any previous selection styles
    const oldStyle = document.querySelector('style[data-selection-style]');
    if (oldStyle) {
        oldStyle.remove();
    }

    // Add data attribute to identify this style element
    style.setAttribute('data-selection-style', '');
    document.head.appendChild(style);

    localStorage.setItem('theme', palette.name);
}

// Set initial random theme
window.onload = function() {
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    applyTheme(palette);
};

// Handle theme selection
document.querySelectorAll('.theme-option').forEach(button => {
    button.addEventListener('click', () => {
        const themeName = button.dataset.theme;
        const palette = palettes.find(p => p.name === themeName);
        if (palette) applyTheme(palette);
    });
});