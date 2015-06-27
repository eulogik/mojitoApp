module.exports = function(contact)
{
  var conatct_array=[];
  contact.getContacts=function(cb)
  {
  contact.find({include:'enrollments'},function(err, d){
    d.forEach(function(enrollments2){

      var e=enrollments2.toJSON();

      var status_array=e.enrollments;
      status_array.forEach(function(s){
        if(s.status=='ongoing')
        {
          enrollments2.type='customer';
        }
        else
        {
          enrollments2.type='lead';
        }
      });
    });
    cb(null,d);
});
};

  contact.getLead=function(contactId,cb)
  {
    contact.app.models.Enrollment.findById(contactId,function(err,instance){
      if(instance.status=='onhold')
      {
        instance.type='lead';
      }
      else {
        instance.type='customer';
      }
      resp=instance;
      cb(null,resp);
      console.log(resp);
});
};

  contact.remoteMethod(
    'getContacts',
    {
      http:{path:'/getContacts',verb:'post'},
          returns:{arg:'response',type:'string'}
    });

    contact.remoteMethod(
      'getLead',
      {
    http:{path:'/getLead',verb:'post'},
    accepts:[{arg:'id',type:'number',http:{source:'body'}}],
    returns:{arg:'resp',type:'string'}
  });
};
