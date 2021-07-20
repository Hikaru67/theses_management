<template>
  <a-result
    status="403"
    title="403"
    :sub-title="$t('error.403')"
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
