<template>
  <div class="error">
    <Header class="error-header" />
    <div class="error__container">
      <main class="error__content">
        <h1 class="error__number">404</h1>
        <h2 class="error__title">
          {{ $t('error-title') }}
        </h2>
        <p class="error__text">
          {{ $t('error-text') }}
        </p>
        <NuxtLink :to="$localePath('/')" class="error__button">
          <IconsArrowLeft class="error__icon" />
          <span>{{ $t('back-home') }}</span>
        </NuxtLink>
      </main>
      <footer class="error__footer">
        <ButtonCall />
        <nav class="error__socials">
          <a
            href="https://www.facebook.com/dreamcity.uz?mibextid=wwXIfr&mibextid=wwXIfr"
            target="_blank"
            class="error__social"
          >
            <IconsFacebookCircular class="error__social-icon" />
          </a>
          <a href="https://t.me/dreamcityuz" target="_blank" class="error__social">
            <IconsTelegram class="error__social-icon" />
          </a>
          <a
            href="https://www.instagram.com/dreamcity.uz?igsh=cWd6ZjdsMXhzeDR1&utm_source=qr"
            target="_blank"
            class="error__social"
          >
            <IconsInstagram class="error__social-icon" />
          </a>
        </nav>
      </footer>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

useHead({
  title: '404'
});
</script>

<style lang="scss" scoped>
.error {
  background-color: $clr-secondary;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &-header {
    background-color: rgba(0, 0, 0, 0.35);
    position: static;
  }
  &__number {
    background: linear-gradient(
      91.17deg,
      #f7e7c6 -4.01%,
      #f9d683 36.14%,
      #ffdd77 77.44%,
      #c2e9cd 106.11%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: clamp(100px, 12vw, 200px);
    line-height: 0.75;
  }
  &__text {
    font-weight: 500;
    font-size: clamp(14px, 1vw, 18px);
  }
  &__title {
    font-size: clamp(20px, 2.3vw, 42px);
    font-weight: 800;
    max-width: 24ch;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__socials {
    display: flex;
    gap: 6px;
  }
  &__social {
    background-color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: background-color 0.3s, box-shadow 0.3s;
    @include flex-center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 10px 30px 0px rgba($clr-primary, 0.6);
      .error__social-icon {
        fill: #fff;
      }
    }
    &-icon {
      fill: $clr-secondary;
      width: 60%;
      transition: fill 0.3s;
    }
  }
  &__container {
    padding-inline: $layout-spacing;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-evenly;
  }
  &__content {
    align-self: center;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: clamp(18px, 1.8vw, 32px);
  }
  &__button {
    color: #fff;
    fill: #fff;
    background-color: $clr-primary-light;
    padding-block: clamp(14px, 1.15vw, 22px);
    padding-inline: clamp(30px, 3.3vw, 60px);
    font-weight: 800;
    font-size: clamp(16px, 1vw, 18px);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s, color 0.3s, fill 0.3s;
    &:hover {
      background-color: #fff;
      color: $clr-primary-light;
      fill: $clr-primary-light;
    }
  }
  &__icon {
    fill: inherit;
    width: 15px;
  }
}
</style>
