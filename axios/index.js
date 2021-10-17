const axios = require('axios');
const instance = axios.create({ baseURL: 'https://board.pt.metin2.gameforge.com' });
module.exports = instance