module.exports.validateInventoryRequest = body => {
    if(!body.name)
        return [false, "no name present"];
    
    if(!body.description)
        return [false, "no description present"];
    
    return [true];
};