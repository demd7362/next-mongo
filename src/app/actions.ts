'use server'

import { revalidatePath } from 'next/cache'
import $axios from '@/utils/axios'

export async function getComments(postId: string){
  const response = await $axios.get(`/api/posts/${postId}/comments`)
  return response.data.data
}
export async function addComment(postId: string, content: string) {
  await $axios.post(`/api/posts/${postId}/comments`, { content })
}
