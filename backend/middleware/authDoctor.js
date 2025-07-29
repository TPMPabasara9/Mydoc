import jwt from 'jsonwebtoken';


//doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        // Check token from different possible header formats
        const dToken = req.headers.dtoken ;
        

        if (!dToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. No token provided"
            });
        }

        // Verify the token
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
        
        // Attach doctor ID to request
        req.body.docId = decoded.id;
        next();
        
    } catch (error) {
        console.error('Authentication Error:', error.name, error.message);
        
        switch (error.name) {
            case 'TokenExpiredError':
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed: Token has expired"
                });
            case 'JsonWebTokenError':
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed: Invalid token"
                });
            default:
                return res.status(500).json({
                    success: false,
                    message: "Authentication failed: Server error"
                });
        }
    }
}

export default authDoctor;
