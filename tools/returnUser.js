module.exports = {
    returnUser: function(req){
        console.log(`from the func ${req}`)
        if(req){
            const userName = (req.user) ? req.user.name : ""; 
            return userName;
        }
    } 
}