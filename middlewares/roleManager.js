module.exports = function (req, res, next) {
    // Uncomment for debugging purposes
    // console.log("User Role:", req.body);

    if (req.body.user.role === 'member' || req.body.user.role === 'super') {
        next(); // Proceed to the next middleware if the role is 'member' or 'super'
    } else {
        return res.status(403).send({ message: 'Access Denied: Only Sellers can perform this action.' });
    }
};
