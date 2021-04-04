# Frameworks:
- webdriverIO (v6)
- cucumber (v6)

# Features:
- Supports Page Object Model
- Compatible with Nodejs Versions 12.x to 13.x
- Contains sample Scenarios written in Declarative style of BDD
- Supports Data externalisation
- Integrated with [eslint](https://www.npmjs.com/package/eslint) for identifying and reporting on code patterns.
- Integrated with [cucumber-html-reporter](https://www.npmjs.com/package/cucumber-html-reporter) for intuitive & detailed HTML reporting
- Embeds screenshots on failure
- Integrated with [wdio-cucumber-parallel-execution](https://www.npmjs.com/package/wdio-cucumber-parallel-execution) module for parallel execution


# Installation

```
npm install
```

# Running the Sample Scenarios

```
npm run test
```

# Docker execution
- Install and run Docker [Docker desktop] in your local machine [https://www.docker.com/?utm_source=google&utm_medium=cpc&utm_campaign=dockerhomepage&utm_content=namer&utm_term=dockerhomepage&utm_budget=growth&gclid=CjwKCAjwx6WDBhBQEiwA_dP8retfX7pPR9vMMCx_FoxDdtxI7E0e4d6X6KDkXnoWElp90LD3ixpMkBoC5aMQAvD_BwE]
- Add docker-compse.yml file to automation framework.
- Open termainal/gitbash from Automation root folder and run below command
      docker-compose up
- docker compose up will install all selenium hub, firefox and chrome nodes
- enable below options from wdio.conf.js file
       hostname: 'localhost',
       port: 4444,
       path: '/wd/hub',
- add services: ['docker'] in wdio.conf.js
- now perform npm run test
- to close docker - docker-compose down


# Parallel execution
- npm install wdio-cucumber-parallel-execution --save-dev
- add below code in wdio.conf.js file
    wdio.conf.js

const argv = require("yargs").argv;
const wdioParallel = require('wdio-cucumber-parallel-execution');
// The below module is used for cucumber html report generation
const reporter = require('cucumber-html-reporter');
const currentTime = new Date().toJSON().replace(/:/g, "-");

const sourceSpecDirectory = `path/to/featureFilesDirectory`;
const parallelExecutionReportDirectory = `path/to/parallelExecutionReportDirectory`;

let featureFilePath = `${sourceSpecDirectory}/*.feature`;

// If parallel execution is set to true, then create the Split the feature files
// And store then in a tmp spec directory (created inside `the source spec directory)
if (argv.parallel === 'true') {
    tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
    wdioParallel.performSetup({
        sourceSpecDirectory: sourceSpecDirectory,
        tmpSpecDirectory: tmpSpecDirectory,
        cleanTmpSpecDirectory: true
    });
    featureFilePath = `${tmpSpecDirectory}/*.feature`
}


- exports.config = {
    // Runner Configuration

    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: () => {
        // Remove the `tmp/` folder that holds the json report files
        removeSync(parallelExecutionReportDirectory);
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: () => {

        try{
            let consolidatedJsonArray = wdioParallel.getConsolidatedData({
                parallelExecutionReportDirectory: parallelExecutionReportDirectory
            });

            let jsonFile = `${parallelExecutionReportDirectory}report.json`;
            fs.writeFileSync(jsonFile, JSON.stringify(consolidatedJsonArray));
    
            // The below code is not part of wdio-cucumber-parallel-execution module
            // but is mentioned to show, how it can be used with other reporting modules
            var options = {
                theme: 'bootstrap',
                jsonFile: jsonFile,
                output: `tests/reports/html/report-${currentTime}.html`,
                reportSuiteAsScenarios: true,
                scenarioTimestamp: true,
                launchReport: true,
                ignoreBadJsonFile: true
            };
    
            reporter.generate(options);
        } catch(err){
            console.log('err', err);
        }
    }
}


- Pass parallel execution Flag as true
package.json

  "scripts": {
    "test": "command to run your tests with --parallel=true"
  }

# Visual regression
- Installation#

npm install --save wdio-image-comparison-service
npm install --save-dev wdio-image-comparison-service

- add below code in wdio.conf.js

const { join } = require('path');
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        ['image-comparison',
        // The options
        {
            // Some options, see the docs for more
            baselineFolder: join(process.cwd(), './tests/sauceLabsBaseline/'),
            formatImageName: '{tag}-{logName}-{width}x{height}',
            screenshotPath: join(process.cwd(), '.tmp/'),
            savePerInstance: true,
            autoSaveBaseline: true,
            blockOutStatusBar: true,
            blockOutToolBar: true,
            // NOTE: When you are testing a hybrid app please use this setting
            isHybridApp: true,
            // Options for the tabbing image
            tabbableOptions:{
                circle:{
                    size: 18,
                    fontSize: 18,
                    // ...
                },
                line:{
                    color: '#ff221a', // hex-code or for example words like `red|black|green`
                    width: 3,
                },
            }
            // ... more options
        }],
    ],
    // ...
};


- Writing tests#


    // Save a screen
    browser.saveScreen('examplePaged', { /* some options */ });

    // Save an element
    browser.saveElement($('#element-id'), 'firstButtonElement', { /* some options */ });

    // Save a full page screenshot
    browser.saveFullPageScreen('fullPage', { /* some options */ });

    // Save a full page screenshot with all tab executions
    browser.saveTabbablePage('save-tabbable', { /* some options, use the same options as for saveFullPageScreen */ });
  

    // Check a screen
    expect(browser.checkScreen('examplePaged', { /* some options */ })).toEqual(0);

    // Check an element
    expect(browser.checkElement($('#element-id'), 'firstButtonElement', { /* some options */ })).toEqual(0);

    // Check a full page screenshot
    expect(browser.checkFullPageScreen('fullPage', { /* some options */ })).toEqual(0);

    // Check a full page screenshot with all tab executions
    expect(browser.checkTabbablePage('check-tabbable', { /* some options, use the same options as for checkFullPageScreen */ })).toEqual(0);

- once you perform test you can view the screenshots under .tmp folder and base images under tests/screenshots
  