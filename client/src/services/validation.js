export default function validateUser(user) {
  const { username: name, email, password } = user
  const isValidName = name => name.length >= 2
  const emailRegEx = /.*@(.+\..+)/gi
  const isValidEmail = emailRegEx.test(email)
  const passwordRegEx = /(?=.*[A-Z]).{8,}/g
  const isValidPassword = passwordRegEx.test(password)
  if (name) {
    const isValidUserToRegister =
      isValidEmail && isValidPassword && isValidName(name)
    return isValidUserToRegister
  } else {
    const isValidUser = isValidEmail && isValidPassword
    return isValidUser
  }
}
