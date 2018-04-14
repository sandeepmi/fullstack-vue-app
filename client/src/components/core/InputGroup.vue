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
      @blur="validateAsync"
      ref="input" />
  </FormGroup>
</template>

<script>
import FormGroup from './FormGroup'
import { isEmail, delay } from '@/helpers'

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
    setFocus: Boolean,
    plainText: Boolean,
    required: Boolean,
    email: Boolean,
    matchValue: String
  },
  components: {
    FormGroup
  },
  data () {
    return {
      error: ''
    }
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
  },
  methods: {
    validate () {
      // validate required
      if (this.required && !this.value) {
        this.error = 'Required'
        return false
      }

      // validate email
      if (this.email && !isEmail(this.value)) {
        this.error = 'Invalid email'
        return false
      }

      // validate match
      if (this.matchValue && this.value !== this.matchValue) {
        this.error = 'Not a match'
        return false
      }

      this.error = ''
      return true
    },
    validateAsync () {
      delay(this.validate, 0)
    }
  }
}
</script>
