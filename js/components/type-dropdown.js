import components from './components.js';

// prettier-ignore
components.typeDropdown = function(selectedType = 'text', disabled = false) {
  return `
    <div class="options-header">
      <h3>Inputs:</h3>
    </div>
    <label for="type">Type</label>
    <span class="tooltip-wrapper" ${ disabled ? 'data-tippy-content="You cannot change the type when an option is selected."' : '' }>
      <select id="type" onchange="app.formInputTypeUpdate(event)" ${disabled ? 'disabled' : ''}>
        <optgroup label="Common Text Inputs">
          <option value="text" ${selectedType === 'text' ? 'selected' : ''}>Text</option>
          <option value="email" ${selectedType === 'email' ? 'selected' : ''}>Email</option>
          <option value="password" ${selectedType === 'password' ? 'selected' : ''}>Password</option>
          <option value="number" ${selectedType === 'number' ? 'selected' : ''}>Number</option>
        </optgroup>
        <optgroup label="Selection Controls">
          <option value="checkbox" ${selectedType === 'checkbox' ? 'selected' : ''}>Checkbox</option>
          <option value="radio" ${selectedType === 'radio' ? 'selected' : ''}>Radio</option>
          <option value="select" ${selectedType === 'select' ? 'selected' : ''}>Select Dropdown</option>
          <option value="textarea" ${selectedType === 'textarea' ? 'selected' : ''}>Textarea</option>
        </optgroup>
        <optgroup label="Date & Time Inputs">
          <option value="date" ${selectedType === 'date' ? 'selected' : ''}>Date</option>
          <option value="time" ${selectedType === 'time' ? 'selected' : ''}>Time</option>
          <option value="datetime-local" ${selectedType === 'datetime-local' ? 'selected' : ''}>Datetime-local</option>
          <option value="month" ${selectedType === 'month' ? 'selected' : ''}>Month</option>
          <option value="week" ${selectedType === 'week' ? 'selected' : ''}>Week</option>
        </optgroup>
        <optgroup label="File & URL Inputs">
          <option value="file" ${selectedType === 'file' ? 'selected' : ''}>File Upload</option>
          <option value="url" ${selectedType === 'url' ? 'selected' : ''}>URL</option>
          <option value="tel" ${selectedType === 'tel' ? 'selected' : ''}>Phone Number</option>
        </optgroup>
        <optgroup label="Special Inputs">
          <option value="search" ${selectedType === 'search' ? 'selected' : ''}>Search</option>
          <option value="color" ${selectedType === 'color' ? 'selected' : ''}>Color Picker</option>
          <option value="range" ${selectedType === 'range' ? 'selected' : ''}>Range Slider</option>
        </optgroup>
        <optgroup label="Buttons & Actions">
          <option value="submit" ${selectedType === 'submit' ? 'selected' : ''}>Submit Button</option>
          <option value="reset" ${selectedType === 'reset' ? 'selected' : ''}>Reset Button</option>
          <option value="button" ${selectedType === 'button' ? 'selected' : ''}>Button</option>
          <option value="image" ${selectedType === 'image' ? 'selected' : ''}>Image Button</option>
        </optgroup>
        <optgroup label="Hidden Fields">
          <option value="hidden" ${selectedType === 'hidden' ? 'selected' : ''}>Hidden Field</option>
        </optgroup>
      </select>
    </span>
  `;
}

export default components;
