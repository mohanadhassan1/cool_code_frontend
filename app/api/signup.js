import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password, linkedin } = req.body;

      if (!username || !email || !password || !linkedin) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      const response = await axios.post("http://localhost:3000/signUp", {
        username,
        email,
        password,
        linkedin,
      });

      res.status(response.status).json({ message: response.data.message });
    } catch (error) {
      res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
