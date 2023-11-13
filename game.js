let quesCount = 0;
let quesCorr = 0;
let quesIncorr = 0;
localStorage.getItem("quesCount") && (quesCount = parseInt(localStorage.getItem("quesCount")));
localStorage.getItem("quesCorr") && (quesCorr = parseInt(localStorage.getItem("quesCorr")));
localStorage.getItem("quesIncorr") && (quesIncorr = parseInt(localStorage.getItem("quesIncorr")));

let questions = [];
localStorage.getItem("questions") && (questions = JSON.parse(localStorage.getItem("questions")));

let num1, num2;

const findPercentageScore = () => {
    let uid = parseInt(localStorage.getItem("uid"))
    let tempScoreData;
    if (localStorage.getItem("tempScore")) {
        tempScoreData = JSON.parse(localStorage.getItem("tempScore"))
    }
    for (j of tempScoreData) {
        if (j.id == uid) {
            let table = document.querySelector("tbody")
            let row = table.insertRow(1)
            let c1 = row.insertCell(0)
            let c2 = row.insertCell(1)
            let c3 = row.insertCell(2)
            let c4 = row.insertCell(3)
            let c5 = row.insertCell(4)
            let c6 = row.insertCell(5)


            let date = new Date(j.date)
            c1.innerText = j.username;
            c2.innerText = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " - " + date.getHours()+":"+date.getMinutes()
            c3.innerText = j.amtCorrect;
            c4.innerText = j.amtQues;

            let quesStr = ""
            let ansStr = ""
            for (i of j.questions) {
                if (i.split(",")[1] == "1") {
                    quesStr += i.split(",")[0] + " >>correct<< \n"

                } else {
                    quesStr += i.split(",")[0] + " >>incorrect<< \n"
                }
                ansStr += (parseInt(i.split(",")[0].split("x")[0]) * parseInt(i.split(",")[0].split("x")[1])) + "\n"
            }
            c5.innerText = quesStr;
            c6.innerText = ((j.amtCorrect / j.amtQues) * 100) + "%";

        }
    }
}

// Task 4
const PlayGame = () => {

    document.getElementById("ansInp").value = ""
    // document.getElementById("theBox").style.opacity = 1
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 5) + 1;
    document.getElementById("num1").innerText = num1
    document.getElementById("num2").innerText = num2
    isChecked = false
    document.getElementById("next").removeAttribute("disabled")
    document.getElementById("check").removeAttribute("disabled")
    document.getElementById("ansInp").removeAttribute("disabled")
}

// Task 6
const checkAns = () => {

    if (!document.getElementById("ansInp").value) {
        document.getElementById("errors").innerText = `Please Answer Question!`
        return
    }

    const correctAns = parseInt(document.getElementById("num1").innerText) * parseInt(document.getElementById("num2").innerText)
    if (isChecked) {
        // document.getElementById("errors").innerText = `Question Checked Already! Answer is ${correctAns}`
        return
    }
    document.getElementById("errors").innerText = ""

    if (isNaN(document.getElementById("ansInp").value)) {
        alert("enter a number")
    } else {
        const userAns = parseInt(document.getElementById("ansInp").value)
        if (userAns == correctAns) {
            quesCorr += 1
            questions.unshift(`${num1} x ${num2},1`) //store question and 0 means incorrect and 1 means correct
            document.getElementById("correct").innerText = "Correct"
            setTimeout(() => {
                document.getElementById("correct").innerText = ""
            }, 1000)

        } else {
            quesIncorr += 1
            document.getElementById("errors").innerText = "Incorrect"
            questions.unshift(`${num1} x ${num2},0`) //store question and 0 means incorrect and 1 means correct

            setTimeout(() => {
                document.getElementById("errors").innerText = ""
            }, 1000)
        }
        isChecked = true


    }
    quesCount += 1


    let playerData;
    let currUserScores;
    let uid = localStorage.getItem("uid")
    // Only getting registration data to match with current user playing
    let playerRegistrationData = JSON.parse(localStorage.getItem("PlayerRegistrationData"))
    let scoreData;
    if (localStorage.getItem("Score")) {
        scoreData = JSON.parse(localStorage.getItem("Score"))
    }
    let currUser;
    for (data of playerRegistrationData) {
        if (data.id == uid) {
            currUser = data
        }
    }
   
    let userTempScoreData = {
        id: currUser.id,
        username: currUser.fname + " " + currUser.lname,
        date: new Date(),
        amtCorrect: quesCorr,
        amtQues: quesCount,
        amtIncorrect: quesIncorr,
        questions: questions,
        inSession: "true"
    }

    // console.log(userTempScoreData, "Sa")

    if (localStorage.getItem("tempScore")) {
        playerData = JSON.parse(localStorage.getItem("tempScore"))
        localStorage.setItem("tempScore", JSON.stringify([...playerData, userTempScoreData]))
    } else {
        localStorage.setItem("tempScore", JSON.stringify([userTempScoreData]))
    }
    
    if (scoreData) {
        
        for (data of scoreData) {
            if (uid == data.id) {
                currUserScores = data
            }
        }
        
        let tempArr = []
        let found = false;
        if(!currUserScores){
            tempArr.push(userTempScoreData)
            found = true
        }
        
        // console.log(currUserScores, "plot")
        for (let i = 0; i < scoreData.length; i++) {
            if(scoreData[i].inSession == "true"){
                tempArr.push(userTempScoreData)
                found = true
                continue
                
            }
            tempArr.push(scoreData[i])
            
        }
        if(!found){
            // console.log(data)
            tempArr.push(userTempScoreData)
        }
            console.log(tempArr, "temo")

        localStorage.setItem("Score", JSON.stringify(tempArr))
    
    }else{

        localStorage.setItem("Score", JSON.stringify([userTempScoreData]))
    }





    localStorage.setItem("questions", JSON.stringify(questions))
    localStorage.setItem("quesCount", quesCount)
    localStorage.setItem("quesCorr", quesCorr)
    localStorage.setItem("quesIncorr", quesIncorr)
    localStorage.setItem("fromallStats", "true")
    setTimeout(() => {
        showAllStats()
    }, 1000)
}

const endGame = () => {
    document.getElementById("ansInp").setAttribute("disabled", true)
    // document.getElementById("accept").setAttribute("disabled", true)
    document.getElementById("next").setAttribute("disabled", true)
    document.getElementById("check").setAttribute("disabled", true)
    // document.getElementById("theBox").style.opacity = .5
    document.getElementById("num1").innerText = ""
    document.getElementById("num2").innerText = ""
    // document.getElementById("submission").removeAttribute("disabled")
    document.getElementById("end").setAttribute("disabled", true)
    document.getElementById("start").setAttribute("disabled", true)

    // document.getElementById("theGame").style.animation = "disappear 1s linear 1 both";


    let playerData;
    let playerRegistrationData = JSON.parse(localStorage.getItem("PlayerRegistrationData"))
    let currUser;
    for (data of playerRegistrationData) {
        if (data.id == localStorage.getItem("uid")) {
            currUser = data
        }
    }
    let userData = {
        id: currUser.id,
        username: currUser.fname + " " + currUser.lname,
        amtCorrect: quesCorr,
        amtQues: quesCount,
        amtIncorrect: quesIncorr,
        questions: questions,
        inSession:"true"
    }
    if (localStorage.getItem("Score")) {
        playerData = JSON.parse(localStorage.getItem("Score"))
    }

    
    playerData ? localStorage.setItem("Score", JSON.stringify([...playerData, userData])) : localStorage.setItem("Score", JSON.stringify([userData]))
    
    let dataHolder = [];
    for(data of playerData){
        if(data.inSession == "true"){
            let temp = {...data,inSession:"false"}
            dataHolder.unshift(temp)

            continue
        }
        dataHolder.unshift(data)
        
    }
    localStorage.setItem("Score", JSON.stringify(dataHolder))

    localStorage.setItem("quesCount", 0)
    localStorage.setItem("questions", "")
    localStorage.setItem("quesCount", 0)
    localStorage.setItem("quesCorr", 0)
    localStorage.setItem("quesIncorr", 0)

    document.querySelector("body").style.animation = "disappear 1s linear 1 both";

    setTimeout(() => {
        location.href = "https://jaydbb.github.io/theMultipliers/personalStats.html"

    }, 1000)
}

const showAllStats = () => {
    document.querySelector("body").style.animation = "disappear 1s linear 1 both";

    setTimeout(() => {
        location.href = "https://jaydbb.github.io/theMultipliers/stats.html"

    }, 1000)

}


window.addEventListener("load", () => {
    if (localStorage.getItem("fromallStats") == "true") {
        PlayGame()
        localStorage.setItem("fromallStats", "false")
    }

    document.querySelector("body").style.animation = "appear 1s linear 1 both";

    if (localStorage.getItem("Score")) {
        let highest = 0;
        let highestData;
        let uid = parseInt(localStorage.getItem("uid"))
        for (score of JSON.parse(localStorage.getItem("Score"))) {
            if (score.amtCorrect > highest && uid == score.id) {
                highestData = score
                highest = score.amtCorrect
            }
        }
        if (highest != 0) {
            document.querySelector("#highscorePlayer").innerText = highestData.username + "'s \n Highest is " + highestData.amtCorrect + " out of " + highestData.amtQues + "\n >>Correct<<"
        }

    }
    showCharts()

    setInterval(() => {
        showCharts
    }, 5000)

})


const backToRegistration = () => {
    document.querySelector("body").style.animation = "disappear 1s linear 1 both";
    if(!/personalStats/.test(location.href)){
        endGame()
    }
    setTimeout(() => {
        location.href = "https://jaydbb.github.io/theMultipliers/index.html"
        alert(location.href)
    }, 1000)
}


function showCharts() {
    let maleBar = document.getElementById("male");
    let femaleBar = document.getElementById("female");
    let b50 = document.getElementById("50");
    let b59 = document.getElementById("50-59");
    let b69 = document.getElementById("60-69");
    let b79 = document.getElementById("70-79");
    let b89 = document.getElementById("80-89");
    let b99 = document.getElementById("90-99");
    let b100 = document.getElementById("100");

    let userData = JSON.parse(localStorage.getItem("PlayerRegistrationData"))
    let userScoreData;
    if (localStorage.getItem("Score")) {
        userScoreData = JSON.parse(localStorage.getItem("Score"))
    }

    let femaleCount = 0, maleCount = 0, genderCount = 0

    for (user of userData) {
        user.gender == "F" ? femaleCount += 1 : maleCount += 1
        genderCount += 1
    }


    let countGrade = 0, count50 = 0, count59 = 0, count69 = 0, count79 = 0, count89 = 0, count99 = 0, count100 = 0
    if (userScoreData) {
        for (score of userScoreData) {
            let percent = (score.amtCorrect / score.amtQues) * 100
            if (percent < 50) {
                count50 += 1;
            } else if (percent <= 59 && percent >= 50) {
                count59 += 1;
            } else if (percent <= 69 && percent >= 60) {
                count69 += 1;
            } else if (percent <= 79 && percent >= 70) {
                count79 += 1;
            } else if (percent <= 89 && percent >= 80) {
                count89 += 1;
            } else if (percent <= 99 && percent >= 90 ) {
                count99 += 1;
            } else if (percent == 100) {
                count100 += 1;
            }
            countGrade += 1;
        }
    }
    if (countGrade != 0) {
        b50.innerHTML = `<span style="display: flex; align-items: center;">50 <div style="background-color: #FE9F53; width: ${(count50 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b59.innerHTML = `<span style="display: flex; align-items: center;">50-59 <div style="background-color: #FE9F53; width: ${(count59 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b69.innerHTML = `<span style="display: flex; align-items: center;">60-69 <div style="background-color: #FE9F53; width: ${(count69 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b79.innerHTML = `<span style="display: flex;">70-79 <div style="background-color: #FE9F53;width: ${(count79 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b89.innerHTML = `<span style="display: flex; align-items: center;">80-89 <div style="background-color: #FE9F53; width: ${(count89 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b99.innerHTML = `<span style="display: flex;">90-99 <div style="background-color: #FE9F53; width: ${(count99 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        b100.innerHTML = `<span style="display: flex;">100 <div style="background-color: #FE9F53; width: ${(count100 / countGrade) * 100}px; height: 20px;margin-left: 40px;"></div></span>`
        document.getElementById("noDataGrade").innerText = ""
    }

    if (genderCount != 0) {
        maleBar.style = `background-color: #FE9F53; height: ${(maleCount / genderCount) * 100}px; width: 20px;margin-left: 20px; margin-bottom: -10px;`
        femaleBar.style = `background-color: #FE9F53; height: ${(femaleCount / genderCount) * 100}px; width: 20px;margin-left: 20px; margin-bottom: -10px;`
        document.getElementById("noDataGender").innerText = ""
    }

}


