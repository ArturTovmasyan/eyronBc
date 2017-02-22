import { browser, element, by } from 'protractor';

//get all params in protractor config
let params = browser.params;

export class GlobalFunctions {

    /**
     * This function is used to navigate to url
     *
     * @param path
     */
    navigateTo(path) {
        browser.get(path);
    }

    /**
     * This function is used to get text by selector
     *
     * @param selector
     * @returns {wdpromise.Promise<string>}
     */
    getText(selector) {
        return element(by.css(selector)).getText();
    }

    /**
     * This function is used to click link by selector
     *
     * @param text
     */
    clickToLinks(text){
        element(by.linkText(text)).click();
        browser.sleep(1000);
    }

}


