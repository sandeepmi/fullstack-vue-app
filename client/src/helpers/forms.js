export function validateField ($data, fieldName) {
  const rules = $data.val[fieldName].rules
  const value = $data[fieldName]
  let error = ''

  // process rules
  for (var i = 0; i < rules.length; i++) {
    let rule = rules[i]
    if (typeof rule === 'string') {
      rule = { name: rule }
    }

    switch (rule.name) {
      case 'required':
        if (!value) {
          error = rule.message || 'Required field'
        }
        break
      case 'email':
        if (!isEmail(value)) {
          error = rule.message || 'Invalid email'
        }
        break
      case 'match':
        const matchValue = $data[rule.fieldName]
        if (value !== matchValue) {
          error = rule.message || 'Not a match'
        }
        break
    }

    if (error) break
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

    // check if this field has validation error
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
