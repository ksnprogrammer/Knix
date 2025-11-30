export const DB_CONFIG = {
  NEON: {
    CHEMISTRY: "postgresql://neondb_owner:npg_6gExpW9MisQK@ep-silent-dust-ahkbuoo0-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    PHYSICS: "postgresql://neondb_owner:npg_rDcEFqo61vRC@ep-shy-hill-a40pzo0y-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    AUTH: "postgresql://neondb_owner:npg_cdNv9C7ZGQmb@ep-patient-thunder-ahpo38ky-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  },
  SUPABASE: {
    BIO: {
      URL: "https://iwtoivzmtlphzsuxpbtb.supabase.co",
      KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dG9pdnptdGxwaHpzdXhwYnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjQxMDgsImV4cCI6MjA4MDA0MDEwOH0.I_PGJ79j3vcYqFwBAzcvLMSwKhv3aipnuzf9heKovRI"
    },
    CHEM: {
      URL: "https://rjgwqwgvfpcupcjxjfdh.supabase.co",
      KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ3dxd2d2ZnBjdXBjanhqZmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjkyNDcsImV4cCI6MjA4MDA0NTI0N30.nTadLlG5p9GTBnmMGXmfDHSmAXlJ9Tijh0jMAzsmuNY"
    }
  }
};

export const APP_DOMAIN = "knix.gt.tc";

export const MONETIZATION = {
  // Configured for Monetag & Adcash
  AD_NETWORK_ZONE_ID: "9ki0ujlsjy", 
  ENABLED: true
};