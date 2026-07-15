ALTER TABLE "weekly_content" RENAME COLUMN "body_ar" TO "baby_changes_ar";--> statement-breakpoint
ALTER TABLE "weekly_content" DROP COLUMN "reviewed_by_ob_gyn";--> statement-breakpoint
ALTER TABLE "weekly_content" DROP COLUMN "reviewed_at";--> statement-breakpoint
ALTER TABLE "weekly_content" ADD COLUMN "mom_changes_ar" text;--> statement-breakpoint
ALTER TABLE "weekly_content" ADD COLUMN "baby_weight_approx_grams" integer;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recommendations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"week_number" integer NOT NULL,
	"text_ar" text NOT NULL,
	"source_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"week_number" integer,
	"title_ar" text NOT NULL,
	"summary_ar" text NOT NULL,
	"body_ar" text,
	"source_name" text,
	"source_url" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_week_number_weekly_content_week_number_fk" FOREIGN KEY ("week_number") REFERENCES "public"."weekly_content"("week_number") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_week_number_weekly_content_week_number_fk" FOREIGN KEY ("week_number") REFERENCES "public"."weekly_content"("week_number") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
