module.exports = function(contact)
{
  var conatct_array=[];
  contact.getContacts=function(cb)
  {
    console.log('getContacts');
  contact.find({include:'enrollments'},function(err, d){
    console.log(d.length);
    d.forEach(function(cont){
      //console.log(cont);
      cont.type='lead';
      var c=cont.toJSON();

      var status_array=c.enrollments;
      status_array.forEach(function(enroll){
        if(enroll.status=='ongoing')
        {
          cont.type='customer';
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
