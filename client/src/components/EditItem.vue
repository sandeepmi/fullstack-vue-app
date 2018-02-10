<template>
  <div class="card">
    <div class="card-content">
      <h2>Edit Item</h2>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input id="item_title" type="text" v-model="item.title" class="validate">
              <label for="item_title" class="active">Title</label>
            </div>
            <div class="input-field col s6">
              <input id="item_type" type="text" v-model="item.type" class="validate">
              <label for="item_type" class="active">Type</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
              <a class="btn waves-effect waves-light" @click="$emit('cancel')">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditItem',
  props: ['item'],
  data () {
    return {}
  }
}
</script>
