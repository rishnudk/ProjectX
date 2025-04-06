function confirmDelete() {
    return confirm("Are you sure you want to delete this user?");
}

function searchUsers() {
    const query = document.getElementById('searchUser').value.trim();

    fetch(`/admin/search?q=${query}`)
        .then(response => response.json())
        .then(users => {
            const userTable = document.getElementById('userTable');
            userTable.innerHTML = ''; // Clear existing table content

            if (users.length === 0) {
                userTable.innerHTML = '<tr><td colspan="3" class="text-center">No users found.</td></tr>';
                return;
            }

            users.forEach(user => {
                userTable.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td class="action-buttons">
                            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#updateUserModal-${user._id}">
                                Update
                            </button>

                            <form action="/admin/user/${user._id}/delete" method="POST" class="d-inline">
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirmDelete()">Delete</button>
                            </form>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error searching users:', error));
}
