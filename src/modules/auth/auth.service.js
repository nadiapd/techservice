exports.login = async payload => {

  const {
    email,
    password
  } = payload

  /**
   * Temporary Login
   */

  if (
    email === 'admin@gmail.com' &&
    password === 'admin123'
  ) {

    return {
      name: 'Administrator',
      email
    }
  }

  return null
}