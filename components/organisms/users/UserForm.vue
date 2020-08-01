<template>
  <div>xxx</div>
</template>

<style lang="scss" scoped>
.main-form {
  /deep/ {
    .card {
      border: 0;
      margin-bottom: 0;
    }
  }
}
</style>

<script>
// import { USER_STATUS_LIST } from '~/constants'

// import User from '~/models/User'
// import Role from '~/models/Role'

// import AppRadioGroup from '~/components/atoms/AppRadioGroup'
// import CreateEditForm from '~/mixins/create-edit-form'

// export default {
//   components: {
//     AppRadioGroup
//   },

//   mixins: [
//     CreateEditForm
//   ],

//   data() {
//     return {
//       model: new User(),
//       modelType: this.$t('user.user'),
//       rePassword: '',
//       roles: []
//     }
//   },

//   computed: {
//     /**
//      * User status list
//      *
//      * @param {array} - User status list
//      */
//     status() {
//       return USER_STATUS_LIST.map(item => {
//         return {
//           id: item.id,
//           name: this.$t(item.name)
//         }
//       })
//     }
//   },

//   watch: {
//     /**
//      * Watching changes of id
//      * Get detail
//      */
//     id(val) {
//       this.getDetail(val)
//     },

//     /**
//      * Watching changes of model.roleId
//      * get role id
//      */
//     'model.roleId'(val) {
//       const role = this.roles.filter(item => item.id === val)
//       this.model.roles = role
//     }
//   },

//   mounted() {
//     this.prepareData()
//     this.getDetail(+this.id)
//   },

//   methods: {
//     /**
//      * Dynamic set model
//      *
//      * @param {Object} data
//      */
//     setModel(data) {
//       this.model = new User(data)
//     },

//     /**
//      * Prepare data save user
//      */
//     prepareData() {
//       this.getRoleList()
//     },

//     /**
//      * Get role list
//      */
//     getRoleList() {
//       this.$dam.getRoleList()
//         .then(res => {
//           if (Array.isArray(res.data)) {
//             this.roles = res.data.map(item => new Role(item))
//           }
//         })
//         .catch(err => {
//           console.error(err)

//           this.$toast.error(
//             this.$t('messages.error.failed_to_get', { name: this.$t('role.role_list') })
//           )
//         })
//     }
//   }
// }
</script>
