const checkValidation = (err) => {
    let error = {};

    if ( !err?.details?.body ) return err
    
    err.details.body.map(e => {
        error = {
            massage: e.message.replace(/"/g ,""),
            key: e.context.key,
            type: e.type
        }
    })
    return error
}

module.exports = {
    checkValidation
}