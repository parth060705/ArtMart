// // services/authService.js
// export const login = async (email, password) => {
//   const res = await fetch("http://localhost:5000/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();
//   if (res.ok) {
//     localStorage.setItem("token", data.token);
//     return true;
//   } else {
//     throw new Error(data.error);
//   }
// };



// services/authService.js
export const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Login failed");
    }

    if (!data.token) {
      throw new Error("No token received from server");
    }

    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    console.error("Login error:", err.message);
    throw err;
  }
};

