const { spawn } = require('child_process');
const path = require('path');
const config = require('./config');

module.exports = async imagePath => new Promise((resolve, reject) => {
  const scriptPath = path.resolve(__dirname, '../../python/getinput.py');
  const pythonProcess = spawn(config.python_version, [scriptPath, imagePath]);
  pythonProcess.stdout.on('data', (data) => {
    resolve(data);
  });
});
