let targetX, targetY, targetSize;
let score = 0;
let timer = 30; // 30 seconds timer
let gameOver = false;
let rank = "";
let gameStarted = false; // 新增變數，判斷遊戲是否已開始
let intervalId; // 新增變數來儲存計時器的 ID

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  if (!gameStarted) {
    // 開始畫面
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(0);
    text("反應力測驗遊戲", width / 2, height / 2 - 50);
    textSize(32);
    text("按下按鈕開始遊戲", width / 2, height / 2 + 50);

    // 按鈕
    fill(100, 200, 100);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 120, 200, 50);
    fill(255);
    textSize(24);
    text("開始遊戲", width / 2, height / 2 + 120);
      // 顯示大型字樣
    textSize(50);
    textAlign(CENTER, CENTER);
    text("TKUET 413730267 伍志倫", width / 2, height - 30);
  } else if (!gameOver) {
    // 遊戲進行中
    // 繪製目標
    fill(255, 0, 0);
    ellipse(targetX, targetY, targetSize);

    // 顯示分數與計時器
    fill(0);
    textSize(30);
    text(`Score: ${score}`, 70, 20);
    text(`Time: ${timer}s`, 80, 60);

    // 顯示大型字樣
    textSize(50);
    textAlign(CENTER, CENTER);
    text("TKUET 413730267 伍志倫", width / 2, height - 30);

    // 每秒移除目標
    if (frameCount % 60 === 0) {
      resetTarget();
    }
  } else {
    // 遊戲結束畫面
    background(50);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text(`RANK: ${rank}`, width / 2, height / 2 - 50);
    textSize(32);
    text("按下 R 鍵重新開始遊戲", width / 2, height / 2 + 50);
  }
}

function mousePressed() {
  if (!gameStarted) {
    // 檢查是否點擊了「開始遊戲」按鈕
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 95 &&
      mouseY < height / 2 + 145
    ) {
      startGame();
    }
  } else if (!gameOver) {
    // 檢查是否點擊了目標
    let d = dist(mouseX, mouseY, targetX, targetY);
    if (d < targetSize / 2) {
      score++;
      resetTarget();
    }
  }
}

function startGame() {
  // 開始遊戲
  gameStarted = true;
  resetTarget();

  // 清除之前的計時器（如果存在）
  if (intervalId) {
    clearInterval(intervalId);
  }

  // 啟動新的計時器
  intervalId = setInterval(() => {
    if (!gameOver && timer > 0) {
      timer--;
    } else if (timer === 0) {
      gameOver = true;
      calculateRank();
      clearInterval(intervalId); // 停止計時器
    }
  }, 1000);
}

function resetTarget() {
  // 重置目標位置與大小
  targetX = random(50, width - 50);
  targetY = random(50, height - 50);
  targetSize = random(30, 50);
}

function calculateRank() {
  if (score > 25) {
    rank = "特戰高手";
  } else if (score > 20) {
    rank = "特戰銅牌";
  } else if (score > 15) {
    rank = "特戰鐵三";
  } else if (score > 10) {
    rank = "你是烏龜嗎";
  } else if (score > 1) {
    rank = "不是 兄台 多練練吧";
  } else {
    rank = "兄台，請再接再厲！";
  }
}

function keyPressed() {
  if (gameOver && (key === 'R' || key === 'r')) {
    // 重新開始遊戲
    score = 0;
    timer = 30;
    gameOver = false;
    gameStarted = false; // 回到開始畫面

    // 清除計時器（避免多次啟動）
    if (intervalId) {
      clearInterval(intervalId);
    }
  }
}