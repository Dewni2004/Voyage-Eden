const fs = require('fs');
const emailTrans = {
  en: { email: 'Email Address', emailHolder: 'Your email address' },
  fr: { email: 'Adresse e-mail', emailHolder: 'Votre adresse e-mail' },
  it: { email: 'Indirizzo email', emailHolder: 'Il tuo indirizzo email' },
  de: { email: 'E-Mail Adresse', emailHolder: 'Ihre E-Mail Adresse' }
};

['en', 'fr', 'it', 'de'].forEach(lang => {
  const path = `e:/Office Sites/Voyage Eden/src/locales/${lang}/translation.json`;
  let content = fs.readFileSync(path, 'utf8');
  const emails = emailTrans[lang];
  content = content.replace(/("fullNameHolder": "[^"]+",)/, `$1\n      "email": "${emails.email}",\n      "emailHolder": "${emails.emailHolder}",`);
  fs.writeFileSync(path, content);
});
console.log('Translations added');
