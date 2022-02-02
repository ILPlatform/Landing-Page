exports.templates = {
  new_reg: (data) => ({
    to: 'info@ilplatform.be',
    subject: 'ILPlatform - New Registration',
    text: `Hello ILPlatform Team, 

    You have a new registration for ${data?.day} ${data?.moment}, at ${data?.time} at ${data?.loc}.

    Here is a copy of the data collected from the user.
        Name: ${data?.name}
        Email: ${data?.email}
        Phone: ${data?.phone}
        Childs Name: ${data?.name_child}
        Childs Birthday: ${data?.birthday}
      
    Have a nice day,

    The ILPlatform Bot`,
  }),

  demo_client: (data) => ({
    to: data?.email,
    subject: 'ILPlatform - New Demo Registration',
    text: `Cher parent de ${data?.name_child},
    
    Merci pour votre interet en ILPlatform. Nous vous confirmons par cet email l'inscription de ${data?.name_child} au cours GRATUIT de démonstration ILPlatform.

    Le cours aura lieu le ${data?.selected}, à Boulevard du Régent 54, 1000 Bruxelles.
    Le cours durera une heure, et se terminera par une courte présentation et une session de questions pour vous, les parents.

    Si vous avez des questions n'hésitez pas à nous en faire part. 
    Pour des raisons d'organisation, si vous ne pouvez plus venir merci de nous prévenir en réponse à cet email.

    Merci et à bientôt,
    
    L'équipe ILPlatform`,
  }),

  demo_admin: (data) => ({
    to: 'info@ilplatform.be',
    subject: 'ILPlatform - New Demo Registration',
    text: `Cher parent de ${data?.name_child},
    
    Merci pour votre interet en ILPlatform. Nous vous confirmons par cet email l'inscription de ${data?.name_child} au cours GRATUIT de démonstration ILPlatform.

    Le cours aura lieu le ${data?.selected}, à Boulevard du Régent 54, 1000 Bruxelles.
    Le cours durera une heure, et se terminera par une courte présentation et une session de questions pour vous, les parents.

    Si vous avez des questions n'hésitez pas à nous en faire part. 
    Pour des raisons d'organisation, si vous ne pouvez plus venir merci de nous prévenir en réponse à cet email.

    Merci et à bientôt,
    
    L'équipe ILPlatform`,
  }),

  failed_reg: (data) => ({
    to: 'info@ilplatform.be',
    subject: 'ILPlatform - FAILED Registration',
    text: `Hello ILPlatform Team, 

    You have a new FAILED registration for ${data?.day} ${data?.moment}, at ${data?.time} at ${data?.loc}.

    Here is a copy of the data collected from the user.
        Name: ${data?.name}
        Email: ${data?.email}
        Phone: ${data?.phone}
        Childs Name: ${data?.name_child}
        Childs Birthday: ${data?.birthday}
      
    Have a nice day,

    The ILPlatform Bot`,
  }),

  confirmation: (data) => ({
    to: data?.email,
    subject: 'ILPlatform - Registration Confirmation',
    text: `Hello ${data?.name}, 

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
  }),

  contact_admin: (data) => ({
    to: 'info@ilplatform.be',
    subject: 'New Contact for ILPlatform',
    text: `Hello ILPlatform,

    Congratulations! There is a new contact request on your website. 
    You may get back to them as soon as possible on the following emai: ${data?.email}

    Here is a copy of the collected data:
      Name: ${data?.first} ${data?.last}
      Email: ${data?.email}
      Subject: ${data?.subject}
      Message: ${data?.message}

    Have a nice day,

    The ILPlatform Bot`,
  }),

  contact_client: (data) => ({
    to: data.email,
    subject: 'Contact Inquiry for ILPlatform',
    text: `Hello ${data?.first},

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
  }),
};
