let wrongTries = 0;
const blocksContainer = document.querySelector(".blocks");
const blocks = document.querySelectorAll(".blocks .block");
let duration = 1000;
let orderRange = [...Array(blocks.length).keys()];
let resetBtn = document.querySelector(".reset-btn");
let stop;

document.querySelector(".control-btns span").onclick = function () {
  let userName = prompt("Enter Your Name");
  if (userName === null || userName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = userName;
  }
  document.getElementById("start").play();
  document.querySelector(".wrong span").innerHTML = wrongTries;
  document.querySelector(".control-btns").remove();
  let time = 60;
  display = document.querySelector(".timer span");
  startTimer(time, display);
};

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
   stop = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
      document.querySelector(".overlay").style.display = "block"
      document.querySelector(".status").innerHTML = "You Lose"
      document.getElementById("lose-gif").classList.add("active")
      setTimeout(() => {
        document.getElementById("timeDead").play()
        document.querySelector(".pop-up").style.display = "flex"
      }, duration);
    }
  }, 1000);
  
}

blocks.forEach((block) => {
  let randomNumber = Math.floor(Math.random() * orderRange.length);
  block.style.order = randomNumber;
  block.addEventListener("click", function () {
    document.getElementById("click").play();
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let flippedCard = document.querySelectorAll(".is-flipped");
  if (flippedCard.length === 2) {
    stopClicking();
    matchedBlocks();
    winGame()
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function matchedBlocks() {
  let flippedCard = document.querySelectorAll(".is-flipped");
  if (flippedCard[0].dataset.tech === flippedCard[1].dataset.tech) {
    flippedCard.forEach((card) => {
      document.getElementById("sucess").play();
      card.classList.add("correct");
      card.classList.remove("is-flipped");
    });
  } else {
    document.getElementById("fail").play();

    setTimeout(() => {
      wrongTries++;
      document.querySelector(".wrong span").innerHTML = wrongTries;
      flippedCard.forEach((card) => {
        card.classList.remove("is-flipped");
      });
    }, duration);
  }
}

function stopTimer() {
  clearInterval(stop); 
}

function winGame() {
  let correctBlocks = document.querySelectorAll(".correct") 
  if (correctBlocks.length === 20) {
    document.querySelector(".overlay").style.display = "block"
      document.querySelector(".status").innerHTML = "You Win"
      document.getElementById("win-gif").classList.add("active")
      setTimeout(() => {
        document.getElementById("win").play()
        document.querySelector(".pop-up").style.display = "flex"
      }, duration);
      stopTimer()
  }
}

resetBtn.onclick = function () {
  window.location.reload();
};
