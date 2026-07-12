CREATE TYPE "public"."locale" AS ENUM('ar', 'en');--> statement-breakpoint
CREATE TYPE "public"."symptom_severity" AS ENUM('mild', 'moderate', 'severe');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pregnancy_id" uuid NOT NULL,
	"title" text NOT NULL,
	"location" text,
	"scheduled_at" timestamp with time zone NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pregnancies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"last_menstrual_period" date NOT NULL,
	"due_date_gregorian" date NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "symptom_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pregnancy_id" uuid NOT NULL,
	"symptom" text NOT NULL,
	"severity" "symptom_severity" DEFAULT 'mild' NOT NULL,
	"note" text,
	"logged_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"locale" "locale" DEFAULT 'ar' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weekly_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"week_number" integer NOT NULL,
	"title_ar" text NOT NULL,
	"body_ar" text NOT NULL,
	"baby_size_comparison_ar" text,
	"reviewed_by_ob_gyn" boolean DEFAULT false NOT NULL,
	"reviewed_at" timestamp with time zone,
	"source_citations" text[] DEFAULT '{}' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "weekly_content_week_number_unique" UNIQUE("week_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_pregnancy_id_pregnancies_id_fk" FOREIGN KEY ("pregnancy_id") REFERENCES "public"."pregnancies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pregnancies" ADD CONSTRAINT "pregnancies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "symptom_logs" ADD CONSTRAINT "symptom_logs_pregnancy_id_pregnancies_id_fk" FOREIGN KEY ("pregnancy_id") REFERENCES "public"."pregnancies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
