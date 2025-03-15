import components from './components/components.js';
import './components/form-rows.js';
import './components/action-buttons.js';
import './components/type-dropdown.js';
import './components/text-based-inputs.js';
import './components/checkbox-radio-inputs.js';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

let app = {
  selected: null,
  nextGroupUID: 1,
  nextElementUID: 1,
  // These will be set on DOMContentLoaded:
  form: null,
  basicOptions: null,
  advancedOptions: null,
  startText: null,
  codeContainer: null,
  code: null,

  // Called when any element in the form is clicked
  select: function (event) {
    this.selected = event.target;
    // Remove the 'selected' class from all elements in the form
    this.form
      .querySelectorAll('.selected')
      .forEach((el) => el.classList.remove('selected'));
    event.target.classList.add('selected');
    console.log(event.target);

    // High-level branch decisions based on the target's class
    if (event.target.classList.contains('form')) {
      this.basicOptions.classList.remove('hidden');
      this.advancedOptions.classList.add('hidden');
      this.basicOptions.innerHTML = components.addFormRows();
    } else if (event.target.classList.contains('start-text')) {
      this.basicOptions.classList.remove('hidden');
      // Replace innerHTML to disable further clicks on start text
      this.selected.innerHTML = `<div class="start-text pointer-disabled">Use the buttons above to add form elements</div>`;
      this.basicOptions.innerHTML = components.addFormRows();
      this.form.click();
    } else if (event.target.classList.contains('form-row')) {
      this.advancedOptions.classList.add('hidden');
      this.basicOptions.innerHTML = components.formRowInputOptions();
    } else if (event.target.classList.contains('form-item')) {
      // Delegate rendering logic to the helper functions.
      this.basicOptions.innerHTML = this.getBasicInputOptions();
      this.advancedOptions.innerHTML = this.getAdvancedInputOptions();
      this.advancedOptions.classList.remove('hidden');

      // Additional adjustments for option elements versus others
      if (this.selected.classList.contains('option')) {
        let promptInput = this.advancedOptions.querySelector('#prompt');
        if (promptInput) promptInput.disabled = true;
        let radioName = this.advancedOptions.querySelector('#radioName');
        let radioLabel = this.advancedOptions.querySelector('#radioLabel');
        if (radioName) radioName.disabled = false;
        if (radioLabel) radioLabel.disabled = false;
        let addOptionBtn =
          this.advancedOptions.querySelector('.add-option-btn');
        if (addOptionBtn) addOptionBtn.disabled = true;
        let radioRequiredCheckbox =
          this.basicOptions.querySelector('#radioRequired');
        if (radioRequiredCheckbox) radioRequiredCheckbox.disabled = true;
      } else {
        let promptInput = this.advancedOptions.querySelector('#prompt');
        if (promptInput) {
          promptInput.disabled = false;
          promptInput.placeholder = 'Prompt / Question';
        }
        let radioName = this.advancedOptions.querySelector('#radioName');
        let radioLabel = this.advancedOptions.querySelector('#radioLabel');
        if (radioName) radioName.disabled = true;
        if (radioLabel) radioLabel.disabled = true;
        let addOptionBtn =
          this.advancedOptions.querySelector('.add-option-btn');
        if (addOptionBtn) addOptionBtn.disabled = false;
        let radioRequiredCheckbox =
          this.basicOptions.querySelector('#radioRequired');
        if (radioRequiredCheckbox) radioRequiredCheckbox.disabled = false;
      }
    }
    // Reinitialize Tippy for any new elements with tooltips
    tippy('[data-tippy-content]', {
      allowHTML: true,
      placement: 'top',
      theme: 'light-border',
      interactive: true,
      appendTo: 'parent',
    });
  },

  // Helper to generate the basic options markup
  getBasicInputOptions: function () {
    let input = this.selected.querySelector('input');
    let type = input ? input.type : 'text';
    let name = input ? input.name : '';
    let label = this.selected.querySelector('label')
      ? this.selected.querySelector('label').innerText
      : '';
    let placeholder = input ? input.placeholder : '';
    let required = input ? input.required : false;
    // If the selected element has the "option" class, we want the dropdown disabled.
    let isOption = this.selected.classList.contains('option');

    if (['text', 'password', 'search', 'tel', 'url'].includes(type)) {
      return components.textInputOptions({
        type,
        name,
        label,
        placeholder,
        required,
      });
    } else if (['radio', 'checkbox'].includes(type)) {
      return components.radioCheckboxInputOptions({
        type,
        name,
        label,
        required,
        disabled: isOption, // disable if it's an option
      });
    }
    return components.textInputOptions({
      type,
      name,
      label,
      placeholder,
      required,
    });
  },

  // Helper to generate the advanced options markup
  getAdvancedInputOptions: function () {
    let input = this.selected.querySelector('input');
    let type = input ? input.type : 'text';
    let minlength = input ? input.getAttribute('minlength') || '' : '';
    let maxlength = input ? input.getAttribute('maxlength') || '' : '';
    let pattern = input ? input.getAttribute('pattern') || '' : '';
    let readonly = input ? input.hasAttribute('readonly') : false;
    // For advanced options, if the element is an "option", we want fields disabled.
    let isOption = this.selected.classList.contains('option');
    let disabled = isOption;
    let prompt = document.querySelector('#prompt')
      ? document.querySelector('#prompt').value
      : '';
    let name = input ? input.name : '';
    let label = this.selected.querySelector('label')
      ? this.selected.querySelector('label').innerText
      : '';

    if (['text', 'password', 'search', 'tel', 'url'].includes(type)) {
      return components.textInputsAdvancedOptions({
        minlength,
        maxlength,
        pattern,
        readonly,
        disabled,
      });
    } else if (['radio', 'checkbox'].includes(type)) {
      return components.radioCheckboxAdvancedOptions({
        prompt,
        name,
        label,
        disabled,
      });
    }
  },

  toggleTheme: function () {
    let checkbox = document.getElementById('theme-checkbox');
    let body = document.body;
    if (checkbox.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  },

  formMethodUpdate: function (event) {
    this.form.method = event.target.value;
  },

  formActionUpdate: function (event) {
    this.form.action = event.target.value;
  },

  formAddRow: function (cols) {
    if (this.startText) {
      this.startText.remove();
    }
    this.form.innerHTML += `<div class="form-row form-col-${cols}"></div>`;
  },

  formRowMoveDown: function () {
    let parent = this.selected.parentElement;
    let next = this.selected.nextElementSibling;
    if (next) {
      parent.insertBefore(next, this.selected);
    }
  },

  formRowMoveUp: function () {
    let parent = this.selected.parentElement;
    let prev = this.selected.previousElementSibling;
    if (prev) {
      parent.insertBefore(this.selected, prev);
    }
  },

  formRowDelete: function () {
    this.selected.remove();
    if (this.form.children.length === 0) {
      this.form.innerHTML = `<div class="start-text pointer-disabled">Use the buttons above to add form elements</div>`;
      this.form.click();
    }
  },

  formRowAddInput: function () {
    let inputId = `text-${this.nextElementUID++}-option1`;
    this.selected.innerHTML += `
      <div class="form-item">
        <label for="${inputId}"></label>
        <input name="" type="text" id="${inputId}" placeholder="">
      </div>`;
  },

  formInputTypeUpdate: function (event) {
    let newType = event.target.value;
    if (newType === 'radio' || newType === 'checkbox') {
      if (!this.selected.hasAttribute('data-uid')) {
        this.selected.setAttribute('data-uid', this.nextGroupUID++);
      }
      let groupUID = this.selected.getAttribute('data-uid');
      this.selected.innerHTML = components.radioCheckboxInput({
        inputType: newType,
        optionValue: 'Option 1',
        optionId: `${newType}-${groupUID}-option1`,
      });
      this.advancedOptions.innerHTML = components.radioCheckboxAdvancedOptions({
        name: this.selected.querySelector('input').name || '',
        label: this.selected.querySelector('label').innerText || '',
        disabled: true,
      });
      this.advancedOptions.classList.remove('hidden');

      let addOptionBtn = this.advancedOptions.querySelector('.add-option-btn');
      if (addOptionBtn) {
        addOptionBtn.disabled = false;
      }
      this.advancedOptions.querySelector('#prompt').value = `Prompt/Question`;
      this.selected.click();
    } else {
      let newID = `${newType}-option1-${this.nextElementUID++}`;
      this.selected.innerHTML = components.textInput({
        type: newType,
        required: false,
        inputId: newID,
      });
      if (['text', 'password', 'search', 'tel', 'url'].includes(newType)) {
        this.advancedOptions.innerHTML = components.textInputsAdvancedOptions();
        this.advancedOptions.classList.remove('hidden');
      } else {
        this.advancedOptions.classList.add('hidden');
      }
    }
  },

  formInputNameUpdate: function (event) {
    this.selected.querySelector('input').name = event.target.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  },

  formInputLabelUpdate: function (event) {
    let labelEl = this.selected.querySelector('label');
    let inputEl = this.selected.querySelector('input');
    let inputValue = event.target.value.trim();
    labelEl.innerText = inputValue;
    if (!['radio', 'checkbox'].includes(inputEl.type)) {
      labelEl.setAttribute('for', inputEl.getAttribute('id'));
    } else {
      let currentId = inputEl.getAttribute('id');
      labelEl.setAttribute('for', currentId);
      inputEl.value = inputValue;
    }
  },

  formInputMinUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value === '') {
      input.removeAttribute('min');
    } else {
      input.setAttribute('min', event.target.value);
    }
  },

  formInputMaxUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value === '') {
      input.removeAttribute('max');
    } else {
      input.setAttribute('max', event.target.value);
    }
  },

  formInputPlaceholderUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value.trim() === '') {
      input.removeAttribute('placeholder');
    } else {
      input.setAttribute('placeholder', event.target.value.trim());
    }
  },

  formInputRequiredUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (!input) return;
    if (input.type === 'radio' || input.type === 'checkbox') {
      let inputs = this.selected.querySelectorAll(
        'input[type="radio"], input[type="checkbox"]'
      );
      if (event.target.checked) {
        if (inputs.length) {
          inputs[0].setAttribute('required', '');
        }
      } else {
        inputs.forEach((i) => i.removeAttribute('required'));
      }
    } else {
      if (event.target.checked) {
        input.setAttribute('required', '');
      } else {
        input.removeAttribute('required');
      }
    }
  },

  formInputStepUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value === '') {
      input.removeAttribute('step');
    } else {
      input.setAttribute('step', event.target.value);
    }
  },

  formInputMinlengthUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value === '') {
      input.removeAttribute('minlength');
    } else {
      input.setAttribute('minlength', event.target.value);
    }
  },

  formInputMaxlengthUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value === '') {
      input.removeAttribute('maxlength');
    } else {
      input.setAttribute('maxlength', event.target.value);
    }
  },

  formInputPatternUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.value.trim() === '') {
      input.removeAttribute('pattern');
    } else {
      input.setAttribute('pattern', event.target.value.trim());
    }
  },

  formInputReadonlyUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.checked) {
      input.setAttribute('readonly', '');
    } else {
      input.removeAttribute('readonly');
    }
  },

  formInputDisabledUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.checked) {
      input.setAttribute('disabled', '');
    } else {
      input.removeAttribute('disabled');
    }
  },

  formInputUp: function () {
    let parent = this.selected.parentElement;
    let prev = this.selected.previousElementSibling;
    if (prev) {
      parent.insertBefore(this.selected, prev);
    }
  },

  formInputDown: function () {
    let parent = this.selected.parentElement;
    let next = this.selected.nextElementSibling;
    if (next) {
      parent.insertBefore(next, this.selected);
    }
  },

  formInputDelete: function () {
    let target = this.selected.parentElement;
    this.selected.remove();
    target.click();
  },

  formInputAddOption: function () {
    let optionsContainer = this.selected;
    let optionCount =
      optionsContainer.querySelectorAll('.form-item.option').length;
    let inputEl = optionsContainer.querySelector('input');
    if (!inputEl) return;
    let inputType = inputEl.type;
    let optionNumber = optionCount + 1;
    let optionValue = `Option ${optionNumber}`;
    let groupUID = optionsContainer.getAttribute('data-uid') || '1';
    let newId = `${inputType}-${groupUID}-option${optionNumber}`;
    let newOptionHTML = `    
      <div class="form-item option">
        <input name="" type="${inputType}" value="${optionValue}" id="${newId}">
        <label for="${newId}">${optionValue}</label>
      </div>
    `;
    optionsContainer.innerHTML += newOptionHTML;
  },

  formOptionAddPrompt: function (event) {
    this.selected.querySelector('.option-prompt').innerText =
      event.target.value;
  },

  formOptionMoveUp: function () {
    let parent = this.selected.parentElement;
    let prev = this.selected.previousElementSibling;
    if (prev) {
      parent.insertBefore(this.selected, prev);
    }
  },

  formOptionMoveDown: function () {
    let parent = this.selected.parentElement;
    let next = this.selected.nextElementSibling;
    if (next) {
      parent.insertBefore(next, this.selected);
    }
  },

  formInputRemoveOption: function () {
    this.selected.remove();
  },

  generateHTML: function () {
    let requiredCheckboxes = this.form.querySelectorAll(
      'input[type="checkbox"][required]'
    );
    let requiredNames = new Set();
    requiredCheckboxes.forEach((checkbox) => {
      if (checkbox.name) {
        requiredNames.add(checkbox.name);
      }
    });

    let messageText = '';
    if (requiredNames.size > 0) {
      let namesArray = Array.from(requiredNames);
      messageText = `***** WARNING: Custom validation is required for the following checkbox groups: ${namesArray.join(
        ', '
      )} *****\n\n`;
      this.showToast(
        `Custom validation required for checkbox groups: \n${namesArray.join(
          ', '
        )}`,
        'warning'
      );
    }

    let html = this.form.outerHTML;
    html = html.replace(/ onclick\=\"(.*?)\"/gim, '');
    html = html.replace(
      /<div data-lastpass-icon-root=""(.*?)>\<\/div\>/gim,
      ''
    );
    html = html
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .join('\n');

    if (typeof html_beautify === 'function') {
      html = html_beautify(html, { indent_size: 2, wrap_line_length: 80 });
    }

    html = messageText + html;
    this.code.value = html;
    this.codeContainer.classList.remove('hidden');
  },

  copyCode: function () {
    const codeText = this.code.value;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          this.showToast('Code copied to clipboard!', 'success');
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
          this.showToast('Failed to copy. Please try again.', 'error');
        });
    } else {
      this.code.select();
      document.execCommand('copy');
      this.showToast('Code copied successfully!', 'success');
    }
  },

  showToast: function (message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2500);
  },
};

window.app = app;

document.addEventListener('DOMContentLoaded', () => {
  app.form = document.getElementById('form');
  app.basicOptions = document.getElementById('basic-options');
  app.advancedOptions = document.getElementById('advanced-options');
  app.startText = document.querySelector('.start-text');
  app.codeContainer = document.querySelector('.code-container');
  app.code = document.getElementById('code');

  document
    .getElementById('theme-checkbox')
    .addEventListener('click', () => app.toggleTheme());
  document
    .getElementById('method')
    .addEventListener('change', (event) => app.formMethodUpdate(event));
  document
    .getElementById('url')
    .addEventListener('keyup', (event) => app.formActionUpdate(event));
  document
    .getElementById('generate-html')
    .addEventListener('click', () => app.generateHTML());
  document
    .getElementById('copy-code-btn')
    .addEventListener('click', () => app.copyCode());
  app.form.addEventListener('click', (event) => app.select(event));

  tippy('[data-tippy-content]', {
    allowHTML: true,
    placement: 'top',
    theme: 'light-border',
    interactive: true,
    onTrigger(instance) {
      if (instance.reference.disabled) {
        instance.reference.removeAttribute('disabled');
      }
    },
  });

  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeCheckbox = document.getElementById('theme-checkbox');
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    themeCheckbox.checked = true;
  } else {
    document.body.classList.remove('dark-theme');
    themeCheckbox.checked = false;
  }
});
