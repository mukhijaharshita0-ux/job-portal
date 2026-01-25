import User from "../models/user.models.js";

export const profilePage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email city"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        city: user.city,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
