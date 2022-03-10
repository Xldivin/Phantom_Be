import { decodeToken,} from '../helpers/jwt';

export const checkAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(" ")[1];
        const payload = decodeToken(token);
        if (payload) {
            return next();
        }
        else{
            return res.status(401).json({ status: "fail", message: "Not Authorized" });
        }
    }
    else{
        return res.status(401).json({ status: "fail", message: "Not Authorized , please login" });
    }
};
export const checkAdminAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split(" ")[1];
        const payload = decodeToken(token);
        if (payload) {
            if (payload.role == "admin"){
                return next()
            }
            else{

            return res.status(401).json({   status: "fail",message: "You don't have permission to perform this action",});
            }
        }
        else{
            return res.status(401).json({ status: "fail", message: "Not Authorized" });
        }
    }
    else{
        return res.status(401).json({ status: "fail", message: "Not Authorized , please login" });
    }
};