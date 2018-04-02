export function validateField ($data, fieldName) {
  const rules = $data.val[fieldName].rules
  const value = $data[fieldName]
  let error = ''

  if (rules.includes('required') && !value) {
    error = 'Required field'
  } else if (rules.includes('email') && !isEmail(value)) {
    error = 'Invalid email'
  }

  $data.val[fieldName].error = error
}

export function validateForm ($data) {
  const val = $data.val
  let isFormValid = true

  // validate all fields that have validation rules
  for (var fieldName in val) {
    if (!val.hasOwnProperty(fieldName)) continue

    validateField($data, fieldName)

    if (val[fieldName].error) {
      isFormValid = false
    }
  }

  return isFormValid
}

function isEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
