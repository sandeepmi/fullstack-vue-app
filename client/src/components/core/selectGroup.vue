<template>
  <FormGroup :label="label" :name="name" :srOnly="srOnlyComputed" :error="error">
    <select
      v-bind="$attrs"
      v-model="selectedOption"
      :name="name"
      :class="cssClass"
      :readonly="plainText"
      :disabled="plainText"
      v-on="listeners"
      @blur="validateAsync">
      <option v-for="opt in options" :value="opt.value" :selected="opt.selected" :key="opt.value">{{opt.text}}</option>
    </select>
  </FormGroup>
</template>

<script>
import FormGroup from './FormGroup'
import { delay } from '@/helpers'

export default {
  props: {
    label: String,
    name: String,
    srOnly: {
      type: Boolean,
      default: true
    },
    plainText: Boolean,
    required: Boolean,
    value: String,
    options: Array
  },
  components: {
    FormGroup
  },
  data () {
    return {
      selectedOption: '',
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
    listeners () {
      var vm = this

      return Object.assign({},
        this.$listeners,
        {
          // This ensures that the component works with v-model
          input: function (event) {
            console.log('event', event.target.value)
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  },
  methods: {
    validate () {
      // validate required
      if (this.required && !this.selectedOption) {
        this.error = 'Required'
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
