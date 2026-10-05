import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const apps=sqliteTable('apps',{
 id:text('id').primaryKey(),owner:text('owner').notNull(),title:text('title').notNull(),description:text('description').notNull(),html:text('html').notNull(),messages:text('messages').notNull(),kind:text('kind').notNull(),created:integer('created').notNull(),updated:integer('updated').notNull()
},t=>[index('idx_apps_owner_updated').on(t.owner,t.updated)]);
export const appState=sqliteTable('app_state',{
 appId:text('app_id').primaryKey().references(()=>apps.id,{onDelete:'cascade'}),data:text('data').notNull().default('{}'),version:integer('version').notNull().default(0)
});
