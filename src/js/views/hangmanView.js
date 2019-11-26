import { elements } from './base';

let canvas = elements.canvas;
let ctx = canvas.getContext('2d');
let dpi = window.devicePixelRatio;

export const fix_dpi = () => {
    canvas.setAttribute('width', '100px');
    canvas.setAttribute('height', '300px');
    //create a style object that returns width and height
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
    }
    //set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}

export const drawGallows = () => {
    
    ctx.strokeStyle = 'white';

    ctx.moveTo(0, 300);
    ctx.lineTo(8, 300);
    ctx.stroke();
    ctx.moveTo(4, 300);
    ctx.lineTo(4, 100);
    ctx.stroke();
    ctx.moveTo(4, 100);
    ctx.lineTo(80, 100);
    ctx.stroke();
    ctx.moveTo(80, 100);
    ctx.lineTo(80, 140);
    ctx.stroke();
}

export const drawHangman = (guesses) => {
    
    ctx.strokeStyle = 'white';

    switch(guesses) {
        case 1:
            // head
            ctx.beginPath();
            ctx.arc(80, 160, 20, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 2:
            // body
            ctx.moveTo(80, 180);
            ctx.lineTo(80, 250);
            ctx.stroke();
            break;
        case 3:
            // left arm
            ctx.moveTo(80, 200);
            ctx.lineTo(60, 190);
            ctx.stroke();
            break;
        case 4:
            // right arm
            ctx.moveTo(80, 200);
            ctx.lineTo(100, 190);
            ctx.stroke();
            break;
        case 5:
            // left leg
            ctx.moveTo(80, 250);
            ctx.lineTo(60, 260);
            ctx.stroke();
            break;
        case 6:
            // right leg
            ctx.moveTo(80, 250);
            ctx.lineTo(100, 260);
            ctx.stroke();
            break; 
        default:
            ctx.clearRect(0, 0, canvas.width, canvas.height);       
    }
}

export const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);