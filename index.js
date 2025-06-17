const guestName = document.getElementById("guest-names");
const guestList = document.getElementById("guest-list");

function addTask(){
    if(guestName.value === ''){
        alert("You must right something!")
    }
}