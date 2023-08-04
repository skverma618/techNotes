const allowedOrigins = require('./allowedOrigins')

const corsOptions =  {
    origin : (origin, callback) => {
        // !origin for postman req which do not have any origin
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('not allowed by CORS'));
        }
    },
    credentials : true, // 54:05
    optionsSuccessStatus: 200,

}

module.exports = corsOptions;