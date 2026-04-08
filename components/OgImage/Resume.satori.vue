<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  description: string
}>()
</script>

<template>
  <div
    style="
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(135deg, #1f2a44 0%, #2f6ea6 55%, #f2d57e 100%);
      color: #ffffff;
      padding: 72px;
      font-family: 'Jost', 'Segoe UI', sans-serif;
    "
  >
    <div
      style="
        display: flex;
        align-self: flex-start;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.14);
        padding: 10px 18px;
        font-size: 28px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      "
    >
      {{ eyebrow }}
    </div>

    <div style="display: flex; flex-direction: column; gap: 18px; max-width: 920px;">
      <div style="font-size: 88px; font-weight: 700; line-height: 1.02;">
        {{ title }}
      </div>
      <div style="font-size: 40px; font-weight: 500; opacity: 0.92;">
        {{ subtitle }}
      </div>
      <div style="font-size: 28px; line-height: 1.45; max-width: 860px; opacity: 0.92;">
        {{ description }}
      </div>
    </div>

    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        opacity: 0.9;
      "
    >
      <div>Resume Site</div>
      <div>nuxt + seo</div>
    </div>
  </div>
</template>
