const svcErrorMsgs = {
  500: 'Error occurred, please try again later',
  404: 'Site unavailable, please try again later',
  401: 'Unauthorized',
  'default': 'Unexpected error occurred, please try again later'
}

const messages = {
  items: {
    noItems: 'There are no items at this time.',
    editSuccess: 'Item has been saved succesfully.',
    deleteSuccess: 'Item has been deleted succesfully.'
  }
}

export { messages }

export function getErrorMsg (svcResponse) {
  if (svcResponse.ok) return null

  const msg = svcErrorMsgs[svcResponse.status]

  return msg || svcErrorMsgs.default
}
