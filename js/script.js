let app = {
  selected: null,
  form: document.querySelector('#form'),
  basicOptions: document.querySelector('#basic-options'),
  advancedOptions: document.querySelector('#advanced-options'),
  startText: document.querySelector('.start-text'),
  codeContainer: document.querySelector('.code-container'),
  code: document.querySelector('#code'),
  formOptionsHTML: `
        <h3>Form</h3>
        <button onclick="app.formAddInputGroup('1')">Add InputGroup (1 col)</button>
        <button onclick="app.formAddInputGroup('2')">Add InputGroup (2 col)</button>
        <button onclick="app.formAddInputGroup('3')">Add InputGroup (3 col)</button>
        <button onclick="app.formAddInputGroup('4')">Add InputGroup (4 col)</button>
      `,

  getInputOptionsHTML: function () {
    let label = this.selected.querySelector('label')
      ? this.selected.querySelector('label').innerText
      : '';
    let inputEl = this.selected.querySelector('input');
    let type = inputEl ? inputEl.type : 'text';
    let placeholder = inputEl ? inputEl.placeholder : '';
    let name = inputEl ? inputEl.name : '';
    let required = inputEl ? inputEl.required : false;

    if (
      type === 'text' ||
      type === 'password' ||
      type === 'search' ||
      type === 'tel' ||
      type === 'url'
    ) {
      return components.textInputOptions({
        type,
        name,
        label,
        placeholder,
        required,
      });
    } else if (type === 'radio' || type === 'checkbox') {
      return components.radioCheckboxInputOptions({
        type,
        name,
        label,
        required,
      });
    } else if (['file', 'color'].includes(type)) {
      return components.fileMediaInputOptions({
        type,
        name,
        label,
        required,
      });
    } else if (
      [
        'number',
        'range',
        'date',
        'datetime-local',
        'month',
        'time',
        'week',
      ].includes(type)
    ) {
      let min = inputEl ? inputEl.min : '';
      let max = inputEl ? inputEl.max : '';
      let step = inputEl ? inputEl.step : '';

      return components.numericInputOptions({
        type,
        name,
        label,
        min,
        max,
        step,
        required,
      });
    }

    // TODO: Add more input types here

    // Fallback to text input
    return components.textInputOptions({
      type,
      name,
      label,
      placeholder,
      required,
    });
  },

  select: function (event) {
    this.selected = event.target;
    // Remove the 'selected' class from all elements
    this.code.classList.remove('selected');
    this.form.classList.remove('selected');
    this.form.querySelectorAll('.selected').forEach((element) => {
      element.classList.remove('selected');
    });
    event.target.classList.add('selected');
    console.log(event.target);

    // Update options based on the target's class
    if (event.target.classList.contains('form')) {
      this.basicOptions.classList.remove('hidden');
      this.advancedOptions.classList.add('hidden');
      this.basicOptions.innerHTML = this.formOptionsHTML;
    } else if (event.target.classList.contains('start-text')) {
      this.basicOptions.classList.remove('hidden');
      this.selected.innerHTML = `<div class="start-text pointer-disabled" onclick="app.select(event)">Use the buttons above to add form elements</div>`;
      this.basicOptions.innerHTML = this.formOptionsHTML;
      this.form.click();
    } else if (event.target.classList.contains('form-row')) {
      this.advancedOptions.classList.add('hidden');
      this.basicOptions.innerHTML = `
        <h3>Inputs:</h3>
        <button onclick="app.formInputGroupAddInput('input')">Add Input</button>
        <button onclick="app.formInputGroupMoveUp()"><i class="fa-solid fa-arrow-up fa-icon"></i></button>
        <button onclick="app.formInputGroupMoveDown()"><i class="fa-solid fa-arrow-down fa-icon"></i></button>
        <button class="delete-btn" onclick="app.formInputGroupDelete()"><i class="fa-solid fa-trash-can fa-icon"></i></button>
      `;
    } else if (
      event.target.classList.contains('form-item') &&
      event.target.querySelector('input').type !== 'radio' &&
      event.target.querySelector('input').type !== 'checkbox'
    ) {
      // Set basic options
      this.basicOptions.innerHTML = this.getInputOptionsHTML();

      // For text-based inputs, show the advanced options
      let input = event.target.querySelector('input');
      let inputType = input.type;
      if (['text', 'password', 'search', 'tel', 'url'].includes(inputType)) {
        // Extract current attribute values
        let minlength = input.getAttribute('minlength') || '';
        let maxlength = input.getAttribute('maxlength') || '';
        let pattern = input.getAttribute('pattern') || '';
        let readonly = input.hasAttribute('readonly');
        let disabled = input.hasAttribute('disabled');

        // Pass these values to the advanced options panel
        this.advancedOptions.innerHTML = components.textInputsOptionsPanel({
          minlength,
          maxlength,
          pattern,
          readonly,
          disabled,
        });
        this.advancedOptions.classList.remove('hidden');
      } else {
        this.advancedOptions.classList.add('hidden');
      }

      // If an advanced prompt element exists, update it.
      const promptInput = document.getElementById('prompt');
      const promptEl = event.target.querySelector('.option-prompt');
      if (promptInput && promptEl) {
        promptInput.value = promptEl.innerText;
      }
    } else if (
      event.target.classList.contains('form-item') &&
      (event.target.querySelector('input').type === 'radio' ||
        event.target.querySelector('input').type === 'checkbox')
    ) {
      this.advancedOptions.classList.remove('hidden');
      this.basicOptions.innerHTML = this.getInputOptionsHTML();
      this.advancedOptions.querySelector('#radioName').disabled = true;
      this.advancedOptions.querySelector('#radioLabel').disabled = true;

      // Disable the "Type" dropdown if a .option is selected
      let typeDropdown = document.getElementById('type');
      if (this.selected.classList.contains('option')) {
        typeDropdown.disabled = true;
        this.advancedOptions.querySelector('#radioName').disabled = false;
        this.advancedOptions.querySelector('#radioLabel').disabled = false;
      } else {
        typeDropdown.disabled = false;
      }

      // Disable the "Add Option" button if a .option is selected
      let addOptionBtn = this.advancedOptions.querySelector('.add-option-btn');
      if (event.target.classList.contains('option')) {
        addOptionBtn.disabled = true;
      } else {
        addOptionBtn.disabled = false;
      }

      if (this.selected.classList.contains('option')) {
        document.getElementById('prompt').disabled = true;
      } else {
        document.getElementById('prompt').disabled = false;
        document.getElementById('prompt').value =
          this.selected.querySelector('.option-prompt').innerText;
        document.getElementById('prompt').placeholder = 'Enter prompt/question';
      }
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

  formAddInputGroup: function (cols) {
    // Remove the start text if it exists.
    if (this.startText) {
      this.startText.remove();
    }
    this.form.innerHTML += `
      <div class="form-row form-col-${cols}" onclick="app.select(event)"></div>
    `;
  },

  formInputGroupMoveDown: function () {
    let parentElement = this.selected.parentElement;
    let nextElement = this.selected.nextElementSibling;
    if (nextElement) {
      parentElement.insertBefore(nextElement, this.selected);
    }
  },

  formInputGroupMoveUp: function () {
    let parentElement = this.selected.parentElement;
    let previousElement = this.selected.previousElementSibling;
    if (previousElement) {
      parentElement.insertBefore(this.selected, previousElement);
    }
  },

  formInputGroupDelete: function () {
    this.selected.remove();
    if (this.form.children.length === 0) {
      this.form.innerHTML = `<div class="start-text pointer-disabled" onclick="app.select(event)">Use the buttons above to add form elements</div>`;
      this.form.click(); // triggers app.select(event)
    }
  },

  formInputGroupAddInput: function () {
    this.selected.innerHTML += `
      <div class="form-item">
        <label for=""></label>
        <input name="" type="text" placeholder="">
      </div>
    `;
  },

  formInputTypeUpdate: function (event) {
    let newType = event.target.value;
    if (newType === 'radio' || newType === 'checkbox') {
      this.selected.innerHTML = components.radioCheckboxInput({
        inputType: newType,
        optionValue: 'Option 1',
        optionId: 'option1',
      });

      this.advancedOptions.innerHTML = components.radioCheckboxOptionsPanel({
        name: this.selected.querySelector('input').name || '',
        label: this.selected.querySelector('label').innerText || '',
      });
      this.advancedOptions.classList.remove('hidden');

      let addOptionBtn = this.advancedOptions.querySelector('.add-option-btn');
      if (addOptionBtn) {
        addOptionBtn.disabled = false;
      }
      this.advancedOptions.querySelector('#prompt').value = `Prompt/Question`;
      this.selected.click();
    } else if (['file', 'color'].includes(newType)) {
      this.selected.innerHTML = components.fileMediaInput({
        type: newType,
        required: false,
      });
      this.advancedOptions.classList.add('hidden');
    } else if (
      [
        'number',
        'range',
        'date',
        'datetime-local',
        'month',
        'time',
        'week',
      ].includes(newType)
    ) {
      this.selected.innerHTML = components.numericInput({
        type: newType,
        required: false,
      });
      this.advancedOptions.classList.add('hidden');
    } else {
      // For text-based inputs, update the input and ensure the advanced options panel is shown
      this.selected.innerHTML = components.textInput({
        type: newType,
        required: false,
      });
      // Display the advanced options for text-based inputs
      if (['text', 'password', 'search', 'tel', 'url'].includes(newType)) {
        this.advancedOptions.innerHTML = components.textInputsOptionsPanel();
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

  // Update the label text and the "for" and "id" attributes
  formInputLabelUpdate: function (event) {
    let labelEl = this.selected.querySelector('label');
    let inputValue = event.target.value.trim();
    labelEl.innerText = inputValue;
    let forAttribute = inputValue.toLowerCase().replace(/\s/g, '-');
    labelEl.setAttribute('for', forAttribute);

    let inputEl = this.selected.querySelector('input');
    inputEl.setAttribute('id', forAttribute);
  },

  formInputMinUpdate: function (event) {
    this.selected.querySelector('input').min = event.target.value;
  },

  formInputMaxUpdate: function (event) {
    this.selected.querySelector('input').max = event.target.value;
  },

  formInputPlaceholderUpdate: function (event) {
    this.selected.querySelector('input').placeholder = event.target.value;
  },

  formInputRequiredUpdate: function (event) {
    this.selected.querySelector('input').required = event.target.checked;
  },

  formInputStepUpdate: function (event) {
    this.selected.querySelector('input').step = event.target.value;
  },

  formInputMinlengthUpdate: function (event) {
    this.selected
      .querySelector('input')
      .setAttribute('minlength', event.target.value);
  },

  formInputMaxlengthUpdate: function (event) {
    this.selected
      .querySelector('input')
      .setAttribute('maxlength', event.target.value);
  },

  formInputPatternUpdate: function (event) {
    this.selected
      .querySelector('input')
      .setAttribute('pattern', event.target.value);
  },

  formInputReadonlyUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.checked) {
      input.setAttribute('readonly', true);
    } else {
      input.removeAttribute('readonly');
    }
  },

  formInputDisabledUpdate: function (event) {
    let input = this.selected.querySelector('input');
    if (event.target.checked) {
      input.setAttribute('disabled', true);
    } else {
      input.removeAttribute('disabled');
    }
  },

  formInputUp: function () {
    let parentElement = this.selected.parentElement;
    let previousElement = this.selected.previousElementSibling;
    if (previousElement) {
      parentElement.insertBefore(this.selected, previousElement);
    }
  },

  formInputDown: function () {
    let parentElement = this.selected.parentElement;
    let nextElement = this.selected.nextElementSibling;
    if (nextElement) {
      parentElement.insertBefore(nextElement, this.selected);
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
    if (!inputEl) return; // Exit if there's no input to determine type

    let inputType = inputEl.type;
    let optionNumber = optionCount + 1;
    let optionValue = `Option ${optionNumber}`;

    let newOptionHTML = `    
      <div class="form-item option">
        <input name="" type="${inputType}" value="${optionValue}" id="option${optionNumber}">
        <label for="option${optionNumber}">${optionValue}</label>
      </div>
    `;

    optionsContainer.innerHTML += newOptionHTML;
  },

  formOptionAddPrompt: function (event) {
    this.selected.querySelector('.option-prompt').innerText =
      event.target.value;
  },

  formOptionMoveUp: function () {
    let parentElement = this.selected.parentElement;
    let previousElement = this.selected.previousElementSibling;
    if (previousElement) {
      parentElement.insertBefore(this.selected, previousElement);
    }
  },

  formOptionMoveDown: function () {
    let parentElement = this.selected.parentElement;
    let nextElement = this.selected.nextElementSibling;
    if (nextElement) {
      parentElement.insertBefore(nextElement, this.selected);
    }
  },

  formInputRemoveOption: function () {
    let option = this.selected;
    option.remove();
  },

  generateHTML: function () {
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

document.addEventListener('DOMContentLoaded', () => {
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
