window.addEventListener("load",()=>{
    let allRegData = JSON.parse(localStorage.getItem("PlayerRegistrationData"))
    let allScoreData = JSON.parse(localStorage.getItem("Score"))
    let table = document.querySelector("tbody")
    console.log(allRegData)
    console.log(allScoreData)
    for(j of allScoreData){
        for(i of allRegData){
            if( j.id == i.id){
            let row = table.insertRow(1)
            let c1 = row.insertCell(0)
            let c2 = row.insertCell(1)
            let c3 = row.insertCell(2)
            let c4 = row.insertCell(3)
            let c5 = row.insertCell(4)
            let c6 = row.insertCell(5)
            let c7 = row.insertCell(6)
            let c8 = row.insertCell(7)
            let c9 = row.insertCell(8)
            let c10 = row.insertCell(9)



            let date = new Date(i.date)
            c1.innerText = j.username;
            c2.innerText = date.getDate() + "/"+ date.getMonth() + "/" + date.getFullYear()+ " - " + date.getHours()+":"+date.getMinutes()
            c3.innerText = i.gender;
            c4.innerText = i.age;
            c5.innerText = j.amtCorrect;
            c6.innerText = j.amtIncorrect;
            c7.innerText = j.amtQues;
            let quesStr = ""
            let ansStr = ""
            for(i of j.questions){
                if(i.split(",")[1] == "1"){
                    quesStr += i.split(",")[0] + " >>correct<< \n"
                    
                }else{
                    quesStr += i.split(",")[0] + " >>incorrect<< \n"
                }
                ansStr += (parseInt(i.split(",")[0].split("x")[0]) * parseInt(i.split(",")[0].split("x")[1])) + "\n"
            }
            c8.innerText = quesStr
            c9.innerText = ansStr
            c10.innerText = Math.round((j.amtCorrect/j.amtQues)*100) + "%";
}
        }
    }
})


document.getElementById("bk-game").addEventListener("click",()=>{
    console.log("hey")
    document.querySelector("body").style.animation = "disappear 1s linear 1 both";
   
    setTimeout(()=>{
        location.href = "https://jaydbb.github.io/theMultipliers/game.html"

    }, 1000)
})

document.getElementById("bk-reg").addEventListener("click",()=>{
    document.querySelector("body").style.animation = "disappear 1s linear 1 both";
   
    setTimeout(()=>{
        location.href = "https://jaydbb.github.io/theMultipliers/index.html"

    }, 1000)
})


window.addEventListener("load", ()=>{
    document.querySelector("body").style.animation = "appear 1s linear 1 both";
})