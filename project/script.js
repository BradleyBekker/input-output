let canCheck = false;
const canvas = document.getElementById('canvas');
let color = document.getElementById('colorPicker');
const context = canvas.getContext('2d');
let a;
let targetColor;
let R,G,B;
canvas.width = 720;
canvas.height = 480;

setup();
//reqeusts the video output from the webcam and displays it
(function() {
      var video = document.getElementById('video'),
      vendorUrl = window.URL || window.webkitURL;

      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

      navigator.getMedia({
        video: true,audio:false

          },function(stream) {
          video.srcObject = stream;
          video.play();

          },function(error) {

      });




})();



function draw(video,x,y,context,width,height) {
  context.drawImage(video,x,y, width,height);
}

let data;

//draws image on canvas
document.addEventListener('click',function() {
  if (!canCheck)
  {

    R= 0;
    G= 0;
    B= 0;
    let image;
    let r,b,g;
    //saturates image
    context.filter = 'saturate(200%)';
    draw(video,0,0,context,canvas.width,canvas.height);
      image = context.getImageData(0,0,canvas.width ,canvas.height );//nakijken
      data = image.data;
    console.log(data);

    for (let i = 0; i < data.length; i += 4)
    {
      r=  data[i];     // red
      g=  data[i + 1]; // green
      b=  data[i + 2]; // blue
      if (r >= 115 && g < 100 && b < 100 && (g !=255 && b !=255) )
      {
        if (targetColor == "RED") {
          a++;
          data[i] = 255;
          data[i + 1] = 00;
          data[i + 2] = 00;

          R++;
        }
      }
      if (g >= 125 && r < 100 && b < 100 && (r !=255 && b !=255) ) {
        if (targetColor == "GREEN") {
          a++;
          data[i] = 00;
          data[i + 1] = 255;
          data[i + 2] = 00;
          R++;
        }
      }
      if (b >= 130 && r < 100 && g < 180 && (r !=255 && g !=255) ) {
        if (targetColor == "BLUE") {
          a++;
          data[i] = 00;
          data[i + 1] = 00;
          data[i + 2] = 255;
          R++;
        }
      }

    }

    context.putImageData(image, 0, 0);
    console.log(R);
    if (R >= 1000) {
      canCheck = true;
      document.getElementById('body').style.backgroundColor = "yellow";
      color.innerHTML = "CORRECT"
      setTimeout(function () {
        canCheck = false;
        setup();

      }, 1000);
    }
  }

})

function randomNumber(max){
  return Math.floor(Math.random() * max);
}

function setup() {
  //resets game
  document.getElementById('body').style.backgroundColor = "white";

  let temp = randomNumber(3)
  console.log(temp);
    //picks a new color
    switch (temp) {
      case 0:
      color.style.backgroundColor = "Crimson";
      color.innerHTML = "RED"
        targetColor = "RED"
        break;
        case 1:
        color.style.backgroundColor = "Blue";
        color.innerHTML = "BLUE"
        targetColor = "BLUE"
        break;
          case 2:
          color.style.backgroundColor = "green";
          color.innerHTML = "GREEN"
          targetColor = "GREEN"
          break;

      default:
      color.style.backgroundColor = "Crimson";
      color.innerHTML = "bel"

    }


}
