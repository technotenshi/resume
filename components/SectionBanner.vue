<script setup lang="ts">
defineProps<{
  title: string
  image: string
}>()
</script>

<template>
  <section
    class="section-banner"
    :style="{ '--banner-image': `linear-gradient(180deg, rgba(248, 244, 237, 0.8), rgba(248, 244, 237, 0.9)), url(${image})` }"
  >
    <div class="section-banner__inner">
      <p class="eyebrow">Resume</p>
      <h2>{{ title }}</h2>
    </div>
  </section>
</template>
