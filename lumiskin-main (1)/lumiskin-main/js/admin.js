// Initial User Data
let users = [
    { id: 1, name: "Noura Admin", email: "noura@lumiskin.com", role: "Admin" },
    { id: 2, name: "Lina Skin", email: "lina@test.com", role: "Customer" }
];

// Load Data into Table
function renderUsers() {
    const table = document.getElementById('userTable');
    const countDisplay = document.getElementById('userCount');
    
    if (countDisplay) countDisplay.innerText = users.length;
    
    if (table) {
        table.innerHTML = users.map(user => `
            <tr>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td><span style="color: rgb(163, 108, 69); font-weight:bold;">${user.role}</span></td>
                <td>
                    <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn-remove" onclick="removeUser(${user.id})">Remove</button>
                </td>
            </tr>
        `).join('');
    }
}

// Add or Update User
function handleUserSubmit() {
    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    if (!name || !email) {
        alert("Please provide both a Name and an Email.");
        return;
    }

    if (id) {
        // EDIT Mode
        const index = users.findIndex(u => u.id == id);
        users[index].name = name;
        users[index].email = email;
        
        // Reset button to Add Mode
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerText = "Add User";
        submitBtn.style.background = "rgb(163, 108, 69)";
        document.getElementById('editUserId').value = "";
    } else {
        // ADD Mode
        users.push({ id: Date.now(), name, email, role: "Customer" });
    }

    // Clear Inputs
    document.getElementById('userName').value = "";
    document.getElementById('userEmail').value = "";
    renderUsers();
}

// Populate form for editing
function editUser(id) {
    const user = users.find(u => u.id == id);
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('editUserId').value = user.id;
    
    const btn = document.getElementById('submitBtn');
    btn.innerText = "Update User";
    btn.style.background = "rgb(147, 97, 62)";
}

// Remove User
function removeUser(id) {
    if(confirm("Are you sure you want to remove this user from Lumiskin?")) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }
}

// Switch between Dashboard and Users
function showSection(section) {
    document.getElementById('dashboardSection').style.display = section === 'dashboard' ? 'block' : 'none';
    document.getElementById('userSection').style.display = section === 'users' ? 'block' : 'none';
}

// Initialize on page load
window.onload = renderUsers;
