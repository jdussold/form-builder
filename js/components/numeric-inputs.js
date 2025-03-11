// Input types: number, range, date, datetime-local, month, time, week

// prettier-ignore
components.numericInputOptions = function ({
  name = '',
  label = '',
  min = '',
  max = '',
  step = '',
  required = false,
  type = 'number',
} = {}) {
  return `
    ${components.typeDropdown(type)}
    
    <label for="name">Name</label>
    <input type="text" placeholder="Name" id="name" value="${name}" onkeyup="app.formInputNameUpdate(event)">
    
    <label for="label">Label</label>
    <input type="text" id="label" placeholder="Label" value="${label}" onkeyup="app.formInputLabelUpdate(event)">
    
    <label for="min">Min</label>
    <input type="number" id="min" value="${min}" onkeyup="app.formInputMinUpdate(event)">

    <label for="max">Max</label>
    <input type="number" id="max" value="${max}" onkeyup="app.formInputMaxUpdate(event)">

    <label for="step">Step</label>
    <input type="number" id="step" value="${step || 1}" onkeyup="app.formInputStepUpdate(event)">

    <label for="required">Required</label>
    <input type="checkbox" id="required" ${ required ? 'checked' : '' } onchange="app.formInputRequiredUpdate(event)">
  `;
};

// prettier-ignore
components.numericInput = function ({ min = '', max = '', step = '', required = false } = {}) {
  return `
    <div class="form-item">
      <label for=""></label>
      <input name="" type="number" ${min ? `min="${min}"` : ''} ${max ? `max="${max}"` : ''} ${step ? `step="${step}"` : ''} ${required ? 'required' : ''}>
    </div>
  `;
};
