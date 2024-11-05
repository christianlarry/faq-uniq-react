import { Controller, SubmitHandler, useForm } from "react-hook-form"
import FormRow from "../../molecules/form-layout/FormRow"
import InputGroup from "../../molecules/input-group/InputGroup"
import PlainInput from "../../atoms/input/PlainInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { addUserValidation } from "../../../../validation/userValidation"
import { forwardRef } from "react"
import { PostUserModel } from "../../../../interfaces/userInterfaces"

interface Props{
  onSubmit:SubmitHandler<PostUserModel>
}

const AddUserForm = forwardRef<HTMLFormElement,Props>(({onSubmit},ref) => {

  // USE FORM
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(addUserValidation),
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

        <InputGroup label="Password:" htmlFor="password" errors={errors.password?.message}>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PlainInput
                {...field}
                type="password"
                placeholder="Password"
                id="password" />
            )}
          />
        </InputGroup>
      </FormRow>
    </form>
  )
})

export default AddUserForm