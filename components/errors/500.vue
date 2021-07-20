<template>
  <a-result
    status="500"
    title="500"
    :sub-title="$t('error.500')"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="$router.push('/')"
      >
        {{ $t('common.home') }}
      </a-button>
    </template>
  </a-result>
</template>
<script>
