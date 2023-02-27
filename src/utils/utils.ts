import { useSearchParams } from 'react-router-dom'

export const QueryString = () => {
  const [searchParams] = useSearchParams()
  const searchParamsObj = Object.fromEntries([...searchParams])
  return searchParamsObj
}
