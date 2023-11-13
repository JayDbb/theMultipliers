let isChecked = false

window.addEventListener("load", ()=>{
    localStorage.removeItem("tempScore")
    document.querySelector("body").style.animation = "appear 1s linear 1 both";
    if(localStorage.getItem("tempUserData")){
    let userData = JSON.parse(localStorage.getItem("tempUserData")) 
    document.getElementById("name").value = `${userData.fname} ${userData.lname}`
    document.getElementById("dob").value = userData.dob
    document.getElementById("genderInp").value = userData.gender
    document.getElementById("email").value = userData.email
    document.getElementById("age").value = new Date().getFullYear() - new Date(document.getElementById("dob").valueAsDate).getFullYear()
    }
})

document.getElementById("dob").addEventListener("focusout", e=>{
    let age = new Date().getFullYear() - new Date(e.target.valueAsDate).getFullYear()
    console.log(document.getElementById("submission").disabled)
    if (age > 12 || age < 8){
        document.getElementById("errorsReg").innerText += `Age invalid, must be between 8 and 12 inclusive \n`
        document.getElementById("submission").setAttribute("disabled",true)
        setTimeout(()=>{
            document.getElementById("errorsReg").innerText = ``
            }, 3000)  
    }else{
        document.getElementById("age").value = age;
        document.getElementById("errorsReg").innerText = ""
        document.getElementById("submission").removeAttribute("disabled")
       
    }
})

document.getElementById("personal-btn").addEventListener("click", ()=>{
    document.getElementById("container-1").style.animation = "disappear 1s linear 1 both";
    setTimeout(()=>{
        location.href = "theMultipliers/personalStats.html"

    }, 1000)
})

document.getElementById("email").addEventListener("focusout", e=>{
    let regEx = new RegExp("@gmail.com", "i");
    if(regEx.test(e.target.value)){
        document.getElementById("submission").removeAttribute("disabled")
        document.getElementById("errorsReg").innerText = ""

    }else{
        
        document.getElementById("errorsReg").innerText += `Email must have @gmail.com \n`
        document.getElementById("submission").setAttribute("disabled",true)
        setTimeout(()=>{
        document.getElementById("errorsReg").innerText = ``
        }, 3000)
    }
})

document.getElementById("name").addEventListener("focusout", e=>{
    const lname = document.getElementById("name").value.split(" ")[1]
    const fname = document.getElementById("name").value.split(" ")[0]
    if(!lname){
        document.getElementById("submission").setAttribute("disabled",true)
        document.getElementById("errorsReg").innerText += `Format of name:\"{First Name} {Last Name}\" \n`

    }else{
        document.getElementById("submission").removeAttribute("disabled")
        setTimeout(()=>{
        document.getElementById("errorsReg").innerText = ``
        }, 3000)
    }

    if(lname.length < 3 || fname.length < 3){
        document.getElementById("errorsReg").innerText += `Names too short\n First and last name must be min 3 chars each\n Format:\"{First Name} {Last Name}\" \n`
        document.getElementById("submission").setAttribute("disabled",true)
        setTimeout(()=>{
        document.getElementById("errorsReg").innerText = ``
        }, 5000)
    }else{
        document.getElementById("submission").removeAttribute("disabled")
    }
})

// Task 2
const Register = (e)=>{
    e.preventDefault()
    const email = document.getElementById("email").value
    const lname = document.getElementById("name").value.split(" ")[1]
    const fname = document.getElementById("name").value.split(" ")[0]

    
    if(!lname){
        document.getElementById("errorsReg").innerText += `Format of name:\"{First Name} {Last Name}\" \n`
        document.getElementById("submission").setAttribute("disabled",true)
        setTimeout(()=>{
            document.getElementById("errorsReg").innerText = ``
        }, 3000)
        return
    }

    if(lname.length < 3 || fname.length < 3){
        document.getElementById("errorsReg").innerText += `Names too short\n First and last name must be min 3 chars each\n Format:\"{First Name} {Last Name}\" \n`
        document.getElementById("submission").setAttribute("disabled",true)
        setTimeout(()=>{
        document.getElementById("errorsReg").innerText = ``
        }, 5000)
        return
    }
    const age = document.getElementById("age").value
    const dob = document.getElementById("dob").value
    const gender = document.getElementById("genderInp").value
    const userData = {
        email, lname, fname, age, dob, gender, date:new Date()
    }
    let playerData;
    if(localStorage.getItem("PlayerRegistrationData")){
        playerData = JSON.parse(localStorage.getItem("PlayerRegistrationData"))
        let found = false
        for(data of playerData){
            if(data.email == email){
                localStorage.setItem("uid", data.id);
                found = true

            }
        }

        if(!found){
            let newID = parseInt(playerData[playerData.length-1].id) + 1 //get whatever is the last ID in dataset
            localStorage.setItem("uid", newID)
            localStorage.setItem("PlayerRegistrationData", JSON.stringify([...playerData, {...userData, id:newID}]))
        }
    }else{
        localStorage.setItem("uid", 1)
        localStorage.setItem("PlayerRegistrationData", JSON.stringify([{...userData, id:1}]))
    } 


    // document.getElementById("submission").setAttribute("disabled",true)
    // document.getElementById("end").removeAttribute("disabled")
    // document.getElementById("start").removeAttribute("disabled")
    
    //Setting the form data, so it can be re-entered
    localStorage.setItem("tempUserData", JSON.stringify(userData))
    document.getElementById("container-1").style.animation = "disappear 1s linear 1 both";
   
    setTimeout(()=>{
        location.href = "/theMultipliers/game.html"

    }, 1000)

}


