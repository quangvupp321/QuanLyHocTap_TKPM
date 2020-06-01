module.exports = {
    errorHandle: Promise =>{
        return Promise.then(data => [data, undefined]).
        catch(err => [undefined, err]);
    },

    convertTime: milisecond =>{
        const second = Math.round(milisecond/1000);
        const day = Math.floor(second/(24*60*60));
        const hours = Math.floor((second - 24*60*60*day)/(60*60));
        const minutes = Math.floor((second- 24*60*60*day)%(60));      
        return `${day}d : ${hours}h : ${minutes}m`; 
    }, 
} 
