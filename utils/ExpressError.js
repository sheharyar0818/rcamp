class ExpressError extends Error{
constructor(messsage,statusCode){
    super();
    this.message=messsage;
    this.statusCode=statusCode;
}

}

module.exports=ExpressError;