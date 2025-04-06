document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById("name");
    if (nameInput) {
        nameInput.addEventListener("input", function(event) {
            this.value = this.value.replace(/[^A-Za-z0-9_-]/g, '');
        });
    }
});