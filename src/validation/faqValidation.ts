import {z} from "zod"

export const addFaqValidation = z.object({
  answer: z.string().min(1, "Answer is required"),
  subCategoryId: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),  // Validasi label
      value: z.string().min(1, "Value is required"),  // Validasi value
    })
  ).nonempty("At least one category is required"),
  questions: z.string().min(1, "Question is required"),
  title: z.string().min(5, "Title length must be at least 5 characters long").max(100),
})