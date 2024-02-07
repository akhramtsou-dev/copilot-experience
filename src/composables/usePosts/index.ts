import type { ComputedRef } from 'vue'
import type { UseFetchReturn } from '@vueuse/core'
import { createFetch } from '@vueuse/core'

import type { Post } from './types'

interface PostsState {
  items: Post[]
}

const state = reactive<PostsState>({
  items: [],
})

export interface PostsComposable {
  items: ComputedRef<Record<number, Post>>

  fetch: (userId?: string) => UseFetchReturn<Post[]>
}

function useFetch(baseUrl: string = 'https://jsonplaceholder.typicode.com') {
  return createFetch({
    baseUrl,
    fetchOptions: {
      mode: 'cors',
    },
  })
}

export const usePosts: () => PostsComposable = () => {
  function fetch(userId: string = '1') {
    const httpClient = useFetch()

    const query = `/posts?${new URLSearchParams({ userId }).toString()}`

    const request = httpClient(query, {
      headers: { 'Content-Type': 'application/json' },
    }).get().json<Post[]>()

    request.onFetchResponse(() => {
      if (request.data.value !== null) {
        state.items = request.data.value.reduce((resultRecord: Record<number, Post>, post: Post) => {
          resultRecord[post.id] = post
          return resultRecord
        }, {})
      }
    })

    return request
  }

  return {
    fetch,
    items: computed(() => state.items),
  }
}
