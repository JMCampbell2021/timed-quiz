var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart"); 
var quizBox = document.querySelector(".quiz-box");
var timeCount = quizBox.querySelector(".timer .timer-sec")

var optionList = document.querySelector(".option-list")
var userNameInput = document.querySelector("#first-name");
var submitBtn= document.querySelector(".buttons .submit");

//Start Button Clicked 
startBtn.onclick = ()=> {
    infoBox.classList.add("activeInfo"); //show the info box
}

//Exit Button Clicked
exitBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo");//hide the info box
}

//Continue Button Clicked
continueBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo");// hide the info box
    quizBox.classList.add("activeQuiz"); //show the quiz box
    showQuestion(0);
    queCounter(1);
    startTimer(timeValue);
}

var queCount = 0;
var queNumb = 1;
var counter;
var timeValue = 24;
var userScore = 0;

var nextBtn = quizBox.querySelector(".next-btn");
var resultBox = document.querySelector(".result-box");
var restartQuiz = resultBox.querySelector(".buttons .restart");
var quitQuiz = resultBox.querySelector(".buttons .quit")

restartQuiz.onclick = ()=>{ 
    window.location.reload("activeQuiz")
}
    
quitQuiz.onclick = ()=>{
    window.location.reload();
    // window.location.assign("/") for Highscore page
} 
  
//Next Button Clicked
nextBtn.onclick = ()=> {
    if(queCount < questions.length -1){
        queCount++;
        queNumb++;
        showQuestion(queCount);
        queCounter(queNumb);  
        // clearInterval(counter);
        nextBtn.style.display = "none";
    }else {
        console.log("Questions completed")
        showResultBox();
    }
}

//getting question and options from array
function showQuestion(index) {
    var queText = document.querySelector(".que-text")
    var queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag

    var option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

var tickIcon = '<div class="icon tick">&#10003</div>'
var crossIcon = '<div class="icon cross">&#x2717</div>'

function optionSelected(answer){
    var userAns = answer.textContent;
    var correctAns = questions[queCount].answer;
    var allOptions = optionList.children.length;
    if(userAns == correctAns){
        userScore += 20;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answers is incorrect then automactically select the correct answer
        for (let i=0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // once user selected disabled all options
    for (let i =0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled")
    }
    nextBtn.style.display = "block";
}

// Result and score
function showResultBox(){
    infoBox.classList.remove("activeInfo");//hide the info box
    quizBox.classList.remove("activeQuiz");// hide the quiz box
    resultBox.classList.add("activeResult");// show the result box
    var scoreText = resultBox.querySelector(".score-text");
    if(userScore > 80){ 
        var scoreTag = '<span><p>Congrats! You scored</p><p>'+ userScore +'</p><p>out of</p><p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    if(userScore > 20){ 
        var scoreTag = '<span><p>Nice Try! You scored</p><p>'+ userScore +'</p><p>out of</p><p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { 
        var scoreTag = '<span><p>You fouled out with a score of </p><p>'+ userScore +'</p><p>out of</p><p>100</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


submitBtn.addEventListener("click", function(event) {
    event.preventDefault();  

       var newScore = {
            score: userScore,
            userName: userNameInput.value
       }
    
      // set score submission to local storage 
        localStorage.setItem("highscores", JSON.stringify(newScore)); 

        var highScore = JSON.parse(localStorage.getItem("highscores"))
        console.log(highScore)

});




function startTimer(time){
    counter = setInterval(timer,1000)
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9 ) {
            var addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            timeCount.textContent = "00"
            showResultBox();
        }
      }
}


function queCounter(index) {
    var bottomQueCounter = quizBox.querySelector(".total-que");
    var totalQuesCountTag = '<span><p>'+ index + '</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';
    bottomQueCounter.innerHTML = totalQuesCountTag;
}