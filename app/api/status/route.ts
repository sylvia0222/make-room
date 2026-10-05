import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function GET(){const u=await getChatGPTUser();return Response.json({aiReady:!!env.OPENAI_API_KEY,signedIn:!!u,name:u?.fullName||u?.email||null},{headers:{'Cache-Control':'no-store'}})}
