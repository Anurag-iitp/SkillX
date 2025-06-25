const text = "SkillX: 'Learn | Build | Grow'";
let index = 0;
const speed = 80;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing-slogan").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

window.onload = typeEffect;
