import {z} from 'zod';

export const TodoSchema = z.object({
  name: z.string(),
  description: z.string(),
  remarks: z.string(),
});

export type TodoSchema = z.infer<typeof TodoSchema>;
