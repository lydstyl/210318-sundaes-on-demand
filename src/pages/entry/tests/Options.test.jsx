import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("Displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images anytime ascyn we use await and find by
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTexts = scoopImages.map((img) => img.alt);

  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
