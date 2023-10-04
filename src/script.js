document.getElementById("discordIcon").onclick = (e) => {
    let tooltip =  document.getElementById("tooltip");
    navigator.clipboard.writeText("cookies#1686");
    tooltip.innerHTML = "Copied!";
    setTimeout(() => tooltip.style.opacity = 1, 100);
    setTimeout(() => {
      tooltip.style.opacity = 0;
      setTimeout(()=> tooltip.innerHTML = "cookies#1686", 500);
    }, 1000);
};

document.getElementById("discordIcon").onmouseover = (e) => {
    let tooltip =  document.getElementById("tooltip");
    tooltip.style.opacity = 1;
};

document.getElementById("discordIcon").onmouseleave = (e) => {
    let tooltip = document.getElementById("tooltip");
    tooltip.style.opacity = 0;
};
textIterate = 999
document.getElementById("slideshowtext").style.opacity = 0;
document.getElementById("slideshowtext").lifetime = 0;
let lifetime = 500
function textShow() {
    let texts = ["I'm a young programmer who likes cookies.", "Interested in Cybersecurity and Assembly", "Website under construction."]
    slideShowText = document.getElementById("slideshowtext");
    let opacity = slideShowText.style.opacity;
    let life = slideShowText.lifetime;
    if (life == 0) {
        slideShowText.lifetime = lifetime;
        slideShowText.style.opacity = 0;
        textIterate++;

        if (textIterate > texts.length - 1) textIterate = 0;
        slideShowText.innerHTML = texts[textIterate];
    } else if (life <= 50) {
        slideShowText.style.opacity -= 1 / 50
    } 
    if (life < lifetime && life > 50) {
        slideShowText.style.opacity = 1
    }
    slideShowText.lifetime--;
    setTimeout(textShow, 10); // 1/10 of a second
};
textShow();