module.exports = function(Enrollment) {
  Enrollment.newEnrollment=function(data, cb){
  var enroll={"netFee":data.netFee,"date":data.enrollmentDate,"status":data.status,"createdAt":Date(), "contactId":data.contactId, "programId": data.programId,"centerId":data.centerId};
  var incomeObj={"amount":data.depositedAmount,"date":data.depositDate,"centerId":data.centerId};

  Enrollment.create(enroll,function(err,instance){
    incomeObj.enrollmentId = instance.id;
    Enrollment.app.models.Income.create(incomeObj,function(err,i){
      response="enrollment and income updated successfully";
    cb(null,response);
    console.log(response);
  });
});

};


Enrollment.remoteMethod(
  'newEnrollment',
  {
    http: {path: '/newEnrollment', verb: 'post'},
    accepts:[{arg:'data',type:'object',http:{source:'body'}}],
    returns:{arg:'response',type:'string'}
  });
};
