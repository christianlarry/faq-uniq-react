import { Controller, SubmitHandler, useForm } from "react-hook-form"
import FormRow from "../../molecules/form-layout/FormRow"
import InputGroup from "../../molecules/input-group/InputGroup"
import PlainInput from "../../atoms/input/PlainInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserValidation } from "../../../../validation/userValidation"
import { forwardRef } from "react"
import { EditUserModel } from "../../../../interfaces/userInterfaces"

interface Props{
  onSubmit:SubmitHandler<EditUserModel>
  defaultValues:EditUserModel
}

const EditUserForm = forwardRef<HTMLFormElement,Props>(({
  onSubmit,
  defaultValues
},ref) => {

  // USE FORM
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      username: defaultValues.username,
      email: defaultValues.email
    },
    resolver: zodResolver(updateUserValidation),
    mode: "all"
  })
  
  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <InputGroup label="Username:" htmlFor="username" errors={errors.username?.message}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <PlainInput
                {...field}
                placeholder="Username"
                id="username" />
            )}
          />

        </InputGroup>

        <InputGroup label="Email:" htmlFor="email" errors={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <PlainInput
                {...field}
                type="email"
                placeholder="Email"
                id="email" />
            )}
          />
        </InputGroup>
      </FormRow>
    </form>
  )
})

export default EditUserForm