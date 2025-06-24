function getEnvVar(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const SUPABASE = {
  URL: getEnvVar("VITE_SUPABASE_URL"),
  IMAGE_BUCKET_URL: getEnvVar("VITE_SUPABASE_IMAGE_BASE_URL"),
};
