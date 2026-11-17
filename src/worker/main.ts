import { isDemoMode } from "@/infrastructure/config";

let stopping=false;
let timer:ReturnType<typeof setTimeout>|undefined;
let wakePoll:(()=>void)|undefined;
const workerId=process.env.WORKER_ID||`worker-${process.pid}`;
const pollInterval=Number(process.env.WORKER_POLL_INTERVAL_MS||3000);

function stop(signal:string){console.info(JSON.stringify({service:"worker",event:"shutdown_requested",signal}));stopping=true;if(timer)clearTimeout(timer);wakePoll?.();}
process.once("SIGTERM",()=>stop("SIGTERM"));process.once("SIGINT",()=>stop("SIGINT"));

async function run(){
  console.info(JSON.stringify({service:"worker",event:"started",mode:isDemoMode()?"demo":"live",workerId}));
  while(!stopping){
    // The queue contract exists, but handlers are not implemented yet. Never claim work
    // that this foundation cannot safely process or release.
    if(!isDemoMode() && !warned){console.warn("MongoDB is configured, but no job handlers are enabled; queue remains untouched.");warned=true;}
    await pause();
  }
  console.info(JSON.stringify({service:"worker",event:"stopped",workerId}));
}
let warned=false;
function pause(){return new Promise<void>(resolve=>{wakePoll=()=>{wakePoll=undefined;resolve();};timer=setTimeout(()=>{timer=undefined;wakePoll=undefined;resolve();},pollInterval);});}
run().catch(error=>{console.error("Worker stopped unexpectedly",error);process.exitCode=1;});
