FrontEnd
1) If you need to set a margin for UI element, You should do it "top to bottom and left to right". Please Example:

- right margin between two elements that are on horizontal line
┌────┐ margin 50px ┌────┐
│ #1 │   ====>     │ #2 │
└────┘             └────┘

- bottom margin between two elements that are on vertical line
┌────┐
│ #1 │
└────┘
  ||
  \/
┌────┐
│ #2 │
└────┘

2) When you write forms you need to leave enough space for validation error
3) If you have choice between show form error as tooltip or show as string under the form, you should chose first variant

4) Need to realize how I should implement web application.