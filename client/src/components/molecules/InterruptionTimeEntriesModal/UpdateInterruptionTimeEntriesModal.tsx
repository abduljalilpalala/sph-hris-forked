import classNames from 'classnames'
import toast from 'react-hot-toast'
import React, { FC, useEffect } from 'react'
import { Edit, Save, X } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldError, useForm } from 'react-hook-form'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { TimeEntrySchema } from '~/utils/validation'
import Button from '~/components/atoms/Buttons/Button'
import { IInterruptionTimeEntry } from '~/utils/interfaces'
import ModalTemplate from '~/components/templates/ModalTemplate'
import { TimeEntryFormValues } from '~/utils/types/formValues'
import ModalFooter from '~/components/templates/ModalTemplate/ModalFooter'
import ModalHeader from '~/components/templates/ModalTemplate/ModalHeader'

type Props = {
  isOpen: boolean
  closeModal: () => void
  remarks: IInterruptionTimeEntry | undefined
}

const UpdateInterruptionTimeEntriesModal: FC<Props> = (props): JSX.Element => {
  const { isOpen, closeModal, remarks } = props

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TimeEntryFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(TimeEntrySchema)
  })

  const handleUpdateInterruption = (data: TimeEntryFormValues): void => {
    toast.success('Successfully Saved')
    closeModal()
  }

  useEffect(() => {
    if (isOpen) {
      reset({
        time_in: remarks?.timeIn,
        time_out: remarks?.timeOut,
        remarks: remarks?.remarks
      })
    }
  }, [isOpen])

  const validationError = (error: FieldError | undefined): string => {
    return error !== null && error !== undefined
      ? 'border-rose-500 ring-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'focus:border-primary focus:ring-primary'
  }

  return (
    <ModalTemplate
      {...{
        isOpen,
        closeModal
      }}
      className="w-full max-w-lg"
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleUpdateInterruption)}
      >
        {/* Custom Modal Header */}
        <ModalHeader
          {...{
            title: 'Update Time Entry',
            Icon: Edit,
            closeModal
          }}
        />

        {/* Form */}
        <div className="space-y-3 px-6 py-4">
          <div className="grid grid-cols-2 gap-x-6">
            <section>
              <label htmlFor="timeOut" className="space-y-0.5">
                <p className="text-xs text-slate-500">
                  Time Out <span className="text-rose-500">*</span>
                </p>
                <input
                  type="time"
                  id="timeOut"
                  className={classNames(
                    'block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding',
                    'resize-none px-3 py-3 text-xs font-normal text-slate-700 transition',
                    'clock:text-white ease-in-out focus:bg-white focus:text-slate-700',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    validationError(errors?.time_out)
                  )}
                  {...register('time_out')}
                  disabled={isSubmitting}
                />
              </label>
              {errors?.time_out !== null && errors?.time_out !== undefined && (
                <span className="error">{errors?.time_out.message}</span>
              )}
            </section>
            <section>
              <label htmlFor="timeIn" className="space-y-0.5">
                <p className="text-xs text-slate-500">
                  Time In <span className="text-rose-500">*</span>
                </p>
                <input
                  type="time"
                  id="timeIn"
                  className={classNames(
                    'block w-full rounded placeholder:font-light placeholder:text-slate-400',
                    'border border-solid border-slate-300 bg-white bg-clip-padding',
                    'resize-none px-3 py-3 text-xs font-normal text-slate-700 transition',
                    'clock:text-white ease-in-out focus:bg-white focus:text-slate-700',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    validationError(errors?.time_in)
                  )}
                  {...register('time_in')}
                  disabled={isSubmitting}
                />
              </label>
              {errors?.time_in !== null && errors?.time_in !== undefined && (
                <span className="error">{errors?.time_in.message}</span>
              )}
            </section>
          </div>
          <section>
            <label htmlFor="remarks" className="space-y-0.5">
              <span className="text-xs text-slate-500">Remarks</span>
              <ReactTextareaAutosize
                id="remarks"
                className={classNames(
                  'm-0 block min-h-[15vh] w-full rounded placeholder:font-light placeholder:text-slate-400',
                  'border border-solid border-slate-300 bg-white bg-clip-padding focus:ring-primary',
                  'resize-none px-3 py-1.5 text-sm font-normal text-slate-700 transition focus:border-primary',
                  'ease-in-out focus:bg-white focus:text-slate-700 focus:outline-none',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
                {...register('remarks')}
                placeholder="Remarks"
                disabled={isSubmitting}
              />
            </label>
          </section>
        </div>

        {/* Custom Modal Footer Style */}
        <ModalFooter>
          <Button
            type="button"
            onClick={closeModal}
            className={classNames(
              'flex items-center space-x-1 border border-slate-300 py-1 px-4',
              'text-sm text-slate-600 transition duration-150 ease-in-out',
              'disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-500',
              'hover:bg-white hover:text-slate-800'
            )}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
            <span>Close</span>
          </Button>
          <Button
            type="submit"
            className={classNames(
              'flex items-center space-x-2 border border-dark-primary',
              'bg-primary py-1 px-4 text-sm text-white transition',
              'duration-150 ease-in-out disabled:cursor-not-allowed',
              'disabled:opacity-50 hover:bg-dark-primary'
            )}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </ModalFooter>
      </form>
    </ModalTemplate>
  )
}

UpdateInterruptionTimeEntriesModal.defaultProps = {}

export default UpdateInterruptionTimeEntriesModal
