// Input types: password, search, tel, text, url

// renders the basic options panel
// prettier-ignore
components.textInputOptions = function ({
  type = 'text',
  name = '',
  label = '',
  placeholder = '',
  required = false,
} = {}) {
  return `
    ${components.typeDropdown(type)}
    
    <label for="name">Name</label>
    <input type="text" placeholder="Name" id="name" value="${name}" onkeyup="app.formInputNameUpdate(event)">
    
    <label for="label">Label</label>
    <input type="text" id="label" placeholder="Label" value="${label}" onkeyup="app.formInputLabelUpdate(event)">
    
    <label for="placeholder">Placeholder</label>
    <input type="text" id="placeholder" placeholder="Placeholder" value="${placeholder}" onkeyup="app.formInputPlaceholderUpdate(event)">

    <label for="required">Required</label>
    <input type="checkbox" id="required" ${ required ? 'checked' : '' } onchange="app.formInputRequiredUpdate(event)">

    ${components.actionButtons()}
  `;
};

// Updates the innerHTML of the form-item input element
// prettier-ignore
components.textInput = function ({ type = 'text', placeholder = '', required = false } = {}) {
  return `
    <label for=""></label>
    <input name="" type="${type}" ${placeholder ? `placeholder="${placeholder}"` : ''} ${required ? 'required' : ''}>
  `;
};

// renders the advanced options panel
// prettier-ignore
components.textInputsAdvancedOptions = function ({
  minlength = '',
  maxlength = '',
  pattern = '',
  readonly = false,
  disabled = false,
} = {}) {
  return `
    <div class="options-header">
      <h3>Advanced:</h3>
    </div>
    
    <label for="minlength">Min Length</label>
    <input type="number" id="minlength" value="${minlength}" onkeyup="app.formInputMinlengthUpdate(event)">

    <label for="maxlength">Max Length</label>
    <input type="number" id="maxlength" value="${maxlength}" onkeyup="app.formInputMaxlengthUpdate(event)">    
    
    <label for="pattern">Pattern</label>
    <input type="text" id="pattern" placeholder="Pattern" value="${pattern}" onkeyup="app.formInputPatternUpdate(event)">

    <label for="readonly">Readonly</label>
    <input type="checkbox" id="readonly" ${readonly ? 'checked' : ''} onchange="app.formInputReadonlyUpdate(event)">

    <label for="disabled">Disabled</label>
    <input type="checkbox" id="disabled" ${disabled ? 'checked' : ''} onchange="app.formInputDisabledUpdate(event)">
  `;
};
