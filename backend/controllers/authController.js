import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Google token is required"
            });
        }

        // Verify Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            sub,
            email,
            name,
            picture
        } = payload;

        // Find existing user
        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({
                googleId: sub,
                name,
                email,
                picture,
            });

        } else {
            user.name = name;
            user.picture = picture;
            user.googleId = sub;

            await user.save();
        }

        // Generate JWT
        const jwtToken = generateToken(user);

        // Store in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            });

        res.status(200).json({
            success: true,
            user,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};



export const getCurrentUser = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};




export const logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

};