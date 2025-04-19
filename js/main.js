document.addEventListener('DOMContentLoaded', function() {
    // Navegación principal
    document.getElementById('virtual-btn').addEventListener('click', function() {
        window.location.href = 'virtual.html';
    });
    
    document.getElementById('non-virtual-btn').addEventListener('click', function() {
        window.location.href = 'non-virtual.html';
    });
});