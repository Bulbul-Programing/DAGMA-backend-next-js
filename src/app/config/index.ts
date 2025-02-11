import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path : path.join((process.cwd(), '.env'))})

export default {
    NODE_ENV : process.env.NODE_ENV,
    port : process.env.PORT,
    database_url : process.env.DATABASE_URL,
    accessTokenSecrete : process.env.ACCESS_TOKEN_SECRETE,
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
}
