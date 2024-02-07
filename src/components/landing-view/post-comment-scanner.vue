<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'

const { fetch: fetchPosts } = usePosts()

function handleSubmit(event: Event) {
  event.preventDefault()

  fetchPosts()
}

defineExpose({
  handleSubmit,
})
</script>

<template>
  <div class="LandingView_postCommentScanner__container">
    <h1>Find which posts you commented</h1>
    <p class="mb-4">
      We scan posts to see if your left some comments and give you option to modify it.
    </p>
    <form class="ScannerForm_form" @submit="handleSubmit">
      <input
        id="post-comment-email-key"
        type="email"
        placeholder="yourname@example.com"
        name="email"
        value=""
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
      >
      <button type="submit" class="mx-4 btn">
        Get
      </button>
      <label for="email">Enter your email address to check.</label>
    </form>
  </div>
</template>
