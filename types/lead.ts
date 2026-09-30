export type LeadResult = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
