/*var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();*/

/*
SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var pathToSeleniumJar = 'K:\\ATOM\\Working\\ATOM\\selenium\\selenium-server-standalone-3.5.3.jar';

var server = new SeleniumServer(pathToSeleniumJar, {
  port: 4444
});

var capabilities = {
 'browserName' : 'IE',
 'browser_version' : '11.0',
 'os' : 'Windows',
 'os_version' : '7',
 'resolution' : '1024x768'
}
   var driver = new webdriver.Builder().
  usingServer(server).
  withCapabilities(capabilities).
  build();*/

//const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
//let capabilities = Capabilities.ie();
//capabilities.set('ignoreProtectedModeSettings', true);
//const driver = new webdriver.Builder().withCapabilities(capabilities).build();


var webdriver = require('selenium-webdriver'),
 By = webdriver.By,
    until = webdriver.until;
var chrome = require('selenium-webdriver/chrome');
//var path = require('chromedriver').path;

var path='K:\\ATOM\\node_modules\\selenium-webdriver\\chrome\\chromedriver.exe'

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();


driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();
