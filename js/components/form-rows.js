components.addFormRows = function () {
  return `
    <h3>Form</h3>
    <button onclick="app.formAddRow('1')">Add Row (1 col)</button>
    <button onclick="app.formAddRow('2')">Add Row (2 col)</button>
    <button onclick="app.formAddRow('3')">Add Row (3 col)</button>
    <button onclick="app.formAddRow('4')">Add Row (4 col)</button>
  `;
};

components.formRowInputOptions = function () {
  return `
    <h3>Inputs:</h3>
    <button onclick="app.formRowAddInput('input')">Add Input</button>
    <button onclick="app.formRowMoveUp()"><i class="fa-solid fa-arrow-up fa-icon"></i></button>
    <button onclick="app.formRowMoveDown()"><i class="fa-solid fa-arrow-down fa-icon"></i></button>
    <button class="delete-btn" onclick="app.formRowDelete()"><i class="fa-solid fa-trash-can fa-icon"></i></button>
  `;
};
