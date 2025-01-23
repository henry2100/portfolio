const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const UserSchema = require('../models/userModels');
const { sendPasswordResetEmail } = require('../middlewares/mailService');
const {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken } = require('../middlewares/authTokens');
const { errorMonitor } = require('connect-mongo');

const getAllUsers = async (req, res) => {
    try {
        // Get pageNumber and size from query params, ensuring non-negative, sensible defaults
        let pageNumber = parseInt(req.query.page);
        let size = parseInt(req.query.size);

        pageNumber = !isNaN(pageNumber) && pageNumber >= 0 ? pageNumber : 0;
        size = !isNaN(size) && size > 0 ? size : 10;

        const sortField = req.query.sort || 'createdAt'; // Default sort field
        const sortDirection = req.query.direction === 'desc' ? -1 : 1; // Sorting direction

        // Count total number of users
        const totalElements = await UserSchema.countDocuments();

        // Find users with pagination and sorting
        const users = await UserSchema.find()
            .sort({ [sortField]: sortDirection })
            .skip(pageNumber * size)
            .limit(size);

        // Calculate total pages (ensure it's at least 1)
        const totalPages = Math.max(Math.ceil(totalElements / size), 1);

        // Return paginated response
        return res.status(200).send({
            data: users,
            totalPages,
            totalElements,
            last: pageNumber >= totalPages - 1,
            size,
            pageNumber,
            sort: {
                empty: !users.length,
                sorted: true,
                unsorted: false
            },
            message: "Success"
        });
    } catch (error) {
        return res.status(500).send({ 
            message: error.message
         });
    }
};


const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserSchema.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        } else {
            return res.status(200).send(
                {
                    data: user,
                    message: "User retrieved successfully"
                }
            );
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const editedUser = await UserSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!editedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({
            data: editedUser,
            message: "User profile updated successfully"
        })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const searchUsers = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            birthDate,
            role,
            department,
            isActive,
            createdOnStartDate,
            createdOnEndDate,
            page = 1,
            size = 10,
            sort = 'createdAt',
            direction = 'desc'
        } = req.query;

        // Build search criteria
        const searchCriteria = {};
        if (name) searchCriteria.name = new RegExp(name, 'i'); // case-insensitive regex
        if (email) searchCriteria.email = new RegExp(email, 'i');
        if (phone) searchCriteria.phone = new RegExp(phone, 'i');
        if (address) searchCriteria.address = new RegExp(address, 'i');
        if (birthDate) searchCriteria.birthDate = new Date(birthDate);
        if (role) searchCriteria.role = role;
        if (department) searchCriteria.department = department;
        if (isActive !== undefined) searchCriteria.isActive = isActive;

        if (createdOnStartDate || createdOnEndDate) {
            searchCriteria.createdAt = {};
            if (createdOnStartDate) searchCriteria.createdAt.$gte = new Date(createdOnStartDate);
            if (createdOnEndDate) searchCriteria.createdAt.$lte = new Date(createdOnEndDate);
        }

        const pageNumber = Math.max(1, parseInt(page));
        const limit = Math.max(1, parseInt(size));
        const sortDirection = direction === 'desc' ? -1 : 1;

        const totalElements = await UserSchema.countDocuments(searchCriteria);

        const searchedUsers = await UserSchema.find(searchCriteria)
            .sort({ [sort]: sortDirection })
            .skip((pageNumber - 1) * limit)
            .limit(limit)
            .select('name email phone isActive createdAt');

        const totalPages = Math.ceil(totalElements / limit);

        res.status(200).json({
            data: searchedUsers,
            totalPages,
            totalElements,
            last: pageNumber >= totalPages,
            size: limit,
            pageNumber,
            sort: {
                empty: searchedUsers.length === 0,
                sorted: true,
                unsorted: false,
            },
            message: searchedUsers.length === 0 ? "No results found" : "Success",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const doesUserExist_by_email = await UserSchema.findOne({ email }); 

        if (doesUserExist_by_email) {
            return res.status(400).send({ message: `${email} has already been registered` });
        } else {
            const hashedPasswd = await bcrypt.hash(req.body.password, 10);

            const newUser = new UserSchema({
                ...req.body,
                password: hashedPasswd
            });

            await newUser.save();
            return res.status(200).send({ message: "New User created successfully" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("req.session:", req.session);

    const user = await UserSchema.findOne({ email });

    if (user) {
        const userPasswd = await bcrypt.compare(password, user.password);

        if (userPasswd) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            req.session.userId = user._id;
            req.session.isAuthenticated = true;
            req.session.save((err) => {
                if (err) {
                    return res.status(500).send({ message: "Failed to save session" });
                }
                res.status(200).send({
                    data: user,
                    token: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        session: req.session
                    },
                    message: "Authentication Successful"
                });
            });
        } else {
            res.status(401).send({ message: "Incorrect password" });
        }
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

const forgotPasswordHandler = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserSchema.findOne({ email });
        // console.log("User:", user);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } else {
            const resetToken = await generateResetToken(user);
            // console.log("resetToken:", resetToken);

            const mailStatus = await sendPasswordResetEmail(email, resetToken);
            console.log("mailStatus:", mailStatus);

            // console.log("results:", {
            //     resetToken: resetToken,
            //     mailStatus: mailStatus
            // });

            res.status(200).send({
                data: resetToken,
                message: "Success, an OTP has been sent to your mail"
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

const verifyPasswordReset = async (req, res) => {
    try {
        const { token } = req.params;
        const isTokenValid = await veryResetToken(token);

        if (!isTokenValid) return res.status(401).send({ message: "Invalid token!" });

        res.status(200).send({
            data: isTokenValid,
            message: 'Success'
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUserInfo,
    searchUsers,
    addUser,
    loginUser,
    logoutUser,
    forgotPasswordHandler,
    verifyPasswordReset
};