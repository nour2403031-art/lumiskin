// ── Switch Sections ───────────────────────────────────────────────────────────
// Controls which section shows in the sidebar navigation
function showSection(name) {
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('productsSection').style.display  = 'none';
    document.getElementById('userSection').style.display      = 'none';

    document.getElementById(name + 'Section').style.display = 'block';
}

// ── Confirm Delete ────────────────────────────────────────────────────────────
// Called before deleting a product or user
function confirmDelete(url, message) {
    if (confirm(message)) {
        window.location.href = url;
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}