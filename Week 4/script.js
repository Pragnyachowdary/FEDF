// =======================================
// TypeScript-like Interface (for understanding)
// interface User {
//    id: number;
//    name: string;
//    email: string;
// }
// =======================================
// API Layer (Async Programming)
const UserAPI = {
    fetchUsers: async function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve([
                        { id: 1, name: "pragnya", email: "pragnya@gmail.com" },
                        { id: 2, name: "akshaya", email: "akshaya@gmail.com" },
                        { id: 3, name: "sainidhi", email: "sainidhi@gmail.com" },
                        { id: 1, name: "sreshta", email: "sreshta@gmail.com" },
                        { id: 2, name: "abhi", email: "abhi@gmail.com" },
                        { id: 3, name: "kavya", email: "kavya@gmail.com" },
                        { id: 1, name: "koushik", email: "kousik@gmail.com" },
                        { id: 2, name: "ram", email: "ram@gmail.com" },
                        { id: 3, name: "surekha", email: "surekha@gmail.com" }

                    ]);
                } else {
                    reject("Failed to fetch users");
                }
            }, 2000);
        });
    }
};
// UI Layer
const UI = {
    displayUsers(users) {
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    }
};
// Controller Layer
async function loadUsers() {
    try {
        console.log("Loading users...");
        const users = await UserAPI.fetchUsers();
        UI.displayUsers(users);
        console.log("Users loaded successfully");
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}
