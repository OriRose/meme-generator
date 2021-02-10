'use strict'

var gElCanvas;
var gCtx;
var gImg;

function initEditor(imageUrl){
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    
    gImg = new Image()
    gImg.src = imageUrl;
    var height = gImg.height * document.querySelector('.canvas-container').offsetWidth / gImg.width
    document.querySelector('.meme-editor').style.height = height+'px'
    document.querySelector('.canvas-container').style.backgroundImage = gImg
    drawImage(gImg)

}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawImage(img){
    gCtx.imageSmoothingEnabled = false;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}