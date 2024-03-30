const checkValidation = (er) => {
    const {error:err} = er;
    let error = {};

console.log("Check---------" ,err);
    if ( !err?.details ) return err
    
    err.details.map(e => {
        error = {
            massage: e.message.replace(/"/g ,""),
            type: e.type,
            path: e.path.length == 1 ? e.path[0] : e.path
        }
    })
    return error
}

module.exports = {
    checkValidation
}