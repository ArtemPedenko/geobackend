import jwt from "jsonwebtoken";

function decodeToken(cookie: string) {
    const accessToken = cookie.split(';');
    const token = accessToken.filter((word => word.indexOf('accessToken')> -1))[0].split('=')[1];
    const decodedToken: any = jwt.decode(token);
    return decodedToken;
}

export {decodeToken}