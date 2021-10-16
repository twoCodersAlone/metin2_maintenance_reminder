const axios = require('axios');

const instance = axios.create({baseURL: 'https://board.pt.metin2.gameforge.com'});
module.exports = instance

// https://board.pt.metin2.gameforge.com/index.php?thread/7228-registos-de-manuten%C3%A7%C3%B5es/