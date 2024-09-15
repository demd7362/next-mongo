import PostList from '@/app/posts/_components/PostList'
import $axios from '@/utils/axios'



export default async function Page({ searchParams }: SearchParams) {
  const page = searchParams['page'] || '1'
  const perPage = searchParams['per_page'] || '20'
  const response = await $axios.get(`/api/posts?page=${page}&per_page=${perPage}`)
  return (
    <>
      <PostList pagination={response.data.data} />
    </>
  )
}

