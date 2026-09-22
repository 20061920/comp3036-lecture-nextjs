import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

 test.beforeAll(async () => {
   await seed();
 });

test.describe("Categories Page", () => {
  test(
    "Renders list of categories",
    {
      tag: "@pages",
    },
    async ({ page }) => {
      await page.goto("/categories");

      await expect(await page.getByText("Node")).toBeVisible();
      await expect(await page.getByText("React")).toBeVisible();
      await expect(await page.getByText("Blog")).toBeVisible();
    },
  );
  test("clicking a category navigates to its page", async ({ page }) => {
    await page.goto("/categories");
    const first = page.locator("ul li a").first();
    const name = await first.textContent();
    await first.click();

    await expect(page).toHaveURL(/\/category\//);
    await expect(
      page.getByRole("heading", { name: new RegExp(name ?? "", "i") })
    ).toBeVisible();
  });
});
