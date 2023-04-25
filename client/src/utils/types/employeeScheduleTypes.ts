export interface IGetAllEmployeeSchedule {
  id: number
  scheduleName: string
}

export interface IGetEmployeeSchedule {
  // eslint-disable-next-line @typescript-eslint/array-type
  days: {
    isDaySelected: boolean
    workingDay: string
    timeIn: string
    timeOut: string
  }[]
  scheduleName: string
}

export interface ICreateEmployeeScheduleRequestInput {
  // eslint-disable-next-line @typescript-eslint/array-type
  workingDays: {
    day: string
    from: string
    to: string
  }[]
  userId: number
  scheduleName: string
}

export interface IEditEmployeeScheduleRequestInput {
  // eslint-disable-next-line @typescript-eslint/array-type
  workingDays: {
    day: string
    from: string
    to: string
  }[]
  userId: number
  scheduleName: string
  employeeScheduleId: number
}