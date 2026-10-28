import { Locator, Page, expect } from "@playwright/test";
import "dotenv/config";

export class ProductCartPage {
  private readonly headItems: Locator;
  private readonly productCard: Locator;
  private readonly addtoCartButton: Locator;
  private readonly popupAdded: Locator;
  private readonly viewCartButton: Locator;
  private readonly nameProduct: Locator;
  private readonly priceproduct: Locator;
  private readonly deleteButton: Locator;
  private readonly menTshirtRow: Locator;
  private readonly menTshirtDeleteButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly checkoutPage: Locator;
  private readonly reviewOrder: Locator;
  private readonly deliveryAddress: Locator;
  private readonly placeOrderButton: Locator;
  private readonly paymentPage: Locator;
  private readonly nameCard: Locator;
  private readonly cardNumber: Locator;
  private readonly cvc: Locator;
  private readonly expirationMonth: Locator;
  private readonly expirationYear: Locator;
  private readonly payAndConfirmButton: Locator;
  private readonly confirmationPage: Locator;
  private readonly confirmationMessage: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;


  constructor(private readonly page: Page) {
    this.headItems = page.getByRole('heading', { name: 'Searched Products' });
    this.productCard = page.locator('.product-image-wrapper').filter({has: page.locator('[data-product-id="2"]')}).first();
    this.addtoCartButton = this.productCard.locator('.productinfo a.add-to-cart');
    this.popupAdded = page.getByRole('heading', { name: 'Added!' });
    this.viewCartButton = page.getByRole('link', { name: 'View Cart' });
    this.nameProduct = page.getByRole('link', { name: 'Men Tshirt' });
    this.priceproduct = page.locator('//*[@id="product-2"]/td[3]/p');
    this.deleteButton = page.locator('.cart_quantity_delete');
    this.menTshirtRow = page.locator('#product-2');
    this.menTshirtDeleteButton = this.menTshirtRow.locator('.cart_quantity_delete');
    this.checkoutButton = page.getByText('Proceed To Checkout');
    this.checkoutPage = page.getByText('Checkout', { exact: true });
    this.reviewOrder = page.getByRole('heading', { name: 'Review Your Order' });
    this.deliveryAddress = page.locator('#address_delivery').getByText('Calle 152b # 73-');
    this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    this.paymentPage = page.getByRole('heading', { name: 'Payment' });
    this.nameCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.getByRole('textbox', { name: 'ex.' });
    this.expirationMonth = page.getByRole('textbox', { name: 'MM' });
    this.expirationYear = page.getByRole('textbox', { name: 'YYYY' });
    this.payAndConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' });
    this.confirmationPage = page.getByText('Order Placed!');
    this.confirmationMessage = page.getByText('Congratulations! Your order');
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
    this.searchButton = page.locator('#submit_search');


  }
  async searchProduct(): Promise<void> {
    await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
    await expect(this.searchInput).toBeVisible();

    const closeOverlay = this.page.getByText('Close', { exact: true });
    if (await closeOverlay.isVisible()) {
      await closeOverlay.click();
    }

    await this.searchInput.fill('Tshirt');
    await this.searchButton.click();

  }

  async addCart(): Promise<void> {
    await this.headItems.waitFor();
    await this.addtoCartButton.click();
    await this.popupAdded.waitFor();
    await this.viewCartButton.click();
  }

  async verifyProductInCart(): Promise<void> {
    await expect(this.nameProduct).toBeVisible();
    await expect(this.priceproduct).toBeVisible();
  }

  async clearCart(): Promise<void> {
    await this.page.goto('/view_cart');

    while (await this.deleteButton.count() > 0) {
      const count = await this.deleteButton.count();
      await this.deleteButton.first().click();
      await expect(this.deleteButton).toHaveCount(count - 1);
    }

    await expect(this.deleteButton).toHaveCount(0);
  }

  async deleteProductFromCart(): Promise<void> {
    await this.menTshirtDeleteButton.click();
    await expect(this.menTshirtRow).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.checkoutPage).toBeVisible();
    await expect(this.reviewOrder).toBeVisible();
    await expect(this.deliveryAddress).toBeVisible();
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails(): Promise<void> {
    await expect(this.paymentPage).toBeVisible();
    await this.nameCard.fill('Eduard David');
    await this.cardNumber.fill('1234 5678 9012 3456');
    await this.cvc.fill('123');
    await this.expirationMonth.fill('12');
    await this.expirationYear.fill('2025');
    await this.payAndConfirmButton.click();
  }

  async verifyOrderConfirmation(): Promise<void> {
    await expect(this.confirmationPage).toBeVisible();
    await expect(this.confirmationMessage).toBeVisible();
  }

}
