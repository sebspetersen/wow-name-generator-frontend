// public/script.js

// Theme Toggle Logic
const themeToggleButton = document.getElementById('themeToggle');
const body = document.body;

// Check user's preference from localStorage
const userPreferredTheme = localStorage.getItem('theme');

// Apply stored theme preference
if (userPreferredTheme) {
  body.classList.toggle('dark', userPreferredTheme === 'dark');
  updateThemeButton(userPreferredTheme === 'dark');
} else {
  // Set default theme to dark if no preference is stored
  body.classList.add('dark');
  updateThemeButton(true);
}

// Function to update button text based on theme
function updateThemeButton(isDarkMode) {
  if (isDarkMode) {
    themeToggleButton.textContent = '🌞 Switch to Light Mode';
  } else {
    themeToggleButton.textContent = '🌙 Switch to Dark Mode';
  }
}

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDarkMode = body.classList.contains('dark');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateThemeButton(isDarkMode);
});

// Race-Class Mapping with Emojis
const raceClassMap = {
  'Human': [
    { class: 'Warrior', emoji: '🛡️' },
    { class: 'Paladin', emoji: '⚔️' },
    { class: 'Hunter', emoji: '🏹' },
    { class: 'Rogue', emoji: '🗡️' },
    { class: 'Priest', emoji: '✝️' },
    { class: 'Mage', emoji: '🔮' },
    { class: 'Warlock', emoji: '💀' },
    { class: 'Monk', emoji: '🥋' },
    { class: 'Death Knight', emoji: '⚰️' }
  ],
  'Dwarf': [
    { class: 'Warrior', emoji: '🛡️' },
    { class: 'Paladin', emoji: '⚔️' },
    { class: 'Hunter', emoji: '🏹' },
    { class: 'Rogue', emoji: '🗡️' },
    { class: 'Priest', emoji: '✝️' },
    { class: 'Shaman', emoji: '⚡' },
    { class: 'Mage', emoji: '🔮' },
    { class: 'Warlock', emoji: '💀' },
    { class: 'Monk', emoji: '🥋' },
    { class: 'Death Knight', emoji: '⚰️' }
  ],
  'Night Elf': [
    { class: 'Warrior', emoji: '🛡️' },
    { class: 'Hunter', emoji: '🏹' },
    { class: 'Rogue', emoji: '🗡️' },
    { class: 'Priest', emoji: '✝️' },
    { class: 'Mage', emoji: '🔮' },
    { class: 'Monk', emoji: '🥋' },
    { class: 'Druid', emoji: '🌿' },
    { class: 'Demon Hunter', emoji: '😈' },
    { class: 'Death Knight', emoji: '⚰️' }
  ],
  // Add similar entries for other races...
};

// Function to update class options based on selected race
document.getElementById('race').addEventListener('change', updateClassOptions);

function updateClassOptions() {
  const race = document.getElementById('race').value;
  const classSelect = document.getElementById('class');
  const availableClasses = raceClassMap[race];

  // Clear existing options
  classSelect.innerHTML = '';

  // Populate with available classes and their emojis
  availableClasses.forEach(characterClass => {
    const option = document.createElement('option');
    option.value = characterClass.class;
    option.textContent = `${characterClass.class} ${characterClass.emoji}`;
    classSelect.appendChild(option);
  });
}

// Initialize class options on page load
updateClassOptions();

// Form submission logic
document.getElementById('nameForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const race = document.getElementById('race').value;
  const characterClass = document.getElementById('class').value;
  const gender = document.getElementById('gender').value;

  try {
    const response = await fetch('/generate-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ race, characterClass, gender }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('result').innerText = `Your character's name is: ${data.name}`;
    } else {
      document.getElementById('result').innerText = `Error: ${data.error}`;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerText = 'An unexpected error occurred.';
  }
});
