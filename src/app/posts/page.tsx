import PostList from '@/app/posts/_components/PostList'
import $axios from '@/utils/axios'

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams['page'] || '1'
  const perPage = searchParams['per_page'] || '20'
  const response = await $axios.get(`/api/posts?page=${page}&per_page=${perPage}`)
  return (
    <>
      <PostList pagination={response.data.data} />
    </>
  )
}

