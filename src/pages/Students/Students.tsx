import { useQuery } from '@tanstack/react-query'
import getStudentList from 'apis/students.apis'
import { Link } from 'react-router-dom'
import LoadingSkeleton from 'Skeleton'
import { QueryString } from 'utils/utils'
import className from 'classnames'
const limitItem: number = 10
export default function Students() {
  //old method with axios and useEffect
  // const [students, setStudents] = useState<StudentListType>([])
  // const [loading, setLoading] = useState<boolean>(false)
  // useEffect(() => {
  //   setLoading(true)
  //   getStudentList(1, 10)
  //     .then((res) => setStudents(res.data))
  //     .finally(() => setLoading(false))
  // }, [])

  // New method with axios and ReactQuery
  const queryString: { page?: string } = QueryString()
  const page = Number(queryString.page) || 1
  const { data, isLoading } = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudentList(page, limitItem),
    keepPreviousData: true
  })
  const totalPage = Math.ceil(Number(data?.headers['x-total-count'] || 0) / limitItem)
  return (
    <div>
      <h1 className='text-lg'>Students</h1>
      <Link
        to={`/students/add`}
        type='button'
        className=' mt-6 mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 '
      >
        Add Student
      </Link>

      {isLoading && <LoadingSkeleton />}
      <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
        {!isLoading && (
          <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 '>
              <tr>
                <th scope='col' className='py-3 px-6'>
                  #
                </th>
                <th scope='col' className='py-3 px-6'>
                  Avatar
                </th>
                <th scope='col' className='py-3 px-6'>
                  Name
                </th>
                <th scope='col' className='py-3 px-6'>
                  Email
                </th>
                <th scope='col' className='py-3 px-6'>
                  <span className='sr-only'>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((value) => {
                return (
                  <tr
                    key={value.id}
                    className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
                    <td className='py-4 px-6'>{value.id}</td>
                    <td className='py-4 px-6'>
                      <img src={value.avatar} alt='student' className='h-5 w-5' />
                    </td>
                    <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                      {value.last_name}
                    </th>
                    <td className='py-4 px-6'>{value.email}</td>
                    <td className='py-4 px-6 text-right'>
                      <Link
                        to='/students/1'
                        className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                      >
                        Edit
                      </Link>
                      <button className='font-medium text-red-600 dark:text-red-500'>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {!isLoading && (
        <div className='mt-6 flex justify-center'>
          <nav aria-label='Page navigation example'>
            <ul className='inline-flex -space-x-px'>
              {page === 1 ? (
                <li>
                  <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                    Previous
                  </span>
                </li>
              ) : (
                <li>
                  <Link
                    to={`/students?page=${page - 1}`}
                    className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Previous
                  </Link>
                </li>
              )}

              {Array(totalPage)
                .fill(0)
                .map((_, index) => {
                  const pageNumber = index + 1
                  const isActive = page === pageNumber
                  return (
                    <li key={index}>
                      <Link
                        className={className(
                          'border border-gray-300 py-2 px-3 leading-tight text-gray-500   hover:bg-gray-100  hover:text-gray-700',
                          {
                            'bg-gray-100 text-gray-900': isActive,
                            'bg-white': !isActive
                          }
                        )}
                        to={`/students?page=${pageNumber}`}
                      >
                        {pageNumber}
                      </Link>
                    </li>
                  )
                })}

              {page === totalPage ? (
                <li>
                  <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                    Next
                  </span>
                </li>
              ) : (
                <li>
                  <Link
                    className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    to={`/students?page=${page + 1}`}
                  >
                    Next
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}
