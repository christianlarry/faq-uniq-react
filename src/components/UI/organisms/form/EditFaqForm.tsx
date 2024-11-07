import { forwardRef, useEffect, useState } from "react"
import CustomSelect from "../../atoms/input/CustomSelect"
import PlainInput from "../../atoms/input/PlainInput"
import TextArea from "../../atoms/input/TextArea"
import TextEditor from "../../atoms/input/TextEditor"
import FormColumn from "../../molecules/form-layout/FormColumn"
import FormContainer from "../../molecules/form-layout/FormContainer"
import FormRow from "../../molecules/form-layout/FormRow"
import InputGroup from "../../molecules/input-group/InputGroup"
import { EditFaqFormModel} from "../../../../interfaces/faqInterfaces"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addFaqValidation } from "../../../../validation/faqValidation"
import { OptionsOrGroups, GroupBase } from "react-select"
import { useFaqCategory } from "../../../../hooks/useFaqCategory"

interface OptionType {
  label: string
  value: string
}

interface Props{
  onSubmit:SubmitHandler<EditFaqFormModel>
  defaultValues?:EditFaqFormModel
}

const EditFaqForm = forwardRef<HTMLFormElement,Props>(({
  onSubmit,
  defaultValues
}:Props,ref) => {
  
  const { faqCategory } = useFaqCategory()

  // STATE
  const [subCatOptions, setSubCatOptions] = useState<OptionsOrGroups<OptionType, GroupBase<OptionType>>>([])

  // USE FORM
  const {control, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      title: defaultValues?.title || "",
      questions: defaultValues?.questions || "",
      answer: defaultValues?.answer || "",
      subCategoryId: defaultValues?.subCategoryId || []
    },
    resolver: zodResolver(addFaqValidation),
    mode: "all"
  })

  useEffect(() => {
    if (faqCategory && faqCategory.length > 0) {
      const map = faqCategory.map(val => {
        const label = val.name
        const options = val.sub_category.filter(subCat => subCat != null).map(subCat => {
          return {
            label: subCat.sub_category,
            value: subCat._id
          }
        })

        return {
          label,
          options
        }
      })

      setSubCatOptions(map)
    }
  }, [faqCategory])

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormRow>

          <FormColumn>
            <InputGroup
              label="Title:"
              htmlFor="title"
              errors={errors.title?.message}>
              
              <Controller
                name="title"
                control={control}
                render={({field})=>(
                  <PlainInput
                    {...field}
                    placeholder="FAQ Title"
                    id="title"/>
                )}
              />

            </InputGroup>
          </FormColumn>

          <FormColumn>
            <InputGroup
              label="Category:"
              htmlFor="category"
              errors={errors.subCategoryId?.message}>
              
              <Controller
                name="subCategoryId"
                control={control}
                render={({field})=>(
                  <CustomSelect
                    options={subCatOptions}
                    isMulti
                    id="category"
                    onChange={(val)=>{
                      field.onChange(val)
                    }}
                    value={field.value}
                    onBlur={field.onBlur}
                    />
                )}
              />
              
            </InputGroup>
          </FormColumn>

        </FormRow>

        <FormRow>
          <FormColumn>
            <InputGroup
              label="Questions (comma-seperated):"
              htmlFor="questions"
              errors={errors.questions?.message}>
              
              <Controller
                name="questions"
                control={control}
                render={({field})=>(
                  <TextArea
                    {...field}
                    rows={4}
                    placeholder="Comma-seperated, ex:Pertanyaan 1,Pertanyaan 2,Pertanyaan 3"
                    id="questions"/>
                )}
              />
              
            </InputGroup>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <InputGroup
              label="Answer:"
              htmlFor="answer"
              errors={errors.answer?.message}>
              
              <Controller
                control={control}
                name="answer"
                render={({field})=>(
                  <TextEditor
                    data={field.value}
                    onChange={(_e, editor) => {
                      const data = editor.getData()
                      field.onChange(data)
                    }}
                    onBlur={field.onBlur}
                    />
                )}
              />
              
            </InputGroup>
          </FormColumn>
        </FormRow>

      </FormContainer>
    </form>
  )
})

export default EditFaqForm