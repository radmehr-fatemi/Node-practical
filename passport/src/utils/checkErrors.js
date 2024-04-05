const checkErrors = (error) => {
    try {

        const resultError = {};

        if (Object.keys(error).length === 0) return error.toString();

        if (error?.errors && Object.keys(error.errors).length) {
            const { errors } = error;
            for (const i in errors) {
                resultError[i] = errors[i]?.properties?.message || errors[i].message
            }
            return resultError

        } else {
            return error
        }

    } catch (err) {
        return error.toString()
    }
}

module.exports = checkErrors