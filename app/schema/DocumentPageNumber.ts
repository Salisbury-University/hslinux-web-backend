import { z } from "zod";
/**
 * Basic input validation for page request on '/api/v1/:page'
 */
export default z.object({
  params: z.object({
    page: z
      .string()
      .min(1)
      .regex(/^[1-9][0-9]*$/, {
        message: "Page can only be numbers and must be greater than 0",
      }),
  }),
});
