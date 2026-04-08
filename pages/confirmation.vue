<script setup lang="ts">
import { resumeData } from '~/data/resume'
import { buildAbsoluteUrl, normalizeSiteUrl } from '~/utils/site'

const runtimeConfig = useRuntimeConfig()
const siteUrl = normalizeSiteUrl(runtimeConfig.public.siteUrl)
const canonicalUrl = buildAbsoluteUrl(siteUrl, '/confirmation')
const ogImageUrl = buildAbsoluteUrl(siteUrl, '/legacy/images/background9.jpg')

useSeoMeta({
  title: 'Meeting confirmation',
  description: 'Thanks for scheduling. I am looking forward to chat with you.',
  ogTitle: 'Meeting confirmation',
  ogDescription: 'Thanks for scheduling. I am looking forward to chat with you.',
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl },
  ],
})
</script>

<template>
  <section class="header5 cid-sajGMvoqda mbr-fullscreen" id="header5-1c">
    <div class="container">
      <div class="row justify-content-end">
        <div class="col-12 col-lg-7">
          <h1 class="mbr-section-title mbr-fonts-style mbr-white mb-3 display-1"><strong>Thanks for scheduling!</strong></h1>
          <p class="mbr-text mbr-fonts-style mbr-white display-7">I'm looking forward to chat with you.</p>
          <div class="mbr-section-btn mt-3">
            <a class="btn btn-warning display-7" href="/">Take a look to my resume</a>
            <a class="btn btn-warning-outline display-7" :href="resumeData.profile.linkedinUrl" target="_blank" rel="noreferrer">
              Check my linkedIn profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
