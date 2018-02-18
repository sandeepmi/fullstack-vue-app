const msgs = {
  500: 'Error occurred, please try again later',
  404: 'Site unavailable, please try again later',
  401: 'Unauthorized',
  'default': 'Unexpected error occurred, please try again later'
}

export function getErrorMsg (response) {
  if (response.ok) return null

  const msg = msgs[response.status]

  return msg || msgs.default
}
