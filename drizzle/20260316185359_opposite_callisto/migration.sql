CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL UNIQUE
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_applications` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`job_id` integer NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`resume_link` text,
	`cover_note` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	CONSTRAINT `applications_job_id_jobs_id_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`),
	CONSTRAINT `fk_applications_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_applications`(`id`, `job_id`, `user_id`, `name`, `email`, `resume_link`, `cover_note`, `created_at`) SELECT `id`, `job_id`, `user_id`, `name`, `email`, `resume_link`, `cover_note`, `created_at` FROM `applications`;--> statement-breakpoint
DROP TABLE `applications`;--> statement-breakpoint
ALTER TABLE `__new_applications` RENAME TO `applications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `users_email_unique`;--> statement-breakpoint
DROP TABLE `users`;