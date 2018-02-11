import AlertModal from '../components/core/AlertModal'

export function showModal ($root, component, props) {
  $root.$emit('showModal', {
    component: component,
    props: props
  })
}

export function closeModal ($root) {
  showModal($root, undefined, {})
}

export function showAlertModal ($root, options) {
  showModal($root, AlertModal, { options })
}
