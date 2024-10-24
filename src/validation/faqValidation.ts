import {z} from "zod"

export const addFaqValidation = z.object({
  answer: z.string().min(1, "Answer is required"),
  subCategoryId: z.string().min(1, "Category ID is required"),
  questions: z.string().min(1, "Question is required"),
  title: z.string().min(1, "Title is required"),
})