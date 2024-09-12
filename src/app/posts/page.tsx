import PostList from '@/app/posts/_components/PostList'
import axios from 'axios'
import $axios from '@/utils/axios'


export default async function Page() {
  const response = await $axios.get('/api/posts')
  console.log(response)
  return <PostList posts={[]} currentPage={1} totalPages={5}/>
}

