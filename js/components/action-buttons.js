// Move up, Move down, and delete buttons
import components from './components.js';

components.actionButtons = function () {
  return `
    <button class="move-up-btn" aria-label="move-up" onclick="app.formInputUp()">
      <i class="fa-solid fa-arrow-up fa-icon"></i>
    </button>
    <button class="move-down-btn" aria-label="move-down" onclick="app.formInputDown()">
      <i class="fa-solid fa-arrow-down fa-icon"></i>
    </button>
    <button class="remove-btn" aria-label="remove" onclick="app.formInputDelete()">
      <i class="fa-solid fa-trash-can fa-icon"></i>
    </button>
  `;
};

export default components;
