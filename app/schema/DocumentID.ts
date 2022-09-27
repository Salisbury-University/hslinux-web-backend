import { z } from "zod";
/**
 * Basic input validation for document request on '/api/v1/:id'
 */
export default z.object({
  params: z.object({
    id: z.string({ required_error: "A Document ID is required." }),
  }),
});
