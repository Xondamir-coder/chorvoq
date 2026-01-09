<template>
  <section class="hero">
    <div class="hero__video-wrapper">
      <video autoplay loop muted playsinline class="hero__video">
        <!-- Desktop: Full HD -->
        <source src="/videos/hero-1080p.mp4" type="video/mp4" media="(min-width: 1280px)" />
        <!-- Tablet: HD -->
        <source src="/videos/hero-720p.mp4" type="video/mp4" media="(min-width: 768px)" />
        <!-- Mobile: SD -->
        <source src="/videos/hero-480p.mp4" type="video/mp4" media="(max-width: 767px)" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="hero__content">
      <div class="hero__content-texts">
        <h1 class="hero__title">Chorvoq Darvozasi</h1>
        <h2 class="hero__subtitle">
          {{ $t('home-hero-subtitle-1') }} <br />
          <span class="big">
            {{ $t('home-hero-subtitle-2') }}
          </span>
        </h2>
      </div>
      <div class="hero__buttons">
        <NuxtLink :to="$localePath('/genplan')" class="hero__button">{{
          $t('select-apartment')
        }}</NuxtLink>
        <button @click="showModal = true" class="hero__button">
          {{ $t('contact-us') }}
        </button>
      </div>
    </div>
  </section>
  <ModalForm v-model="showModal" />
</template>

<script setup>
const showModal = ref(false);
</script>

<style lang="scss" scoped>
@keyframes slide-from-top {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slide-from-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes slide-from-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero {
  display: grid;
  height: 100vh;
  overflow: hidden;

  & > * {
    grid-area: 1/1/2/2;
  }
  &__button {
    flex: 1;
    padding-inline: 20px;
    padding-block: 8px;
    font-size: 15px;
    border: 2px solid;
    line-height: 1.6;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    text-align: center;
    text-wrap: nowrap;
    animation: 0.3s 0.3s backwards;
    @media only screen and (min-width: $bp-md) {
      max-width: fit-content;
    }
    &:first-child {
      border-color: transparent;
      background-color: $clr-primary;
      animation-name: slide-from-left;
      &:hover {
        background-color: rgba($clr-primary, 0.4);
        border-color: $clr-primary;
      }
    }
    &:last-child {
      animation-name: slide-from-right;
      background-color: transparent;
      border-color: $clr-primary;
      &:hover {
        border-color: transparent;
        background-color: $clr-primary;
      }
    }
  }
  &__buttons {
    display: flex;
    gap: clamp(12px, 2.9vw, 44px);
    flex-wrap: wrap;
  }
  &__title {
    letter-spacing: -2px;
    font-size: clamp(40px, 4.5vw, 66px);
    line-height: 0.89;
    animation: slide-from-top 0.7s;
  }
  &__subtitle {
    font-weight: 200;
    font-size: clamp(33px, 2.7vw, 41px);
    letter-spacing: -2px;
    line-height: 1.19;
    animation: slide-from-top 0.7s backwards 0.1s;
    @media only screen and (max-width: $bp-md) {
      text-transform: lowercase;
    }
    & .big {
      @media only screen and (max-width: $bp-md) {
        display: none;
      }
    }
  }
  &__content {
    z-index: 2;
    align-self: flex-end;
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    padding-inline: $layout-spacing;
    margin-bottom: 46px;
    gap: 21px;
    &-texts {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
  }
  &__video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    pointer-events: none;
    position: relative;
    &-wrapper {
      position: relative;
      &::before {
        content: '';
        z-index: 1;
        position: absolute;
        inset: 0;
        background: radial-gradient(
          135.15% 62.32% at 121.67% 127.44%,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.35) 100%
        );
      }
    }
  }
}
</style>
