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
