Hello customer.

This is test framework for project - PDF Expert Copilot - https://copilot.pdfexpert.com/app
Framework is buil with combination of Playwright and Typescript technologies
Project consists with 2 layers: WEB UI tests and API tests

1) How to Set up project
Locally

Clone project and create .env file in the root folder
Inside .env you need create 3 enviroment variables:

EMAIL_USER - test email for authentification. Use @gmail emails 
EMAIL_PASS - App Password
!! It's not ordinary password for the email. This is 16 symbol password from Google 
Hot to get this App Password
- You account must have 2nd Authentification enabled on your account. Google settings
- Then go to [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification → App passwords
And create new App password with any name
After it Google will create 16 symbols password
You shoud use this password as EMAIL_PASS
TEST_ENV - Install as prod. This is project name for api tests

All tests will use only env variables from .env file. So you don't need to change email somewere in the project

For CiCd.
This project uses Github Actions. So you need to add these env varibles to Github settings
Settings → Secrets and variables → Actions

2) How to use tests
All tests are divided to test groups by using tags
For launching tests you shoud use next console commands (example)

WEB:
npx playwright test --project=chromium --grep @loginLogout
tag - each test has it's own tag, based on functionality
project - available projects you can find in playwright.config.ts

API:
npx playwright test --config=API/playwright.api.config.ts --grep @documents
config - it's a link to place where you can find available settings for api tests

