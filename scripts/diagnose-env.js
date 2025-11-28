const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(process.cwd(), '.env');
console.log('Checking .env at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('.env file exists.');
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    console.log('Keys in .env:', Object.keys(envConfig));

    if (envConfig.MONGODB_URI) {
        console.log('MONGODB_URI is present in .env');
    } else {
        console.log('MONGODB_URI is MISSING from .env');
    }
} else {
    console.log('.env file does NOT exist.');
}
