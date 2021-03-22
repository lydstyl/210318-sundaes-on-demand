import { render, screen, fireEvent } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";

const termsCheckboxName = /Terms and Conditions/i;
const buttonName = /confirm order/i;

it("Checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: termsCheckboxName });
  const button = screen.getByRole("button", { name: buttonName });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
it("Checking checkbox enables button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: termsCheckboxName });
  const button = screen.getByRole("button", { name: buttonName });

  userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();
});
it("Unchecking checkbox again disables button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: termsCheckboxName });
  const button = screen.getByRole("button", { name: buttonName });

  userEvent.click(checkbox);
  userEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});
it("Popover responds to hover", () => {
  // popover starts out hidden
  // popover appears upon mouseover of checkbox label
  // popover disappears when we mous out
});
