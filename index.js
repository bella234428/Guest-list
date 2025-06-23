document.addEventListener('DOMContentLoaded', function() {
    const guestForm = document.getElementById('guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const guestList = document.getElementById('guest-list');
    const guestCount = document.getElementById('guest-count');
    
    let guests = [];
    
    guestForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;
        
        if (!name) {
            alert('Please enter a guest name');
            return;
        }
        
        if (guests.length >= 10) {
            alert('Guest list is full (maximum 10 guests)');
            return;
        }
        
        const newGuest = {
            id: Date.now(),
            name,
            category,
            attending: true,
            timestamp: new Date()
        };
        
        guests.push(newGuest);
        updateGuestList();
        
        guestNameInput.value = '';
        guestNameInput.focus();
    });
    
    function updateGuestList() {
        guestList.innerHTML = '';
        guestCount.textContent = guests.length;
        
        guests.forEach(guest => {
            const li = document.createElement('li');
            li.className = `guest-item ${guest.attending ? 'attending' : 'not-attending'}`;
            
            const timestampStr = guest.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            li.innerHTML = `
                <span>
                    ${guest.name}
                    <span class="category-tag ${guest.category}">${guest.category}</span>
                    <span class="timestamp">added at ${timestampStr}</span>
                </span>
                <div class="guest-actions">
                    <button class="rsvp-btn" data-id="${guest.id}">
                        ${guest.attending ? 'Attending' : 'Not Attending'}
                    </button>
                    <button class="edit-btn" data-id="${guest.id}">Edit</button>
                    <button class="delete-btn" data-id="${guest.id}">Remove</button>
                </div>
            `;
            
            guestList.appendChild(li);
        });
        
        // Add event listeners to all buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                guests = guests.filter(guest => guest.id !== id);
                updateGuestList();
            });
        });
        
        document.querySelectorAll('.rsvp-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const guest = guests.find(g => g.id === id);
                if (guest) {
                    guest.attending = !guest.attending;
                    updateGuestList();
                }
            });
        });
        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const guest = guests.find(g => g.id === id);
                if (guest) {
                    const newName = prompt('Edit guest name:', guest.name);
                    if (newName && newName.trim() !== '') {
                        guest.name = newName.trim();
                        updateGuestList();
                    }
                }
            });
        });
    }
});