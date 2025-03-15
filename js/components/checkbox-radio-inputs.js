// Input types: checkbox, radio

import components from './components.js';

// prettier-ignore
components.radioCheckboxInputOptions = function ({
  required = false,
  type = 'radio',
  disabled = false,
} = {}) {
  return `
    ${components.typeDropdown(type, disabled)}
    
    <label for="radioRequired">Required</label>
    <span class="tooltip-wrapper" ${ disabled ? 'data-tippy-content="You cannot change the required status when an option is selected."' : '' }>
      <input type="checkbox" id="radioRequired" ${ required ? 'checked' : '' } onchange="app.formInputRequiredUpdate(event)">
    </span>
  `;
};

components.radioCheckboxInput = function ({
  inputType = 'radio',
  optionValue = 'Option 1',
  optionId = 'radio-1-option1',
} = {}) {
  return `
    <p class="option-prompt">Prompt/Question</p>
    <div class="form-item option">
      <input name="" type="${inputType}" value="${optionValue}" id="${optionId}">
      <label for="${optionId}">${optionValue}</label>
    </div>
  `;
};

// prettier-ignore
components.radioCheckboxAdvancedOptions = function ({ 
  prompt = '',
  name = '',
  label = '',
  disabled = false,
} = {}) {
  return `
    <div class="options-header">
      <h3>Options:</h3>
    </div>
    <label for="prompt">Prompt</label>
    <span class="tooltip-wrapper" ${ disabled ? 'data-tippy-content="You cannot change the prompt when an option is selected."' : '' }>
      <input type="text" id="prompt" placeholder="Prompt / Queston" value="${prompt}" onkeyup="app.formOptionAddPrompt(event)">
    </span>
    
    <label for="radioName">Name</label>
    <input type="text" placeholder="Name" id="radioName" value="${name}" onkeyup="app.formInputNameUpdate(event)">
    
    <label for="radioLabel">Label</label>
    <input type="text" id="radioLabel" placeholder="Label" value="${label}" onkeyup="app.formInputLabelUpdate(event)">

    <button class="option-move-up" aria-label="move-up" onclick="app.formOptionMoveUp()">
      <i class="fa-solid fa-arrow-up fa-icon"></i>
    </button>
    <button class="option-move-down" aria-label="move-down" onclick="app.formOptionMoveDown()">
      <i class="fa-solid fa-arrow-down fa-icon"></i>
    </button>
    <button class="remove-option-btn" aria-label="remove option" onclick="app.formInputRemoveOption()">
      <i class="fa-solid fa-trash-can fa-icon"></i>
    </button>
    <button class="add-option-btn" onclick="app.formInputAddOption()">Add Option</button>
  `;
}

export default components;
