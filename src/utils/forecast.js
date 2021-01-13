const request  = require('request');
const forecast = (latitude,longitude,callback)=>{
    const url =  `http://api.weatherstack.com/current?access_key=b4bdc29d1aae0890cc5f3f32c838ff80&query=${latitude},${longitude}&units=f`;
        
        request({url, json:true}, (error,{body})=>{
        if(error){
           
            callback('Unable to connect to the weather service');
        }else if(body.error){
            callback(body.error.info);
        }
        else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike,
                visibility:body.current.visibility
            });
        }
    })
}
module.exports = forecast;