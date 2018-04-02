<template>
  <FormGroup :label="label" :name="name" :srOnly="srOnlyComputed" :error="error">
    <input
      v-bind="$attrs"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="label"
      :class="cssClass"
      :readonly="plainText"
      v-on="inputListeners"
      ref="input" />
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
    setFocus: Boolean,
    plainText: Boolean
  },
  components: {
    FormGroup
  },
  computed: {
    cssClass () {
      return {
        error: !!this.error,
        'form-control': !this.plainText,
        'form-control-plaintext': this.plainText
      }
    },
    srOnlyComputed () {
      // show label for plain text input fields
      if (this.plainText) {
        return false
      } else {
        return this.srOnly
      }
    },
    inputListeners () {
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
