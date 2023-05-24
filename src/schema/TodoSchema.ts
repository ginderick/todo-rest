import {z} from 'zod';

export const TodoSchema = z.object({
  name: z.string(),
  description: z.string(),
  remarks: z.string(),
});

export const UpdateTodoSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  remarks: z.string().optional(),
});

export const TodoParamSchema = z.object({
  id: z.coerce.number(),
});

export const TodoDateCompletedSchema = z.object({
  dateCompleted: z.coerce.date(),
});

export type TodoSchema = z.infer<typeof TodoSchema>;
export type UpdateTodoSchema = z.infer<typeof UpdateTodoSchema>;
export type TodoParamSchema = z.infer<typeof TodoParamSchema>;
export type TodoDateCompletedSchema = z.infer<typeof TodoDateCompletedSchema>;
