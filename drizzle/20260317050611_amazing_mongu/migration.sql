CREATE TABLE `applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`job_id` integer NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`resume_link` text,
	`cover_note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	CONSTRAINT `fk_applications_job_id_jobs_id_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`),
	CONSTRAINT `fk_applications_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`location` text NOT NULL,
	`category` text,
	`description` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
