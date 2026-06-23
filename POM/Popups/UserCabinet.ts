import { Locator, Page } from 'playwright';
import { BasePage } from '../BasePage';
import { UserCabineMenuItems } from '../../interfaces/userCabinetTypes';

export class UserCabinet extends BasePage {
  private userAvatar: Locator;
  private accountMenu: Locator;
  settingsEmail: Locator;
  accountEmail: Locator;
  upgradeBtn: Locator;
  upgradePlanPopup: Locator;
  planBudget: Locator;

  constructor(page: Page) {
    super(page);
    this.userAvatar = page.locator("//div[contains(@class, 'userAvatar')]");
    this.accountMenu = page.locator('.account-menu');
    this.settingsEmail = page.locator('.email');
    this.accountEmail = page.locator('.account-email');
    this.upgradeBtn = this.accountMenu.locator("//button[contains(@class, 'upgrade-button')]");
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
}
