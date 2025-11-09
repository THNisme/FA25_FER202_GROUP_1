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
      // Thời hạn phiên (60 phút)
      const expiryTime = Date.now() + 60 * 60 * 1000;

      const sessionData = {
        admin: found,
        expiresAt: expiryTime,
      };

      // Lưu vào sessionStorage
      sessionStorage.setItem("adminSession", JSON.stringify(sessionData));

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
    const data = sessionStorage.getItem("adminSession");
    if (!data) return null;

    const { admin, expiresAt } = JSON.parse(data);

    // Kiểm tra thời hạn
    if (Date.now() > expiresAt) {
      sessionStorage.removeItem("adminSession");
      console.warn("Session expired");
      return null;
    }

    return admin;
  } catch {
    return null;
  }
};

/**
 * Logout admin (clear session)
 */
export const logoutAdmin = () => {
  sessionStorage.removeItem("adminSession");
};