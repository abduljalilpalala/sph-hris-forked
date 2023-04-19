import { gql } from 'graphql-request'

export const CREATE_EMPLOYEE_SCHEDULE = gql`
  mutation ($request: CreateEmployeeScheduleRequestInput!) {
    createEmployeeSchedule(request: $request){
    }
  }
`
