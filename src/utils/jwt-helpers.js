import jwt from "jsonwebtoken";

//Generate an access token and a refresh token for this database user
function jwtTokens({ username, type }) {
    const user = { username, type };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
    return { accessToken, refreshToken };
}

export { jwtTokens };
