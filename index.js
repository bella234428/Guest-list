const guestName = document.getElementById("guest-names");
const guestList = document.getElementById("guest-list");
 const maxGuests = 10;

function addGuest() {
    if (guestList.children.length >= maxGuests) {
        alert("Guest limit reached (10)");
        return;
    }

    if (guestName.value.trim() === '') {
        alert("Please enter a guest name.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = guestName.value.trim();
    guestList.appendChild(li);
    guestName.value = ''; // Clear the input field
}