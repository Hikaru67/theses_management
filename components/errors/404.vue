<template>
  <a-result
    status="404"
    title="404"
    :sub-title="$t('error.404')"
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
