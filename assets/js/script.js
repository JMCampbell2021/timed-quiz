var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart"); 
var quizBox = document.querySelector(".quiz-box");

//Start Button Clicked 
startBtn.onclick = ()=> {
    infoBox.classList.add("activeInfo");
}

//Exit Button Clicked
exitBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo");
}

//Continue Button Clicked
continueBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestion(0);
    queConunter(1);
}

let queCount = 0;
let queNumb = 1;

const nextBtn = quizBox.querySelector(".next-btn");

//Next Button Clicked
nextBtn.onclick = ()=> {
    if(queCount < questions.length -1){
        queCount++;
        queNumb++;
        showQuestion(queCount);
        queConunter(queNumb)
    }else {
        console.log("Questions completed")
    }
}

//getting question and options from array
function showQuestion(index) {
    var queText = document.querySelector(".que-text")
    var optionList = document.querySelector(".option-list")
    let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
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

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if(userAns == correctAns){
        answer.classList.add("correct");
        console.log("Answer is correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong")
    }
}




function queConunter(index) {
    var bottomQueCounter = quizBox.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index + '</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';
    bottomQueCounter.innerHTML = totalQuesCountTag;
}