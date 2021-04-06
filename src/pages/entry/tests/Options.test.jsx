import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("Displays image for each scoop option from server", () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTexts = scoopImages.map((img) => img.alt);

  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
