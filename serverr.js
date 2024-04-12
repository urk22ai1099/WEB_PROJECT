const { spawn } = require('child_process');

// Corrected paths
const server1Path = 'C:\\Users\\flora\\OneDrive\\Documents\\exp10\\exp10\\s1.js';
const server2Path = 'C:\\Users\\flora\\OneDrive\\Documents\\exp10\\exp10\\server1.js'; // Assuming serverp.js is the correct file name

function startServer(serverPath) {
  const server = spawn('node', [serverPath]);

  server.stdout.on('data', (data) => {
    console.log(`${serverPath} stdout: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`${serverPath} stderr: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`${serverPath} child process exited with code ${code}`);
  });
}

startServer(server1Path);
startServer(server2Path);
