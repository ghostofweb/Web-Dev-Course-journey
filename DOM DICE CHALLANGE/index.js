let randomNumber1 = Math.floor(Math.random()* 6 + 1);
let randomNumber2 = Math.floor(Math.random()* 6 + 1);

let image1 = "./images/dice" +randomNumber1 + ".png"
let image2 = "./images/dice" +randomNumber2 + ".png"

document.querySelectorAll("img")[0].setAttribute("src",image1)
document.querySelectorAll("img")[1].setAttribute("src",image2)

if (randomNumber1 === randomNumber2){
    document.querySelector("h1").innerText = "TIE"
}
else if(randomNumber1 > randomNumber2){
    document.querySelector("h1").innerText = "player 1 won"

}
else{
    document.querySelector("h1").innerText = "player 2 won"

}