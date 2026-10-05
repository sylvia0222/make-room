import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export class HttpError extends Error{constructor(public status:number,message:string){super(message)}}
export async function owner(){const u=await getChatGPTUser();if(!u)throw new HttpError(401,'請先登入，再使用你的雲端程式庫。');return u.userId}
export function db(){if(!env.DB)throw new HttpError(503,'程式庫暫時無法連線，請稍後再試。');return env.DB}
export async function body(req:Request){if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)throw new HttpError(403,'請從網站內送出操作。');const raw=await req.text();if(raw.length>320000)throw new HttpError(413,'內容太大，請縮短需求或程式內容。');try{return JSON.parse(raw)}catch{throw new HttpError(400,'無法讀取送出的內容。')}}
export function failure(e:unknown){if(e instanceof HttpError)return Response.json({error:e.message},{status:e.status});console.error('Site operation failed',e instanceof Error?e.message:'unknown');return Response.json({error:'操作未完成，請稍後再試；目前的內容會留在畫面上。'},{status:503})}
export type AppRow={id:string;owner:string;title:string;description:string;html:string;messages:string;kind:string;created:number;updated:number};
export function serialize(r:AppRow){return {...r,owner:undefined,messages:JSON.parse(r.messages)}}
export async function ownedApp(id:string,u:string){const r=await db().prepare('SELECT * FROM apps WHERE id=? AND owner=?').bind(id,u).first<AppRow>();if(!r)throw new HttpError(404,'找不到這個程式，或你沒有使用權限。');return r}
