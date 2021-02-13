'use strict'

var gElCanvas;
var gCtx;
var gImg;
var gLines;
var gMoveDownInterval;
var gMoveUpInterval;
var gFonts = ['Arial', 'Arial Black', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Impact', 'Times New Roman',
    'Georgia', 'Courier', 'Lucida Console', 'Brush Script MT', 'Comic Sans MS']

function initEditor(imageUrl) {
    document.querySelector('.meme-editor').classList.toggle('hidden')
    document.querySelector('.meme-editor').classList.toggle('flex')
    document.querySelector('.gallery-container').classList.toggle('hidden')
    // document.querySelector('.gallery').classList.toggle('flex')
    getFonts()

    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')

    gImg = document.querySelector('.my-img')
    gImg.src = imageUrl
    var height = gImg.height * document.querySelector('.canvas-container').offsetWidth / gImg.width
    document.querySelector('.meme-editor').style.height = height + 'px'
    initLines()
    drawMeme(true)
}

function getFonts() {
    gFonts.forEach((font) => {
        document.getElementById('font').innerHTML += `<option value="${font}">${font}</option>`
    })
}

function drawMeme(isSelectionDisplayed) {
    drawImage()
    drawText(isSelectionDisplayed)
}

function initLines() {
    gLines = {
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Top text',
                size: 36,
                font: 'Impact',
                align: 'center',
                strokeColor: 'black',
                fillColor: 'white',
                coords: {
                    x: gElCanvas.width / 2,
                    y: 32
                }
            }, {
                txt: 'Bottom text',
                size: 36,
                font: 'Impact',
                align: 'center',
                strokeColor: 'black',
                fillColor: 'white',
                coords: {
                    x: gElCanvas.width / 2,
                    y: gElCanvas.height - 2
                }
            }
        ]
    }
}

function drawText(isSelectionDisplayed) {
    gLines.lines.forEach((line, idx) => {
        if (idx === gLines.selectedLineIdx && isSelectionDisplayed) {
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'
            gCtx.strokeRect(0, line.coords.y - line.size + 5, gElCanvas.width, line.size)
            gCtx.fillRect(0, line.coords.y - line.size + 5, gElCanvas.width, line.size)
            document.getElementById('line-text').value = line.txt
            document.getElementById('font').value = line.font
        }
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.coords.x, line.coords.y)
        gCtx.strokeText(line.txt, line.coords.x, line.coords.y)
    })
}

function drawImage() {
    gCtx.imageSmoothingEnabled = true
    gCtx.imageSmoothingQuality = "high"
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function updateText(text) {
    gLines.lines[gLines.selectedLineIdx].txt = text
    drawMeme(true)
}

function switchLines() {
    if (gLines.lines.length - 1 === gLines.selectedLineIdx) gLines.selectedLineIdx = 0
    else gLines.selectedLineIdx++
    drawMeme(true)
}

function startMoveUpInterval() {
    gMoveUpInterval = setInterval(moveLineUp, 100)
}

function endMoveUpInterval() {
    clearInterval(gMoveUpInterval)
}

function startMoveDownInterval() {
    gMoveDownInterval = setInterval(moveLineDown, 100)
}

function endMoveDownInterval() {
    clearInterval(gMoveDownInterval)
}

function moveLineUp() {
    if (gLines.lines[gLines.selectedLineIdx].coords.y > 0) {
        gLines.lines[gLines.selectedLineIdx].coords.y--
        drawMeme(true)
    }
}

function moveLineDown() {
    if (gLines.lines[gLines.selectedLineIdx].coords.y < gElCanvas.height + gLines.lines[gLines.selectedLineIdx].size - 5) {
        gLines.lines[gLines.selectedLineIdx].coords.y++
        drawMeme(true)
    }
}

function addLine() {
    gLines.lines.push({
        txt: 'Text',
        size: 36,
        font: 'Impact',
        align: 'center',
        strokeColor: 'black',
        fillColor: 'white',
        coords: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        }
    })
    gLines.selectedLineIdx = gLines.lines.length - 1
    drawMeme(true)
}

function deleteLine() {
    gLines.lines.splice(gLines.selectedLineIdx, 1)
    gLines.selectedLineIdx = 0
    drawMeme(true)
}

function increaseSize() {
    gLines.lines[gLines.selectedLineIdx].size++
    drawMeme(true)
}

function decreaseSize() {
    gLines.lines[gLines.selectedLineIdx].size--
    drawMeme(true)
}

function alignLeft() {
    gLines.lines[gLines.selectedLineIdx].coords.x = 4
    gLines.lines[gLines.selectedLineIdx].align = 'left'
    drawMeme(true)
}

function alignCenter() {
    gLines.lines[gLines.selectedLineIdx].coords.x = gElCanvas.width / 2 - 4
    gLines.lines[gLines.selectedLineIdx].align = 'center'
    drawMeme(true)
}

function alignRight() {
    gLines.lines[gLines.selectedLineIdx].coords.x = gElCanvas.width
    gLines.lines[gLines.selectedLineIdx].align = 'right'
    drawMeme(true)
}

function setFont(font) {
    gLines.lines[gLines.selectedLineIdx].font = font
    drawMeme(true)
}

function clickFillColorInput() {
    document.getElementById('fill-color').click()
}

function clickOutlineColorInput() {
    document.getElementById('outline-color').click()
}

function setFillColor() {
    gLines.lines[gLines.selectedLineIdx].fillColor = document.getElementById('fill-color').value
    drawMeme(true)
}

function setOutlineColor() {
    gLines.lines[gLines.selectedLineIdx].strokeColor = document.getElementById('outline-color').value
    drawMeme(true)
}

function shareMeme(elForm, ev) {
    ev.preventDefault();
    drawMeme(false)
    var elImgData = document.getElementById('imgData');
    elImgData.value = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // console.log('uploadedImgUrl:', uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }

    uploadMeme(elForm, onSuccess);
    drawMeme(true)
}

function uploadMeme(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function clickDownloadLink() {
    document.querySelector('.download-link').click()
}

function downloadMeme(elLink) {
    drawMeme(false)
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'meme'
    drawMeme(true)
}