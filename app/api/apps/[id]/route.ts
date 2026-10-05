import {owner,ownedApp,failure,serialize} from '@/lib/server';
export async function GET(_req:Request,{params}:{params:Promise<{id:string}>}){try{const u=await owner(),{id}=await params;return Response.json({app:serialize(await ownedApp(id,u))},{headers:{'Cache-Control':'no-store'}})}catch(e){return failure(e)}}
