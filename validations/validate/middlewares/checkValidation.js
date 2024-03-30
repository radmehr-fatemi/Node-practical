const checkValidation = (er) => {
    const errors = {};
    const { error } = er;

    if ( !er?.error[0]  ) return er
    
    for (let i of error) {
        errors.error = i.toString().replace("Error: " ,"")
        console.log(i.Error);
    }

    return errors
}

module.exports = {
    checkValidation
}