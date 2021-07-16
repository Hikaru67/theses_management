<template>
  <a-spin :spinning="true" />
</template>

<script>

export default {
  middleware: ['guest']
}
</script>
