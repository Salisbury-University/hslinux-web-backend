import { z } from "zod";

/**
 * Input validation for preference post requests
 */


export default z.object({
    body: z.object({
        preferences: z.object({
            darkmode: z.boolean({ required_error : "Darkmode must be boolean" })
        })
    }),
});