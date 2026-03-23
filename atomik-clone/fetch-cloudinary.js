const https = require('https');

const cloudName = 'dwop0otlb';
const apiKey = '651766384549384';
const apiSecret = 'EwD5zTohCw3NUaHv7d2HhmTCfJs';

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

const options = {
  hostname: 'api.cloudinary.com',
  port: 443,
  path: `/v1_1/${cloudName}/resources/video`,
  method: 'GET',
  headers: {
    'Authorization': `Basic ${auth}`
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.resources) {
        const videos = parsedData.resources.map(r => ({
          public_id: r.public_id,
          format: r.format
        }));
        console.log(JSON.stringify(videos, null, 2));
      } else {
        console.log('No resources found or error:', parsedData);
      }
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
