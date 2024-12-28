# Sign In Avenues

---

Robot account with account provisioning credentials

Options:
- one sign in for all support team members/provisioners
- secret key per support team member/provisioner (need to provision these in harbor ui manually)

Not even sure robot accounts can access the harbor API considering the following:
- Instructions found here seem to only be relevant for regular user accounts and not robot accounts: https://github.com/goharbor/harbor/wiki/Harbor-FAQs#api
- This issue might be relevant: https://github.com/goharbor/harbor/issues/16398

---

Traditional user login

Only two types of users regular and admin (only admin can create robot accounts)

Begs the question of which auth provider we're using:
- database?
- LDAP?
- OIDC?

Options:
- one admin account for all support team members/provisioners
- admin account per support team member/provisioner (need to provision these in harbor ui manually)

Instructions here for admin user account API access: https://github.com/goharbor/harbor/wiki/Harbor-FAQs#api
