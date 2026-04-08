<script setup lang="ts">
import { resumeData } from '~/data/resume'
import { buildAbsoluteUrl, normalizeSiteUrl } from '~/utils/site'

const runtimeConfig = useRuntimeConfig()
const siteUrl = normalizeSiteUrl(runtimeConfig.public.siteUrl)
const canonicalUrl = buildAbsoluteUrl(siteUrl, '/')
const ogImageUrl = buildAbsoluteUrl(siteUrl, resumeData.profile.heroBackground)

useSeoMeta({
  title: resumeData.profile.title,
  description: resumeData.profile.summary,
  ogTitle: resumeData.profile.title,
  ogDescription: resumeData.profile.summary,
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: resumeData.profile.title,
  twitterDescription: resumeData.profile.summary,
  twitterImage: ogImageUrl,
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl },
  ],
})
</script>

<template>
  <div>
    <section class="header1 cid-s48MCQYojq mbr-fullscreen mbr-parallax-background" id="header1-f">
      <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255);" />

      <div class="align-center container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8">
            <h1 class="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>{{ resumeData.profile.name }}</strong></h1>
            <h2 class="mbr-section-title mbr-fonts-style mb-3 display-2">{{ resumeData.profile.location }}</h2>
            <p class="mbr-text mbr-fonts-style display-7">{{ resumeData.profile.summary }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="content1 cid-s48udlf8KU" id="content1-8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="title col-12 col-md-9">
            <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Objective</strong></h3>
            <h4 class="mbr-section-subtitle align-center mbr-fonts-style mb-4 display-7">{{ resumeData.objective }}</h4>
          </div>
        </div>
      </div>
    </section>

    <section class="contacts1 cid-sadcToqwYF" id="contacts1-17">
      <div class="container">
        <div class="mbr-section-head">
          <h3 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
            <strong>Contacts</strong>
          </h3>
        </div>
        <div class="row justify-content-center mt-4">
          <div v-for="contact in resumeData.contacts" :key="contact.label" class="card col-12 col-lg-6">
            <div class="card-wrapper">
              <div class="card-box align-center">
                <div class="image-wrapper">
                  <span class="mbr-iconfont mobi-mbri" :class="contact.iconClass" />
                </div>
                <h4 class="card-title mbr-fonts-style mb-2 display-2" :class="contact.titleClass">
                  <strong>{{ contact.label }}</strong>
                </h4>
                <p class="mbr-text mbr-fonts-style mb-2 display-4">{{ contact.detail }}</p>
                <h5 class="link mbr-fonts-style display-7" :class="contact.linkClass">
                  <a class="text-primary" :href="contact.href">{{ contact.actionLabel }}</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content4 cid-sad0o6ri0j mbr-parallax-background" id="content4-m">
      <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255);" />
      <div class="container">
        <div class="row justify-content-center">
          <div class="title col-md-12 col-lg-10">
            <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Experience</strong></h3>
          </div>
        </div>
      </div>
    </section>

    <section
      v-for="experience in resumeData.experience"
      :id="experience.id"
      :key="experience.id"
      :class="experience.sectionClass"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <h4 class="mbr-section-subtitle mbr-fonts-style mb-4 display-5">{{ experience.heading }}</h4>
            <p class="mbr-text mbr-fonts-style display-7">{{ experience.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="content15 cid-sad1xWqGC0" id="content15-p">
      <div class="container">
        <div class="row justify-content-center">
          <div class="card col-md-12 col-lg-10">
            <div class="card-wrapper">
              <div class="card-box align-left">
                <p class="mbr-text mbr-fonts-style display-7">{{ resumeData.experienceLinkText }}</p>
                <div class="mbr-section-btn mt-3">
                  <a class="btn btn-primary display-4" :href="resumeData.profile.linkedinUrl" target="_blank" rel="noreferrer">
                    my linkedIn profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      v-for="skill in resumeData.skills"
      :id="skill.id"
      :key="skill.id"
      :class="skill.sectionClass"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <h4 class="mbr-section-subtitle mbr-fonts-style mb-4 display-5">{{ skill.title }}</h4>
            <p class="mbr-text mbr-fonts-style display-7">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="content2 cid-sad3VJh75Z" id="content2-v">
      <div class="container-fluid">
        <div class="mbr-section-head">
          <h4 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2"><strong>Publications</strong></h4>
        </div>
        <div class="row mt-4">
          <div v-for="publication in resumeData.publications" :key="publication.title" class="item features-image сol-12 col-md-6 col-lg-3">
            <div class="item-wrapper">
              <div class="item-img">
                <img :src="publication.image" alt="" :title="publication.title">
              </div>
              <div class="item-content">
                <h5 class="item-title mbr-fonts-style display-7"><strong>{{ publication.title }}</strong></h5>
                <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">{{ publication.meta }}</h6>
              </div>
              <div class="mbr-section-btn item-footer mt-2">
                <a class="btn item-btn btn-primary display-7" :href="publication.href" target="_blank" rel="noreferrer">
                  Read More &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content15 cid-sad68BOwd6" id="content15-w">
      <div class="container">
        <div class="row justify-content-center">
          <div class="card col-md-12 col-lg-10">
            <div class="card-wrapper">
              <div class="card-box align-left">
                <p class="mbr-text mbr-fonts-style display-7">Many more articles at:</p>
                <div class="mbr-section-btn mt-3">
                  <a class="btn btn-primary display-4" :href="resumeData.publicationArchiveUrl" target="_blank" rel="noreferrer">
                    {{ resumeData.publicationArchiveUrl }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content4 cid-sad6APFB3b mbr-parallax-background" id="content4-x">
      <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255);" />
      <div class="container">
        <div class="row justify-content-center">
          <div class="title col-md-12 col-lg-10">
            <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Conferences and talks</strong></h3>
          </div>
        </div>
      </div>
    </section>

    <section class="content5 cid-sad6C9Br0u" id="content5-y">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <p class="mbr-text mbr-fonts-style display-7" v-html="resumeData.talksHtml" />
          </div>
        </div>
      </div>
    </section>

    <section class="content4 cid-sad7KrKsrJ mbr-parallax-background" id="content4-11">
      <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255);" />
      <div class="container">
        <div class="row justify-content-center">
          <div class="title col-md-12 col-lg-10">
            <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Brands and clients I've worked for</strong></h3>
          </div>
        </div>
      </div>
    </section>

    <section class="clients2 cid-sad7w5LgH5" id="clients2-z">
      <div class="container">
        <div class="row justify-content-center">
          <div v-for="client in resumeData.featuredClients" :key="client.title" class="card col-12 col-md-6 col-lg-3">
            <div class="card-wrapper">
              <div class="img-wrapper">
                <img :alt="client.title" :src="client.image">
              </div>
              <div class="card-box align-center">
                <h5 class="card-title mbr-fonts-style mb-3 display-7"><strong>{{ client.title }}</strong></h5>
                <p class="mbr-text mbr-fonts-style mb-4 display-4" v-html="client.description" />
                <div class="mbr-section-btn mt-3">
                  <a class="btn btn-primary-outline display-4" :href="client.href" target="_blank" rel="noreferrer">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="clients1 cid-saffdg5O3b" id="clients1-1a">
      <div class="images-container container">
        <div class="mbr-section-head" />
        <div class="row justify-content-center mt-4">
          <div v-for="logo in resumeData.logoWall" :key="logo.title" class="col-md-3 card">
            <a :href="logo.href" target="_blank" rel="noreferrer"><img :alt="logo.title" :src="logo.image"></a>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials2 cid-sad7Iesc5f" id="testimonials2-10">
      <div class="container">
        <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Testimonials</strong></h3>
        <div class="row justify-content-center">
          <div v-for="testimonial in resumeData.testimonials.featured" :key="testimonial.name" class="card col-12 col-md-6">
            <p class="mbr-text mbr-fonts-style mb-4 display-7" v-html="testimonial.quoteHtml" />
            <div class="d-flex mb-md-0 mb-4">
              <div class="image-wrapper">
                <img :alt="testimonial.name" :src="testimonial.image">
              </div>
              <div class="text-wrapper">
                <p class="name mbr-fonts-style mb-1 display-4"><strong>{{ testimonial.name }}</strong></p>
                <p class="position mbr-fonts-style display-4"><strong>{{ testimonial.role }}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TestimonialCarousel :items="resumeData.testimonials.carousel" />

    <section class="content4 cid-sad21wEKJq mbr-parallax-background" id="content4-q">
      <div class="mbr-overlay" style="opacity: 0.7; background-color: rgb(255, 255, 255);" />
      <div class="container">
        <div class="row justify-content-center">
          <div class="title col-md-12 col-lg-10">
            <h3 class="mbr-section-title mbr-fonts-style align-center mb-4 display-2"><strong>Education</strong></h3>
          </div>
        </div>
      </div>
    </section>

    <section class="content5 cid-sad2cnGXeO" id="content5-r">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 col-lg-10">
            <p class="mbr-text mbr-fonts-style display-7">
              <template v-for="(item, index) in resumeData.education" :key="item.title">
                <strong>{{ item.title }}</strong><br>{{ item.details }}<br><br v-if="index < resumeData.education.length - 1">
              </template>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
