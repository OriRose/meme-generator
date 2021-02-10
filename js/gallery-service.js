'use strict'

var gKeywords;
var gImages = [{ id: 1, url: 'img/2.jpg', keywords: [] },
{ id: 2, url: 'img/003.jpg', keywords: [] },
{ id: 3, url: 'img/004.jpg', keywords: [] },
{ id: 4, url: 'img/5.jpg', keywords: [] },
{ id: 5, url: 'img/005.jpg', keywords: [] },
{ id: 6, url: 'img/006.jpg', keywords: [] },
{ id: 7, url: 'img/8.jpg', keywords: [] },
{ id: 8, url: 'img/9.jpg', keywords: [] },
{ id: 9, url: 'img/12.jpg', keywords: [] },
{ id: 10, url: 'img/19.jpg', keywords: [] },
{ id: 11, url: 'img/Ancient-Aliens.jpg', keywords: [] },
{ id: 12, url: 'img/drevil.jpg', keywords: [] },
{ id: 13, url: 'img/img2.jpg', keywords: [] },
{ id: 14, url: 'img/img4.jpg', keywords: [] },
{ id: 15, url: 'img/img5.jpg', keywords: [] },
{ id: 16, url: 'img/img6.jpg', keywords: [] },
{ id: 17, url: 'img/img11.jpg', keywords: [] },
{ id: 18, url: 'img/img12.jpg', keywords: [] },
{ id: 19, url: 'img/leo.jpg', keywords: [] },
{ id: 20, url: 'img/meme1.jpg', keywords: [] },
{ id: 21, url: 'img/One-Does-Not-Simply.jpg', keywords: [] },
{ id: 22, url: 'img/Oprah-You-Get-A.jpg', keywords: [] },
{ id: 23, url: 'img/patrick.jpg', keywords: [] },
{ id: 24, url: 'img/putin.jpg', keywords: [] },
{ id: 25, url: 'img/X-Everywhere.jpg', keywords: [] }]

function init() {
    renderImages()
}

function renderImages() {
    var strHTML = ''
    gImages.forEach((image) => {
        strHTML += `<div class="flex card" onclick="initEditor('${image.url}')"><img src="${image.url}"></div>`
    })
    document.querySelector('.gallery').innerHTML = strHTML
}