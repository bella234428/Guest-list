const guestName = document.getElementById("guest-names");
const guestList = document.getElementById("guest-list");

function addTask(){
    if(guestName.value === ''){
        alert("You must right something!");
    }
     else{
        let li = document.createElement("li");
        li.innerHTML = guestName.value;
        guestList.appendChild(li);
     }
}