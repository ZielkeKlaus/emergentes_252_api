const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/setup/criar-primeiro-admin',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Resposta:', body);
  });
});

req.on('error', (error) => {
  console.error('Erro:', error);
});

req.end();
