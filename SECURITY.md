# Security Policy

## Supported site

This policy applies to the public portfolio deployed from this repository:

`https://xl8saif.github.io/`

## Reporting a vulnerability

Do not publish security vulnerabilities, credentials, tokens, private contact data, or exploit details in a public issue.

Report suspected vulnerabilities privately through GitHub's private security reporting mechanism when available, or contact the repository owner through the professional contact details published on the portfolio.

Please include:

- A concise description of the issue
- The affected page, file, or component
- Reproduction steps that do not access or expose private data
- The potential impact
- Any suggested remediation

## Credentials and secrets

This repository is public. Never commit passwords, API keys, access tokens, private keys, session cookies, database credentials, or other secrets.

If a secret is accidentally committed, revoke or rotate it immediately. Removing the file in a later commit does not make the leaked secret safe because Git history may retain it.

## Scope

The portfolio is a static GitHub Pages site. Server-side authentication, databases, and private APIs are outside the scope of this repository unless they are explicitly introduced later.
