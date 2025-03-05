let app = {
  selected: null,
  form: document.querySelector('#form'),
  options: document.querySelector('#options'),
  startText: document.querySelector('.start-text'),
  codeContainer: document.querySelector('.code-container'),
  code: document.querySelector('#code'),

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

    // Update options
    if (event.target.classList.contains('form')) {
      this.options.classList.remove('hidden');
      this.options.innerHTML = `
        <h3>Form</h3>
        <button onclick="app.formAddInputGroup('1')">Add InputGroup (1 col)</button>
        <button onclick="app.formAddInputGroup('2')">Add InputGroup (2 col)</button>
        <button onclick="app.formAddInputGroup('3')">Add InputGroup (3 col)</button>
        <button onclick="app.formAddInputGroup('4')">Add InputGroup (4 col)</button>
      `;
    } else if (event.target.classList.contains('start-text')) {
      this.options.classList.remove('hidden');
      this.selected.innerHTML = `<div class="start-text pointer-disabled" onclick="app.select(event)">Use the buttons above to add form elements</div>`;
      this.options.innerHTML = `
        <h3>Form</h3>
        <button onclick="app.formAddInputGroup('1')">Add InputGroup (1 col)</button>
        <button onclick="app.formAddInputGroup('2')">Add InputGroup (2 col)</button>
        <button onclick="app.formAddInputGroup('3')">Add InputGroup (3 col)</button>
        <button onclick="app.formAddInputGroup('4')">Add InputGroup (4 col)</button>
      `;
      this.form.click();
    } else if (event.target.classList.contains('form-row')) {
      this.options.innerHTML = `
        <h3>Row</h3>
        <button onclick="app.formInputGroupAddInput('input')">Add Input</button>
        <button onclick="app.formInputGroupMoveUp()"><i class="fa-solid fa-chevron-up fa-icon"></i></button>
        <button onclick="app.formInputGroupMoveDown()"><i class="fa-solid fa-chevron-down fa-icon"></i></button>
        <button onclick="app.formInputGroupDelete()"><i class="fa-solid fa-trash-can fa-icon"></i></button>
      `;
    } else if (event.target.classList.contains('form-item')) {
      let label = this.selected.querySelector('label').innerText;
      let type = this.selected.querySelector('input').type;
      let placeholder = this.selected.querySelector('input').placeholder;
      // prettier-ignore
      this.options.innerHTML = `
        <h3>Input</h3>
        <label for="label">Label</label>
        <input type="text" placeholder="Label" id="label" value="${label}" onkeyup="app.formInputLabelUpdate(event)">

        <label for="placeholder">Placeholder</label>
        <input type="text" placeholder="Placeholder" id="placeholder" value="${placeholder}" onkeyup="app.formInputPlaceholderUpdate(event)">

        <label for="type">Type</label>
        <select id="type" onchange="app.formInputTypeUpdate(event)">
            <!-- Common Text Inputs -->
            <option value="text" ${type === 'text' ? 'selected' : ''}>Text</option>
            <option value="email" ${type === 'email' ? 'selected' : ''}>Email</option>
            <option value="password" ${type === 'password' ? 'selected' : ''}>Password</option>
            <option value="number" ${type === 'number' ? 'selected' : ''}>Number</option>

            <!-- Selection Controls -->
            <option value="checkbox" ${type === 'checkbox' ? 'selected' : ''}>Checkbox</option>
            <option value="radio" ${type === 'radio' ? 'selected' : ''}>Radio</option>
            <option value="select" ${type === 'select' ? 'selected' : ''}>Select Dropdown</option>
            <option value="textarea" ${type === 'textarea' ? 'selected' : ''}>Textarea</option>

            <!-- Date & Time Inputs -->
            <option value="date" ${type === 'date' ? 'selected' : ''}>Date</option>
            <option value="time" ${type === 'time' ? 'selected' : ''}>Time</option>
            <option value="datetime-local" ${type === 'datetime-local' ? 'selected' : ''}>Datetime-local</option>
            <option value="month" ${type === 'month' ? 'selected' : ''}>Month</option>
            <option value="week" ${type === 'week' ? 'selected' : ''}>Week</option>

            <!-- File & URL Inputs -->
            <option value="file" ${type === 'file' ? 'selected' : ''}>File Upload</option>
            <option value="url" ${type === 'url' ? 'selected' : ''}>URL</option>
            <option value="tel" ${type === 'tel' ? 'selected' : ''}>Phone Number</option>

            <!-- Special Inputs -->
            <option value="search" ${type === 'search' ? 'selected' : ''}>Search</option>
            <option value="color" ${type === 'color' ? 'selected' : ''}>Color Picker</option>
            <option value="range" ${type === 'range' ? 'selected' : ''}>Range Slider</option>

            <!-- Buttons & Actions -->
            <option value="submit" ${type === 'submit' ? 'selected' : ''}>Submit Button</option>
            <option value="reset" ${type === 'reset' ? 'selected' : ''}>Reset Button</option>
            <option value="button" ${type === 'button' ? 'selected' : ''}>Button</option>

            <!-- Hidden Fields -->
            <option value="hidden" ${type === 'hidden' ? 'selected' : ''}>Hidden Field</option>
        </select>

        <button onclick="app.formInputUp()"><i class="fa-solid fa-chevron-up fa-icon"></i></button>
        <button onclick="app.formInputDown()"><i class="fa-solid fa-chevron-down fa-icon"></i></button>
        <button class="delete-btn" onclick="app.formInputDelete()"><i class="fa-solid fa-trash-can fa-icon"></i></button>
      `;
    }
  },

  toggleTheme: function () {
    let themeIcon = document.querySelector('#theme-toggle i');
    let body = document.body;

    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
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
    // prettier-ignore
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
      this.form.innerHTML = `<div class="start-text pointer-disabled" onclick="app.select(event)">Use the buttons above to add form elements
      </div>`;
      this.form.click(); // triggers app.select(event)
    }
  },
  formInputGroupAddInput: function () {
    // If type is left blank it will default to text, thus the default value is set to text to prevent cases where the value is undefined when the user doesn't select a type.
    // prettier-ignore
    this.selected.innerHTML += `
      <div class="form-item"><label for=""></label><input name="" type="text"></div>
    `;
  },
  formInputLabelUpdate: function (event) {
    this.selected.querySelector('label').innerText = event.target.value;
  },
  formInputPlaceholderUpdate: function (event) {
    this.selected.querySelector('input').placeholder = event.target.value;
  },
  formInputTypeUpdate: function (event) {
    this.selected.querySelector('input').type = event.target.value;
  },
  formInputDown: function () {
    let parentElement = this.selected.parentElement;
    let nextElement = this.selected.nextElementSibling;
    if (nextElement) {
      parentElement.insertBefore(nextElement, this.selected);
    }
  },
  formInputUp: function () {
    let parentElement = this.selected.parentElement;
    let previousElement = this.selected.previousElementSibling;
    if (previousElement) {
      parentElement.insertBefore(this.selected, previousElement);
    }
  },
  formInputDelete: function () {
    let target = this.selected.parentElement;
    this.selected.remove();
    target.click();
  },
  generateHTML: function () {
    let html = this.form.outerHTML;
    html = html.replace(/ onclick\=\"(.*?)\"/gim, '');
    html = html.replace(
      /<div data-lastpass-icon-root=""(.*?)>\<\/div\>/gim,
      ''
    );
    // Remove extra blank lines
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
      // Fallback for older browsers
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

    // Remove toast after animation
    setTimeout(() => {
      toast.remove();
    }, 2500);
  },
};
