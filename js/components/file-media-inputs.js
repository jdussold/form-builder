// Input types: file, color

// prettier-ignore
components.fileMediaInputOptions = function ({
  name = '',
  label = '',
  required = false,
  type = 'file',
} = {}) {
  return `
    ${components.typeDropdown(type)}
    
    <label for="name">Name</label>
    <input type="text" placeholder="Name" id="name" value="${name}" onkeyup="app.formInputNameUpdate(event)">
    
    <label for="label">Label</label>
    <input type="text" id="label" placeholder="Label" value="${label}" onkeyup="app.formInputLabelUpdate(event)">
    
    <label for="required">Required</label>
    <input type="checkbox" id="required" ${ required ? 'checked' : '' } onchange="app.formInputRequiredUpdate(event)">
  `;
}

// prettier-ignore
components.fileMediaInput = function ({ type, required = false } = {}) {
  return `
    <label for=""></label>
    <input name="" type="${type}" ${required ? 'required' : ''}>
  `;
};
