import { z } from "zod";

// The string passed to min()/email() etc. below is a translation key under
// `validation.*` in the locale files, not the displayed message itself —
// screens resolve it with t(`validation.${issue.message}`).

export const appointmentSchema = z.object({
  title: z.string().trim().min(1, "required"),
});
export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export const symptomLogSchema = z.object({
  symptom: z.string().trim().min(1, "required"),
});
export type SymptomLogFormValues = z.infer<typeof symptomLogSchema>;

export type FieldErrors<T extends z.ZodTypeAny> = Partial<Record<keyof z.infer<T>, string>>;

/** Validates `values` against `schema`, returning a map of field -> translation-key, or null if valid. */
export function getFieldErrors<T extends z.ZodTypeAny>(
  schema: T,
  values: z.infer<T>
): FieldErrors<T> | null {
  const result = schema.safeParse(values);
  if (result.success) return null;

  const errors: FieldErrors<T> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof z.infer<T>;
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}
