const validateSignupData = (data) => {
    const errors = {};  
    if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim() === '') {
        errors.firstName = 'First name is required and must be a non-empty string';
    }else if (data.firstName.length < 3 || data.firstName.length > 20) {
        errors.firstName = 'First name must be between 3 and 20 characters';
    }
}
module.exports = { validateSignupData };