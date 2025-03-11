// prettier-ignore
components.textInputOptions = function ({
  name = '',
  label = '',
  placeholder = '',
  required = false,
  type = 'text',
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
  `;
};

// prettier-ignore
components.textInput = function ({ placeholder = '', required = false } = {}) {
  return `
    <div class="form-item">
      <label for=""></label>
      <input name="" type="text" ${placeholder ? `placeholder="${placeholder}"` : ''} ${required ? 'required' : ''}>
    </div>
  `;
};
