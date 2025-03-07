# Form Builder

A lightweight, web-based form builder that allows you to visually create HTML forms with ease. This app is built using HTML, CSS, and JavaScript, and provides a user-friendly interface to add, customize, and rearrange form elements. The generated HTML code is beautified and can be copied to your clipboard for easy integration into your projects.

## Live Demo

Check out the live app here: [Form Builder Live Demo](https://jdussold.github.io/form-builder/)

## Features

- **Visual Form Creation:** Add form rows and input groups with just a click.
- **Multiple Input Types:** Choose from text, email, password, checkboxes, radio buttons, select dropdowns, date/time inputs, file uploads, and more.
- **Live HTML Code Generation:** Generate and preview the HTML code for your form.
- **Theme Toggle:** Switch between light and dark themes.
- **Code Beautification:** The generated HTML is automatically formatted for readability.
- **Copy-to-Clipboard:** Easily copy the generated code with a single button click.

> _Note: The current design is inspired by Astro's design elements as showcased on Figma (licensed under CC BY 4.0)._

## Installation

1. **Clone or Download the Repository:**  
   Download the source code or clone the repository to your local machine.

2. **Open the Application:**  
   Open the `index.html` file in your preferred web browser, or serve it via a local web server.

3. **Start Building:**  
   Use the on-screen buttons and options to begin constructing your form.

## Usage

1. **Adding Form Elements:**

   - Click the "Add InputGroup" buttons to create new form rows.
   - Use the provided options to add various input types to each row.

2. **Customizing Inputs:**

   - Click on an input element to reveal its settings.
   - Update the label, placeholder, name attribute, and input type using the sidebar options.

3. **Reordering Elements:**

   - Move elements up or down using the provided arrow buttons.
   - _Future enhancement:_ Implement drag and drop for a smoother experience.

4. **Generating HTML:**

   - Click the "Generate HTML" button to create a clean, formatted version of your form's HTML.
   - Use the copy button to quickly copy the generated code to your clipboard.

5. **Theme Toggle:**
   - Click the sun/moon icon to switch between light and dark themes.

## File Structure

- **HTML:** Contains the base layout of the form builder and references to external assets.
- **CSS:** Provides styling for the light and dark themes, layout, and interactive elements.
- **JavaScript:** Powers the dynamic behavior of the app, including element manipulation, event handling, and code generation.

## Screenshots

![Form Builder Interface](./assets/img/form-builder-main-interface.png)

![Form Builder Code Generation View](./assets/img/form-builder-code-generation-view.png)

![Light Mode Theme](./assets/img/light-mode.png)

![Dark Mode Theme](./assets/img/dark-mode.png)

## Future Updates / To-Do

- **Save and Resume:**  
  Implement functionality to save the current form state and resume building later.
- **Enhanced Options for Multi-Option Fields:**  
  Add a paragraph element to multi-option fields such as checkboxes and radio buttons.
- **Drag and Drop Functionality:**  
  Upgrade the current move up/down buttons to a full drag and drop experience for reordering form elements.
- **Preview Functionality:**  
  Provide a live preview mode to see how the form will look when rendered.
- **Export CSS Classes:**  
  Allow exporting of assigned CSS classes for further customization in external stylesheets.
- **Export Form "Name" Attributes:**  
  Enable exporting the form's name attributes to improve integration with backend systems.
- **Additional Enhancements:**
  - Accessibility improvements (keyboard navigation, ARIA attributes)
  - Expanded input type support and customization options
  - Mobile responsiveness and performance optimizations
  - Integration with backend APIs for form submission and data handling

## Acknowledgments

- Design inspiration by [Astro](https://www.figma.com/community/file/1157371532469023309) (CC BY 4.0).
