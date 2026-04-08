<script setup lang="ts">
import type { ResumeTestimonial } from '~/data/resume'

defineProps<{
  items: ResumeTestimonial[]
}>()
</script>

<template>
  <section
    id="testimonials3-1b"
    class="testimonails3 carousel slide testimonials-slider cid-safi7GNLqA"
    data-interval="false"
  >
    <div class="text-center container">
      <div
        id="testimonials3-1b-carousel"
        class="carousel slide"
        data-interval="8000"
        data-keyboard="false"
        data-pause="true"
        data-ride="carousel"
        role="listbox"
      >
        <div class="carousel-inner">
          <div
            v-for="item in items"
            :key="item.name"
            class="carousel-item"
          >
            <div class="user col-md-8">
              <div class="user_image">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="user_text mb-4">
                <p
                  v-for="(paragraph, index) in item.quote"
                  :key="`${item.name}-quote-${index}`"
                  class="mbr-fonts-style display-7"
                >
                  {{ paragraph }}
                </p>
              </div>
              <div class="user_name mbr-fonts-style mb-2 display-7">
                <strong>{{ item.name }}</strong>
              </div>
              <div class="user_desk mbr-fonts-style display-7">
                {{ item.role }}
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-controls">
          <a
            class="carousel-control-prev"
            data-slide="prev"
            role="button"
          >
            <span aria-hidden="true" class="mobi-mbri mobi-mbri-arrow-prev mbr-iconfont" />
            <span class="sr-only">Previous</span>
          </a>

          <a
            class="carousel-control-next"
            data-slide="next"
            role="button"
          >
            <span aria-hidden="true" class="mobi-mbri mobi-mbri-arrow-next mbr-iconfont" />
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
