export function showModal ($root, component, props) {
  $root.$emit('showModal', {
    component: component,
    props: props
  })
}

export function closeModal ($root) {
  showModal($root, undefined, {})
}
