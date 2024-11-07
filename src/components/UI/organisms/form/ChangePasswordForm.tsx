import { Controller, SubmitHandler, useForm } from "react-hook-form"
import FormContainer from "../../molecules/form-layout/FormContainer"
import InputGroup from "../../molecules/input-group/InputGroup"
import PlainInput from "../../atoms/input/PlainInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserPasswordValidation } from "../../../../validation/userValidation"
import { forwardRef } from "react"
import { UpdateUserPasswordModel } from "../../../../interfaces/userInterfaces"

interface Props{
  onSubmit:SubmitHandler<UpdateUserPasswordModel>
}

const ChangePasswordForm = forwardRef<HTMLFormElement,Props>(({
  onSubmit
},ref) => {

  // USE FORM
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      password: ""
    },
    resolver: zodResolver(updateUserPasswordValidation),
    mode: "all"
  })
  
  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>

        <InputGroup label="Password:" htmlFor="password" errors={errors.password?.message}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PlainInput
                {...field}
                type="password"
                placeholder="New password"
                id="password" />
            )}
          />
        </InputGroup>
      </FormContainer>
    </form>
  )
})

export default ChangePasswordForm