<template>
  <FormGroup :label="label" :name="name" :srOnly="srOnly" :error="error">
    <input
      v-bind="$attrs"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="label"
      :class="{ error: !!error }"
      v-on="inputListeners"
      ref="input"
      class="form-control" />
  </FormGroup>
</template>

<script>
import FormGroup from './FormGroup'

export default {
  props: {
    label: String,
    name: String,
    srOnly: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    error: String,
    setFocus: Boolean
  },
  components: {
    FormGroup
  },
  computed: {
    inputListeners: function () {
      var vm = this

      return Object.assign({},
        this.$listeners,
        {
          // This ensures that the component works with v-model
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  mounted () {
    // set focus
    if (this.setFocus) {
      this.$refs.input.focus()
    }
  }
}
</script>
