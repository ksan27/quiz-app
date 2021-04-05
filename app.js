`use strict`;

var content = document.getElementById('mainCon')
var question = document.getElementById('qst')
var choice = document.getElementById('chc')
var submit = document.getElementById('sub')

var turn = 0 //順番のインデックス
var score = 0 //正解の答えを数える変数
var askingQuestion = true //true答え確認・falseは結果表示or次の答え
var setTimer = 10 //残り時間

// タイマー
var timer = setInterval(function(){
  var timeStr = document.getElementById('time').innerHTML = "残り: " + setTimer + "秒";
  setTimer--; 
  if (setTimer === -1){
    clearInterval(timer);
    timeStr = document.getElementById('time').innerHTML = "終了"
    alert("タイムアップ！");
    showResults();
  }
}, 1000);

// クイズ作成
function createQst() {
  var choices = quizData[turn].choices;
  var choicesHtml = "";

  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + turn + "' id='choice" + (i
    + 1) + "' value='" + choices[i] + "'>" + " <label for='choice" + (i + 1) + "'>"
    + choices[i] + "</label>";
  }
  question.innerHTML = "No." + (turn + 1) + "<br>" + quizData[turn].question;
  choice.innerHTML = choicesHtml;

  if (turn === 0) {
  submit.textContent = "Answer";
  }
}

// クイズ答え確認
function checking() {

  if (askingQuestion) {
    submit.innerHTML = "NEXT <i class='fa'>&#xf101;</i>";
    askingQuestion = false;
    clearInterval(timer);
    var selectedAnsw;
    var correctIndex;
    var radios = document.getElementsByName("quiz" + turn);
    
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selectedAnsw = radios[i].value;
      }
      if (radios[i].value == quizData[turn].correct) {
        correctIndex = i;
      }
    }

    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (selectedAnsw == quizData[turn].correct) {
      score++;
      labelStyle.color = "#add8e6";
      labelStyle.backgroundColor = "#f5fffa";
    } else {
      labelStyle.color = "#f08080";
      labelStyle.backgroundColor = "#ffe4e1";
    }

  } else { //次の質問
    askingQuestion = true;
    submit.textContent = "Answer";
    if (turn < quizData.length - 1) {
      turn++;
      createQst();
      timer = setInterval(function(){
        timeStr = document.getElementById('time').innerHTML = "残り: " + setTimer + "秒";
        setTimer--; 
        if (setTimer === -1){
          clearInterval(timer);
          timeStr = document.getElementById('time').innerHTML = "終了"
          alert("タイムアップ！");
          showResults();
        }
      }, 1000);
    } else {
      clearInterval(timer);
      showResults();
    }
  }
}

// 結果
function showResults() {
  if(score == quizData.length){
    content.innerHTML = "<h2>お疲れ様でした！</h2>" +
    "<h2>以下結果になります、</h2>" +
    "<h2 style='color:#add8e6'>おめでとう！全問正解！</h2>";
  } else if (score != 0) {
    content.innerHTML = "<h2>お疲れ様でした！</h2>" +
    "<h2>以下結果になります、</h2>" +
    "<h2 style='color:#add8e6'>" + quizData.length + "問中、" + score + "問正解、" +
    Math.round(score / quizData.length * 100) + "%</h2>";
  } else { 
    content.innerHTML = "<h2>お疲れ様でした！</h2>" +
    "<h2>以下結果になります、</h2>" +
    "<h2 style='color:#f08080'>全問不正解！</h2>";
  }
  //戻るボタン
  var back = document.createElement('input');
  back.setAttribute('type','button');
  back.setAttribute('value', "Back");
  content.appendChild(back);

  back.addEventListener('click', () => {
    location.reload();
  });
}

window.addEventListener("load", createQst, false);
submit.addEventListener("click", checking, false);
