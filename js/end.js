const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScoreBtn");
const finalScore=document.getElementById("finalScore")
const mostRecrntScore=localStorage.getItem("mostRecrntScore")
const max_high_score=5;

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecrntScore;
username.addEventListener("keyup", ()=>{
    
    saveScoreBtn.disabled = !username.value
});



saveHighScore = e =>{
    console.log("hellllllo");
    e.preventDefault();

    const score={
        score:Math.floor(Math.random()*100),
        name: username.value
    };

    highScores.push(score);
    highScores.sort( (a,b)=> b.score - a.score)
    highScores.splice(5);

    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign('/index.html');

}