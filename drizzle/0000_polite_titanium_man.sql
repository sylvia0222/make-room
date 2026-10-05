CREATE TABLE `app_state` (
	`app_id` text PRIMARY KEY NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`html` text NOT NULL,
	`messages` text NOT NULL,
	`kind` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_apps_owner_updated` ON `apps` (`owner`,`updated`);