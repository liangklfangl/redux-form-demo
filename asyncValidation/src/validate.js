/**
 * validate是同步验证，必须return
 * @param  {[type]} values [description]
 * @return {[type]}        [description]
 */
const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

export default validate

