function submitHandler(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let texter = document.getElementById("texter").value;

    if (name == ""){
        return alert("fill the name")
    } else if (email == "") {
        return alert("fill the email")
    }
     else if (phone == "") {
        return alert("fill the phone number")
    }
     else if (subject == "") {
        return alert("fill the subject")
    }
     else if (texter == "") {
        return alert("fill the Explanation")
    }

    const data = {
        name, email, phone, subject, texter
    }

    const yourEmail = "fathansyah240@gmail.com"

    let a = document.createElement("a");
    a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${yourEmail}&su=${subject}&body=${texter}`
    a.click();

    console.log(data);

}






























// const form = document.querySelector("form")
// form.addEventListener("submit", ()=> {

// })