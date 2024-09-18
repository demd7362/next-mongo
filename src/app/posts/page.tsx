import PostList from '@/app/posts/_components/PostList'
import $axios from '@/utils/axios'
import { SearchParams } from '@/types/global'


export default async function Page({ searchParams }: SearchParams) {
  return (
    <>
      <PostList searchParams={searchParams} />
    </>
  )
}

