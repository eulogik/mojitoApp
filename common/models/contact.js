module.exports = function(contact)
{
  contact.getContacts=function(cb)
  {
    contact.find({include:'enrollments'},function(err, d){

      cb(null,d);

    /*  d.forEach(function(e){
        console.log(d);
        if(e && e.status=='ongoing')
        {
          d.type='customer';
        }
        else {
          d.type='lead';
        }

        console.log(d.type);

 });*/
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
