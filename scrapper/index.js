const cheerio = require('cheerio');
const axios = require('../axios');


(async () => {
    const {data} = await axios.get('/index.php?thread/7228-registos-de-manutenções/&pageNo=50');
    // console.log(data);
    const $ = cheerio.load(data);
    const maint = $('.messageList>li[id]')
    const page = Number($('.paginationTop li.active>span:first-child').text())
    // console.log(maint)
    maint.each((index, post) => {
        const regex = /\[(?<=\[)icon=.*?\]|\[\/(?<=\/)icon\]/g
        const postLi = $(post)
        const postID = postLi.attr('id')
        const link = postLi.children('article').attr('itemid')
        const postDate = postLi.find('time.datetime').attr('datetime')
        const message = postLi.find('div.messageText').text().replace(regex, "");
        console.log(postID, link, postDate, message, page)
    })
})()


// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');


// console.log($.html())

//CONDIÇÃO PARA ÚLTIMA PÁGINA