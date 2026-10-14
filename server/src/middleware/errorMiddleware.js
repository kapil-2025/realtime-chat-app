export const notFound = (req,res)=>{
res.status(404).json({message:`Route not found: ${req.method} ${req.originalUrl}`})}
export const errorHandler=(err,req,res,next)=>{
console.error("Unhandled error:",err.message);
const status=err.status||500;
let message=err.message;
if(err.type=="entity.parse.failed"){
  message="Invalid JSON in request body";
}
if(status==500){
  message="Something went wrong. Please try again.";
}
res.status(status).json({message});
}
