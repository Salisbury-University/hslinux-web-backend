import { number, z } from "zod";
/**
 * Basic input validation for page request on '/api/v1/:page'
 */

export default z.object({
  body: z.object({
    page: z
      .number({
        required_error: "Number is required",
        invalid_type_error: "Page must be a number",
      })
  }),
});