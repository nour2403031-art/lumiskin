// ── Auth Guard ───────────────────────────────────────────────────────────────
// Redirect to login if the session flag isn't set


// ── Logout ───────────────────────────────────────────────────────────────────


// ── User Data ────────────────────────────────────────────────────────────────
let users = [
    { id: 1, name: 'Noura Admin', email: 'noura@lumiskin.com', role: 'Admin' },
    { id: 2, name: 'Lina Skin', email: 'lina@test.com', role: 'Customer' }
];

// ── Render Users Table ───────────────────────────────────────────────────────
function renderUsers() {
    const table = document.getElementById('userTable');
    const countDisplay = document.getElementById('userCount');

    if (countDisplay) countDisplay.innerText = users.length;

    if (!table) return;

    table.innerHTML = users.map(user => `
        <tr>
            <td><strong>${escapeHtml(user.name)}</strong></td>
            <td>${escapeHtml(user.email)}</td>
            <td><span style="color:rgb(163,108,69);font-weight:bold;">${escapeHtml(user.role)}</span></td>
            <td>
                <button class="btn-edit"   onclick="editUser(${user.id})">Edit</button>
                <button class="btn-remove" onclick="removeUser(${user.id})">Remove</button>
            </td>
        </tr>
    `).join('');
}

// ── Add / Update User ────────────────────────────────────────────────────────
function handleUserSubmit() {
    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !email) {
        alert('Please provide both a Name and an Email.');
        return;
    }

    if (id) {
        // Edit mode
        const index = users.findIndex(u => u.id == id);
        if (index !== -1) {
            users[index].name = name;
            users[index].email = email;
        }
        resetForm();
    } else {
        // Add mode
        users.push({ id: Date.now(), name, email, role: 'Customer' });
    }

    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    renderUsers();
}

// ── Populate Form for Editing ─────────────────────────────────────────────────
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('editUserId').value = user.id;

    const btn = document.getElementById('submitBtn');
    btn.innerText = 'Update User';
    btn.style.background = 'rgb(147, 97, 62)';
    btn.classList.remove('btn-add');
    btn.classList.add('btn-edit');
}

// ── Remove User ───────────────────────────────────────────────────────────────
function removeUser(id) {
    if (confirm('Are you sure you want to remove this user?')) {
        users = users.filter(u => u.id !== id);
        renderUsers();
    }
}

// ── Switch Sections ───────────────────────────────────────────────────────────
function showSection(section) {
    document.getElementById('dashboardSection').style.display =
        section === 'dashboard' ? 'block' : 'none';
    document.getElementById('userSection').style.display =
        section === 'users' ? 'block' : 'none';

    if (section === 'users') resetForm();
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function resetForm() {
    document.getElementById('editUserId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';

    const btn = document.getElementById('submitBtn');
    btn.innerText = 'Add User';
    btn.style.background = 'rgb(163, 108, 69)';
    btn.classList.add('btn-add');
    btn.classList.remove('btn-edit');
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', renderUsers);
