import {LoginPage} from '../page-objects/pages/login/login.po';
import {LoginPageHelper} from '../page-objects/pages/login/login-page.helper';
import {ComposePage} from '../page-objects/pages/compose/compose.po';
import {browser, By, element, ExpectedConditions} from 'protractor';

describe('G mail suite', () => {
    let loginPageHelper: LoginPageHelper;

    beforeEach(() => {
        loginPageHelper = new LoginPageHelper();
    });

    it('Send email', async () => {
        await loginPageHelper.goToPage();
        await LoginPage.username.sendKeys(browser.params.email);

        await element(By.id('identifierNext')).click();
        await browser.wait(ExpectedConditions.visibilityOf(LoginPage.password));

        await LoginPage.password.sendKeys(browser.params.password);

        await browser.wait(ExpectedConditions.visibilityOf(LoginPage.passwordNextButton));
        await browser.sleep(1000);
        await LoginPage.passwordNextButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//*[@role='button' and (.)='Compose']`))));

        await element(By.xpath(`//*[@role='button' and (.)='Compose']`)).click();

        await element(By.css('[name="to"]')).clear();
        await element(By.css('[name="to"]')).sendKeys('myemail');

        await element(By.xpath(`//div[@data-tooltip='More options']`)).click();
        await browser.sleep(1000);
        await element(By.xpath(`//div[text()='Label']`)).click();

        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//div[@role='menuitemcheckbox' and @title='Social']`))));
        // Label email as "Social"
        await element(By.xpath(`//div[@role='menuitemcheckbox' and @title='Social']`)).click();


        await ComposePage.subject.sendKeys("Testing");
        // await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//div[text()='Apply']`))));
        await loginPageHelper.click(element(By.xpath('//*[@role="button" and text()="Send"]')));

        //Open social section
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//div[text()='Social']`))));
        await element(By.xpath(`//div[text()='Social']`)).click();

        //Mark email as starred
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//div[@title='Not starred']`))));
        await element(By.xpath(`//div[@title='Not starred']`)).click();

        //Open mail from social section and Verify if the subject is same as sent
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//span[@email="${browser.params.email}" and @name="${browser.params.username}"]`))));
        await browser.wait(ExpectedConditions.visibilityOf(element(By.xpath(`//h2[text()='Testing']`))));

        await browser.sleep(5000);

    });
});
