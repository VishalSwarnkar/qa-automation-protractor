import {By, element} from 'protractor';

export class ComposePage {
    static get subject() {
        return element(By.name('subjectbox'));
    }

}
