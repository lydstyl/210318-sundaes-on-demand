import { render, screen } from "@testing-library/react";
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
  render(<SummaryForm />);

  const popoverText = /no ice cream will actually be delivered/i;

  // popover starts out hidden
  const nullPopover = screen.queryByText(popoverText);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(popoverText);
  expect(popover).toBeInTheDocument();
  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  const nullPopoverAgain = screen.queryByText(popoverText);
  expect(nullPopoverAgain).not.toBeInTheDocument();
});
