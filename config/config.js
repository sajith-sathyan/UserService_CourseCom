export default {
    port:process.env.PORT || 4040,
    

    mongo:{
      uri:process.env.MONGO_URI || "mongodb://localhost:27017/coursecom_userauth"
    },
    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
}