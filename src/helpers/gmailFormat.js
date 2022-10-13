const ValidateEmail = (inputText) => {
    const mailformat = /^[\w.+\-]+@gmail\.com$/g ; // eslint-disable-line
    if(inputText.match(mailformat)){
        return true
    }
    return false
}

export default ValidateEmail

