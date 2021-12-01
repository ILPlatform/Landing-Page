exports.new_reg = (data) => `
Hello ILPlatform Team, 

You have a new registration for ${data.day} ${data.moment}, at ${data.time} at ${data.loc}.

Here is a copy of the data collected from the user.
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Childs Name: ${data.name_child}
    Childs Birthday: ${data.birthday}
  
Have a nice day,

The ILPlatform Bot`;

exports.failed_reg = (data) => `
Hello ILPlatform Team, 

You have a new FAILED registration for ${data.day} ${data.moment}, at ${data.time} at ${data.loc}.

Here is a copy of the data collected from the user.
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Childs Name: ${data.name_child}
    Childs Birthday: ${data.birthday}
  
Have a nice day,

The ILPlatform Bot`;

exports.confirmation = (data) => `
Hello ${data.name}, 

Thank you for your interest in ILPlatform. 
We are pleased to confirm your registration! 
We await you on ${data.day} in the ${data.moment}, at ${data.time}.
As a reminder, the address is ${data.loc}.

As promised, here is a copy of the collected data:
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Childs Name: ${data.name_child}
    Childs Birthday: ${data.birthday}
  
If you have any questions or concerns, please contact us in response to this email.

Have a nice day,

The ILPlatform Team

Website: www.ilplatform.be
Mail: info@ilplatform.be`;

exports.new_con = (data) => `
Hello ILPlatform,

Congratulations! There is a new contact request on your website. 
You may get back to them as soon as possible on the following emai: ${data.email}

Here is a copy of the collected data:
  Name: ${data.first} ${data.last}
  Email: ${data.email}
  Subject: ${data.subject}
  Message: ${data.message}

Have a nice day,

The ILPlatform Bot`;

exports.contact = (data) => `
Hello ${data.first},

Thank you for your interest in ILPlatform. 
We will come back to you regarding you request as soon as possible!

As promised, here is a copy of the collected data:
  Name: ${data.first} ${data.last}
  Email: ${data.email}
  Subject: ${data.subject}
  Message: ${data.message}

If you have any questions or concerns, please contact us in response to this email.

Have a nice day,

The ILPlatform Team

Website: www.ilplatform.be
Mail: info@ilplatform.be`;

exports.templates = {
  new_reg: (data) => `
  Hello ILPlatform Team, 

  You have a new registration for ${data?.day} ${data?.moment}, at ${data?.time} at ${data?.loc}.

  Here is a copy of the data collected from the user.
      Name: ${data?.name}
      Email: ${data?.email}
      Phone: ${data?.phone}
      Childs Name: ${data?.name_child}
      Childs Birthday: ${data?.birthday}
    
  Have a nice day,

  The ILPlatform Bot`,

  failed_reg: (data) => `
  Hello ILPlatform Team, 

  You have a new FAILED registration for ${data?.day} ${data?.moment}, at ${data?.time} at ${data?.loc}.

  Here is a copy of the data collected from the user.
      Name: ${data?.name}
      Email: ${data?.email}
      Phone: ${data?.phone}
      Childs Name: ${data?.name_child}
      Childs Birthday: ${data?.birthday}
    
  Have a nice day,

  The ILPlatform Bot`,

  confirmation: (data) => `
  Hello ${data?.name}, 

  Thank you for your interest in ILPlatform. 
  We are pleased to confirm your registration! 
  We await you on ${data?.day} in the ${data?.moment}, at ${data?.time}.
  As a reminder, the address is ${data?.loc}.

  As promised, here is a copy of the collected data:
      Name: ${data?.name}
      Email: ${data?.email}
      Phone: ${data?.phone}
      Childs Name: ${data?.name_child}
      Childs Birthday: ${data?.birthday}
    
  If you have any questions or concerns, please contact us in response to this email.

  Have a nice day,

  The ILPlatform Team

  Website: www.ilplatform.be
  Mail: info@ilplatform.be`,

  contact_admin: (data) => `
  Hello ILPlatform,

  Congratulations! There is a new contact request on your website. 
  You may get back to them as soon as possible on the following emai: ${data?.email}

  Here is a copy of the collected data:
    Name: ${data?.first} ${data?.last}
    Email: ${data?.email}
    Subject: ${data?.subject}
    Message: ${data?.message}

  Have a nice day,

  The ILPlatform Bot`,

  contact_client: (data) => `
  Hello ${data?.first},

  Thank you for your interest in ILPlatform. 
  We will come back to you regarding you request as soon as possible!

  As promised, here is a copy of the collected data:
    Name: ${data?.first} ${data?.last}
    Email: ${data?.email}
    Subject: ${data?.subject}
    Message: ${data?.message}

  If you have any questions or concerns, please contact us in response to this email.

  Have a nice day,

  The ILPlatform Team

  Website: www.ilplatform.be
  Mail: info@ilplatform.be`,
};
