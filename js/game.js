const question=document.getElementById("question");
const choices= Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progressText");
const scoreText=document.getElementById("score");
const progressBarFull=document.getElementById("progressBarFull");
const loader=document.getElementById("loader");
const game=document.getElementById("game");


let currentQuestion={}
let acceptingAnswers= true
let score= 0
let questionCounter = 0
let avaliableQuestion=[]

let questions= [];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
.then(res=>{
    return res.json();
}).then(loadedQuestions=>{
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestions=>{
        const formattedQuestion={
            question: loadedQuestions.question
        };
        const answerChoices=[...loadedQuestions.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) * 1;
        answerChoices.splice(formattedQuestion.answer - 1,0,loadedQuestions.correct_answer);
        answerChoices.forEach((choice,index)=>{
            formattedQuestion["choice" + (index+1)]=choice;
        })

        
        return formattedQuestion;
    });
    
    startGame();
})

.catch( err=>{
    console.error(err);
})

const Correct_Bonus= 10;
const Max_Question = 3;

startGame=()=>{
    questionCounter=0;
    score=0;
    avaliableQuestion=[...questions];
    // console.log(avaliableQuestion);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}
getNewQuestion=()=>{
    if(avaliableQuestion.length==0|| questionCounter>= Max_Question){
        localStorage.setItem("mostRecrntScore",score);
        
        return window.location.assign("/pages/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${Max_Question}`;
    
   
    progressBarFull.style.width = `${(questionCounter / Max_Question) *100}%`


    const questionIndex=Math.floor(Math.random()*avaliableQuestion.length);
    currentQuestion=avaliableQuestion[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number];
    });

    avaliableQuestion.splice(questionIndex,1);

    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener("click",e=>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false; 
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply= selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'
        
        if(classToApply=="correct"){
            incermentScore(Correct_Bonus)
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },600);

    })
})

incermentScore=num=>{
    score+=num;
    scoreText.innerText=score;
}

