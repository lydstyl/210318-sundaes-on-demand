import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
// import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("Displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images. Anytime ascync we use await and find by
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTexts = scoopImages.map((img) => img.alt);

  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

it("Displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  const altTexts = toppingImages.map((img) => img.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
