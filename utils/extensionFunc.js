module.exports = {
    errorHandle: Promise =>{
        return Promise.then(data => [data, undefined]).
        catch(err => [undefined, err]);
    },

    convertTime: milisecond =>{
        var remain = milisecond;
        const second = Math.round(remain/1000);
        remain = second;
        const day = Math.floor(remain/(24*60*60));
        remain = remain - day*24*60*60;
        const hours = Math.floor(remain/(60*60));
        remain = remain - hours*60*60;
        const minutes = Math.floor(remain/(60));      
        remain = remain - minutes*60;
        const seconds = remain;
        return `${day}d : ${hours}h : ${minutes}m`; 
    }, 
} 
