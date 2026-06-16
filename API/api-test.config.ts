const processEnv = process.env.TEST_ENV
const env = processEnv || ''


const config = {
    PDF_API_PROD: 'https://copilot.pdfexpert.com/api/v1',
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}
export {config}