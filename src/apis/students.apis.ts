import { StudentListType } from 'Types/student.type'
import http from 'utils/Http'

const getStudentList = (page: number | string, limit: number | string) => {
  return http.get<StudentListType>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}
export default getStudentList
