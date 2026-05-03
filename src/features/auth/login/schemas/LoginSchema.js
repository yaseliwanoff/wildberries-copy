import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const phoneNumberSchema = z.object({
  phoneNumber: z.string()
    .min(1, { error: "Введите номер телефона" })
    .refine((phone) => isValidPhoneNumber(phone), {
      message: "Некорректный формат телефона"
    })
})
