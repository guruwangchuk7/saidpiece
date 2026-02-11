# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by emailing **thinley@saidpiece.com**.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if available)

### Response Timeline

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide a more detailed response within 7 days
- We will work to fix confirmed vulnerabilities as quickly as possible

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Security Best Practices

### For Contributors

1. **Never commit sensitive data**
   - API keys, passwords, tokens should never be in source code
   - Use environment variables for all secrets
   - Review `.env.example` for required environment variables

2. **Dependency Management**
   - Run `npm audit` before submitting PRs
   - Keep dependencies up to date
   - Address security vulnerabilities promptly

3. **Code Review**
   - All code changes require review before merging
   - Security-sensitive changes require additional scrutiny

### For Deployment

1. **Environment Variables**
   - Set all environment variables in your hosting platform (e.g., Vercel)
   - Never commit `.env` files to version control
   - Rotate credentials regularly

2. **Database Security**
   - Ensure Supabase Row Level Security (RLS) is enabled
   - Review and test RLS policies regularly
   - Use least-privilege access principles

3. **API Security**
   - Use HTTPS only (enforced via HSTS headers)
   - Implement rate limiting on public endpoints
   - Validate and sanitize all user inputs

## Recent Security Incidents

See [SECURITY_REPORT.md](./SECURITY_REPORT.md) for the latest security assessment.

### Critical Issues Identified (Feb 2026)

- ❌ Exposed secrets in version control (`.env` committed)
- ❌ Vulnerable React Router version (requires upgrade to 7.12.0+)
- ❌ Hardcoded API keys in source code

**Action Required**: See SECURITY_REPORT.md for immediate action items.

## Security Checklist for Developers

Before deploying:

- [ ] All secrets are in environment variables, not source code
- [ ] `.env` is listed in `.gitignore`
- [ ] `npm audit` shows no vulnerabilities
- [ ] Supabase RLS policies are configured and tested
- [ ] Security headers are configured in `vercel.json`
- [ ] Authentication flows are tested
- [ ] Input validation is implemented on all forms
- [ ] No sensitive data in error messages
- [ ] HTTPS is enforced

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Vercel Security](https://vercel.com/docs/security)

---

Last Updated: February 11, 2026
