<template>
  <div class="main-list">
    <a-card>
      <template slot="title">
        <font-awesome-icon icon="user-friends" class="anticon" />
        User list
      </template>

      <p>card content</p>
      <p>card content</p>
      <p>card content</p>

      <template slot="extra">
        <a-button type="primary" ghost>
          <font-awesome-icon icon="plus-circle" class="width-1x" />
          New
        </a-button>
      </template>
    </a-card>
  </div>
</template>

<script>
export default {
  components: {
  },

  mixins: [
  ],

  data() {
    return {
    }
  },

  computed: {
  },

  mounted() {
  },

  methods: {
  }
}
</script>
