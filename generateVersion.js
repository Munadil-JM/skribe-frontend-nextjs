const fs = require('fs');
const path = require('path');

const version = new Date().toISOString();

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.version = version;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

const versionData = {
  version: version,
};
const outputPath = path.join(__dirname, 'public', 'version.json');
fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2), 'utf8');

console.log(`Version updated to ${version} in package.json and version.json`);
