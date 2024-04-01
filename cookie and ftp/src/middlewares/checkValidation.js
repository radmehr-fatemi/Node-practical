const checkValidation = (er) => {
    let errors = {};

    if ( er?.massage ) return er;
    
    if (!er?.error) {
        errors.error = er.toString().replace("Error: ", "")

    } else {
        for (let i of er.error) {
            errors.error = i.toString().replace("Error: ", "")
        }
    }

    if (!Object.keys(errors).length) return er

    return errors
}

module.exports = {
    checkValidation
}