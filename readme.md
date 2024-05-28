# Popup Component for React

A versatile and reusable React component for displaying contextual information or actions triggered by user interactions, such as clicks or hovers. This component is ideal for tooltips, dropdowns, and other similar UI patterns.

## Components

The `Popup` module includes three main components:

1. **Popup**: The main container that manages visibility and positioning.
2. **PopupContent**: The content container that adjusts its position based on available space and user-defined preferences.
3. **PopupHandle**: The trigger element that initiates the popup display.

 
# Usage
## Popup Component
## Props
## action (optional): 
Specifies the trigger action ('click' or 'hover'). Default is 'hover'.
## children: 
A ReactNode or a function that returns a ReactNode. If a function, it receives an object with a close method to programmatically close the popup.
className (optional): Additional CSS classes for custom styling.
Example

```
import { Popup, PopupContent, PopupHandle } from '@your-org/popup-component';

function App() {
  return (
    <div className="app">
      <Popup action="click" className="custom-popup">
        {({ close }) => (
          <>
            <PopupHandle>
              <button>Click Me</button>
            </PopupHandle>
            <PopupContent position="below">
              <div>
                <p>This is the popup content.</p>
                <button onClick={close}>Close</button>
              </div>
            </PopupContent>
          </>
        )}
      </Popup>
    </div>
  );
}

export default App;
```

## PopupContent Component
## Props
## position (optional): 
Defines the preferred position ('above' or 'below') of the content relative to the handle.
children: The content to be displayed inside the popup.

### Example
```
<PopupContent position="below">
  <div>
    <p>This is dynamically positioned content.</p>
  </div>
</PopupContent>
```

## PopupHandle Component
## Props
### children: The interactive element (e.g., button) that triggers the popup.
#### Example
```
<PopupHandle>
  <button>Hover or Click Me</button>
</PopupHandle>


<PopupHandle>
  <button>Hover or Click Me</button>
</PopupHandle>
```

# Technical Considerations
### Dynamic Positioning: 
The component ensures the popup content stays within the viewport by calculating the optimal left position based on the handle's position and the content's width.
### Event Handling: 
The component distinguishes between click and hover actions using conditional event handlers, ensuring appropriate behavior for different interaction types.
### Focus Management: 
By handling onBlur and onFocus events, the popup remains open when interacting with its children, enhancing accessibility and user experience.

# Contributing
We welcome contributions to improve this component. Please open an issue or submit a pull request on GitHub.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

 