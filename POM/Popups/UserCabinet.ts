import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';
import { UserCabineMenuItems } from '@interfaces/userCabinetTypes';

export class UserCabinet extends BasePage {
  private userAvatar: Locator;
  private accountMenu: Locator;
  readonly settingsEmail: Locator;
  readonly accountEmail: Locator;
  private upgradeBtn: Locator;
  readonly upgradePlanPopup: Locator;
  readonly planBudget: Locator;

  constructor(page: Page) {
    super(page);
    this.userAvatar = page.locator('[class*=userAvatar_]');
    this.accountMenu = page.locator('.account-menu');
    this.settingsEmail = page.locator('.email');
    this.accountEmail = page.locator('.account-email');
    this.upgradeBtn = this.accountMenu.getByRole('button', { name: 'Upgrade' });
    this.upgradePlanPopup = page.locator('.ultimate-billing-plan-container');
    this.planBudget = this.accountMenu.locator("//div[contains(@class, 'plan-badge')]");
  }

  async chooseUserCabineMenuItem(itemName: UserCabineMenuItems) {
    await this.page.locator('.menu-item', { hasText: itemName }).click();
  }
  async openUserCabinet() {
    await this.userAvatar.click();
    await this.accountMenu.waitFor({ state: 'visible' });
  }
  async openUpgradePopup() {
    await this.upgradeBtn.click();
  }
}
