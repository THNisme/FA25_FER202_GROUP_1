const BASE_URL = "http://localhost:5000/admins";

/**
* Admin login function (simulated with JSON Server)
* - Check if username/password matches in db.json
* - Do not throw errors (avoid crashing UI)
* - Return admin object if true, null if false
*/
export const loginAdmin = async (username, password) => {
    try {
        // Check input validity
        if (!username || !password) {
            console.warn("Missing username or password");
            return null;
        }

        // Call JSON Server API
        const res = await fetch(BASE_URL);

        if (!res.ok) {
            console.error("Unable to connect to server:", res.status);
            return null;
        }

        const admins = await res.json();

        // Check username/password
        const found = admins.find(
            (admin) =>
                admin.username?.toLowerCase() === username.toLowerCase() &&
                admin.password === password
        );

        // Return result
        if (found) {
            // Save to localStorage to keep session (optional)
            localStorage.setItem("admin", JSON.stringify(found));
            return found;
        }

        console.warn("Invalid username or password");
        return null;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

/**
* Check if admin is logged in
*/
export const getLoggedInAdmin = () => {
    try {
        const data = localStorage.getItem("admin");
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
};