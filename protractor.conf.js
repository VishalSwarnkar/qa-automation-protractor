const {SpecReporter} = require('jasmine-spec-reporter');
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    allScriptsTimeout: 300000,
    suites: {
        default: './e2e/test-suites/*.e2e-spec.ts',
    },
    capabilities: {
        "browserName": "chrome"
    },
    params: {
    email: "myemail",
		username: "myusername",
    password: "mypassword"
    },
    directConnect: true,
    baseUrl: 'https://mail.google.com/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        print: function () {
        }
    },
    onPrepare() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: false
            }
        }));
        jasmine.getEnv().addReporter(new HtmlReporter({
           baseDirectory: 'reports/screenshots'
        }).getJasmine2Reporter());
    }
};
