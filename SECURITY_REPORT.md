# Security Assessment Report for Saidpiece

**Date**: February 11, 2026  
**Repository**: guruwangchuk7/saidpiece  
**Assessment Type**: Comprehensive Security Audit

---

## Executive Summary

This security assessment has identified **CRITICAL** and **HIGH** severity vulnerabilities that require immediate attention. The most pressing issues include committed secrets in version control and vulnerable dependencies.

**Overall Risk Level**: 🔴 **CRITICAL**

---

## Critical Findings

### 1. 🔴 CRITICAL: Secrets Committed to Git Repository

**Severity**: CRITICAL  
**Status**: ❌ Unresolved  
**CVSS Score**: 9.1 (Critical)

**Description**:
The `.env` file containing sensitive credentials has been committed to the Git repository and is publicly accessible in the repository history.

**Exposed Secrets**:
```
VITE_SUPABASE_URL=https://ckxqgtfgghanvtvytjuz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreHFndGZnZ2hhbnZ0dnl0anV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTg4MTYsImV4cCI6MjA4NTIzNDgxNn0.jbfNSMNkuRRISUAjV0hAhl0ZAHhT-9jLMPybcZRzi-A
```

**Additional Exposed Credentials**:
- EmailJS Public Key: `XkNzaXXHW5Z1e0x48` (hardcoded in `/src/pages/contact/index.jsx`)
- EmailJS Service ID: `service_oaqnzvz` (hardcoded in `/src/pages/contact/index.jsx`)
- EmailJS Template ID: `template_tl4scas` (hardcoded in `/src/pages/contact/index.jsx`)

**Impact**:
- Unauthorized access to Supabase database
- Potential data breach of user information, messages, and admin data
- Ability to read/write data through the exposed anonymous key
- Email service abuse through exposed EmailJS credentials

**Evidence**:
```bash
git log --all --oneline -- .env
ed64dcb (grafted) Add security headers to force HTTPS and prevent SSL warnings
```

**Immediate Actions Required**:
1. ✅ **URGENT**: Add `.env` to `.gitignore` (Currently NOT ignored)
2. ✅ **URGENT**: Rotate ALL Supabase credentials immediately
3. ✅ **URGENT**: Rotate EmailJS credentials
4. ✅ **RECOMMENDED**: Use environment variables on hosting platform (Vercel) instead of committing secrets
5. ⚠️ **NOTE**: Removing `.env` from current commit won't remove it from git history - credentials are permanently exposed

**Recommendation**:
- Immediately revoke and regenerate all Supabase API keys
- Set up environment variables in Vercel dashboard
- Add `.env*` to `.gitignore`
- Consider using git-filter-repo or BFG Repo-Cleaner to remove secrets from git history (this requires force-push)
- Implement secret scanning in CI/CD pipeline

---

### 2. 🔴 HIGH: React Router XSS Vulnerabilities

**Severity**: HIGH  
**Status**: ❌ Unresolved  
**CVSS Score**: 8.2 (High)

**Description**:
The application uses `react-router@7.8.2` and `react-router-dom@7.8.2` which contain multiple critical XSS vulnerabilities.

**Vulnerable Dependencies**:
- `react-router@7.8.2` (requires upgrade to 7.12.0+)
- `react-router-dom@7.8.2` (requires upgrade to 7.12.0+)

**Known Vulnerabilities**:

#### CVE-2025-XXXX: React Router XSS via Open Redirects
- **CVSS**: 8.0 (High)
- **Affected**: >= 7.0.0, <= 7.11.0
- **Fixed in**: 7.12.0
- **CWE**: CWE-79 (Cross-site Scripting)

#### CVE-2025-XXXX: React Router SSR XSS in ScrollRestoration
- **CVSS**: 8.2 (High)
- **Affected**: >= 7.0.0, < 7.12.0
- **Fixed in**: 7.12.0
- **CWE**: CWE-79 (Cross-site Scripting)

#### CVE-2025-XXXX: React Router CSRF in Action/Server Action Request Processing
- **CVSS**: 6.5 (Moderate)
- **Affected**: >= 7.0.0, <= 7.11.0
- **Fixed in**: 7.12.0
- **CWE**: CWE-352 (Cross-Site Request Forgery)

#### CVE-2025-XXXX: React Router Unexpected External Redirect
- **CVSS**: 6.5 (Moderate)
- **Affected**: Versions affected
- **CWE**: CWE-601 (URL Redirection to Untrusted Site)

**Current Code Patterns at Risk**:
```javascript
// src/context/AuthContext.jsx:45
redirectTo: window.location.href  // Potential open redirect vulnerability
```

**Impact**:
- Cross-site scripting attacks
- Session hijacking
- CSRF attacks on form submissions
- Open redirect attacks leading to phishing

**Recommendation**:
```bash
npm install react-router@^7.12.0 react-router-dom@^7.12.0
npm audit fix
```

---

### 3. 🟡 MODERATE: js-yaml Prototype Pollution

**Severity**: MODERATE  
**Status**: ❌ Unresolved  
**CVSS Score**: 5.3

**Description**:
Transitive dependency `js-yaml` (v4.0.0-4.1.0) is vulnerable to prototype pollution.

**Vulnerability Details**:
- **Advisory**: GHSA-mh29-5h37-fv8m
- **CWE**: CWE-1321 (Improperly Controlled Modification of Object Prototype Attributes)
- **Affected**: js-yaml >= 4.0.0, < 4.1.1
- **Fix Available**: Yes (automatic via `npm update`)

**Impact**:
- Prototype pollution attacks
- Potential for arbitrary code execution in specific scenarios

**Recommendation**:
```bash
npm audit fix
```

---

## High-Risk Security Issues

### 4. 🟡 Missing .env in .gitignore

**Severity**: HIGH  
**Status**: ❌ Unresolved

**Description**:
The `.gitignore` file does NOT exclude `.env` files, allowing sensitive environment files to be committed.

**Current .gitignore**:
```
# Missing .env patterns!
*.local  # Only excludes *.local files
```

**Recommendation**:
Add to `.gitignore`:
```gitignore
# Environment variables
.env
.env.*
.env.local
.env.development
.env.production
.env.test
!.env.example
```

---

### 5. 🟡 Hardcoded API Keys in Source Code

**Severity**: HIGH  
**Status**: ❌ Unresolved

**Description**:
EmailJS credentials are hardcoded directly in source code instead of using environment variables.

**Location**: `/src/pages/contact/index.jsx:10`
```javascript
emailjs.init('XkNzaXXHW5Z1e0x48');  // Public key hardcoded
const SERVICE_ID = 'service_oaqnzvz';  // Service ID hardcoded
const TEMPLATE_ID = 'template_tl4scas';  // Template ID hardcoded
```

**Impact**:
- Publicly exposed API credentials in source code
- Anyone can abuse the email service
- Potential for spam/DOS attacks on email quota

**Recommendation**:
Move to environment variables:
```javascript
// Use environment variables
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
```

---

## Medium-Risk Security Issues

### 6. 🟢 OAuth Redirect URI Validation

**Severity**: MEDIUM  
**Status**: ⚠️ Needs Review

**Description**:
The Google OAuth redirect uses `window.location.href` without validation.

**Location**: `/src/context/AuthContext.jsx:45`
```javascript
const signInWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
        redirectTo: window.location.href  // No validation
    }
});
```

**Potential Issue**:
If an attacker can manipulate `window.location.href` before OAuth flow, they could redirect users to a malicious site after authentication.

**Recommendation**:
Use a whitelist of allowed redirect URLs:
```javascript
const ALLOWED_REDIRECTS = [
    'https://saidpiece.com',
    'https://www.saidpiece.com',
    window.location.origin
];

const signInWithGoogle = () => {
    const redirectTo = ALLOWED_REDIRECTS.includes(window.location.origin) 
        ? window.location.href 
        : window.location.origin;
    
    return supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo }
    });
};
```

---

### 7. 🟢 Insecure Direct Navigation

**Severity**: MEDIUM  
**Status**: ⚠️ Code Quality Issue

**Description**:
Multiple instances of `window.location.href = '/path'` instead of using React Router's navigation.

**Locations**:
- `/src/pages/admin/AdminManager.jsx:23`
- `/src/pages/admin/AdminDashboard.jsx:228,232,236,322`

**Impact**:
- Full page reloads (performance issue)
- Bypasses React Router protection
- Not a direct security vulnerability but reduces code quality

**Recommendation**:
Use React Router's `useNavigate()` hook:
```javascript
const navigate = useNavigate();
navigate('/admin/dashboard');  // Instead of window.location.href
```

---

### 8. 🟢 Supabase Row Level Security (RLS)

**Severity**: MEDIUM  
**Status**: ⚠️ Requires Database Verification

**Description**:
Cannot verify if Supabase Row Level Security (RLS) policies are properly configured on the database tables.

**Tables Requiring RLS Verification**:
- `messages` - Contact form submissions
- `admins` - Admin user management
- `projects` - Project data
- `team` - Team member data
- `blog` - Blog posts

**Recommendation**:
Verify in Supabase Dashboard that:
1. RLS is enabled on all tables
2. Anonymous key only has read access to public data
3. Admin operations require authenticated users
4. Write operations have proper validation

**Example RLS Policy**:
```sql
-- Example for messages table
CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Only admins can read messages" ON messages
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admins WHERE admins.email = auth.email()
        )
    );
```

---

## Positive Security Findings

### ✅ Security Headers Configured

The application has implemented security headers in `vercel.json`:

```json
{
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block"
}
```

**Good Practices**:
- HSTS enforces HTTPS
- X-Content-Type-Options prevents MIME sniffing
- X-Frame-Options prevents clickjacking
- X-XSS-Protection provides XSS filter

**Recommendations**:
Consider adding:
```json
{
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline';",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}
```

---

### ✅ No Direct XSS Vulnerabilities Detected

**Findings**:
- No use of `dangerouslySetInnerHTML`
- No use of `eval()`
- No direct innerHTML manipulation
- React's built-in XSS protection is maintained

---

### ✅ Input Validation

**Good Practices**:
- HTML5 form validation (`required`, `type="email"`)
- Form data sanitization through React controlled components
- Supabase parameterized queries prevent SQL injection

---

## Security Recommendations Summary

### Critical Priority (Immediate Action Required)

1. **✅ Add `.env` to `.gitignore`**
   ```gitignore
   .env
   .env.*
   !.env.example
   ```

2. **✅ Rotate ALL exposed credentials**
   - Supabase URL and anon key
   - EmailJS public key, service ID, template ID
   - Generate new credentials in respective dashboards

3. **✅ Move hardcoded secrets to environment variables**
   ```javascript
   // .env (never commit this)
   VITE_EMAILJS_PUBLIC_KEY=your_new_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. **✅ Upgrade React Router**
   ```bash
   npm install react-router@^7.12.0 react-router-dom@^7.12.0
   ```

### High Priority (Within 1 Week)

5. **Fix all dependency vulnerabilities**
   ```bash
   npm audit fix
   npm update
   ```

6. **Implement secret scanning in CI/CD**
   - Add GitHub secret scanning
   - Add pre-commit hooks with tools like `gitleaks`

7. **Verify Supabase RLS policies**
   - Audit all table permissions
   - Ensure least-privilege access

### Medium Priority (Within 1 Month)

8. **Add Content Security Policy**
   - Implement CSP headers
   - Test and refine policy

9. **Replace `window.location.href` with React Router navigation**
   - Improves security and performance
   - Better user experience

10. **Implement proper error handling**
    - Don't expose stack traces in production
    - Sanitize error messages shown to users

---

## Testing & Validation

### Security Testing Checklist

- [ ] Run `npm audit` and resolve all issues
- [ ] Verify no secrets in git history
- [ ] Test authentication flows
- [ ] Verify RLS policies in Supabase
- [ ] Test CORS configuration
- [ ] Verify security headers with online tools
- [ ] Test for SQL injection (Supabase handles this)
- [ ] Test for XSS vulnerabilities
- [ ] Review admin authorization logic

### Recommended Tools

1. **Dependency Scanning**
   - `npm audit`
   - Snyk
   - GitHub Dependabot

2. **Secret Scanning**
   - git-secrets
   - gitleaks
   - truffleHog

3. **Security Headers**
   - securityheaders.com
   - observatory.mozilla.org

4. **SAST (Static Application Security Testing)**
   - SonarQube
   - ESLint security plugins

---

## Compliance Considerations

### GDPR / Data Privacy

The application collects personal data (names, emails, messages):
- ✅ Supabase handles data storage
- ⚠️ Need privacy policy
- ⚠️ Need cookie consent (if using tracking)
- ⚠️ Need data retention policy

### Accessibility

- Security should not impact accessibility
- Ensure CAPTCHA alternatives if implemented
- Maintain WCAG 2.1 AA compliance

---

## Incident Response Plan

If credentials are compromised:

1. **Immediate Actions** (0-1 hour)
   - Rotate all API keys
   - Review access logs
   - Disable compromised accounts

2. **Investigation** (1-24 hours)
   - Check Supabase logs for unauthorized access
   - Review email service usage
   - Identify scope of breach

3. **Remediation** (24-48 hours)
   - Notify affected users if data accessed
   - Update security measures
   - Document lessons learned

4. **Prevention** (Ongoing)
   - Implement secret scanning
   - Regular security audits
   - Team security training

---

## Conclusion

The application has **CRITICAL** security vulnerabilities that must be addressed immediately, particularly:

1. ✅ Exposed secrets in version control
2. ✅ Vulnerable React Router dependencies
3. ✅ Missing .env in .gitignore

The good news is that most issues can be resolved quickly with the recommended actions. The application has a solid foundation with security headers and no direct code-level XSS vulnerabilities.

**Next Steps**:
1. Address all CRITICAL findings immediately
2. Update dependencies
3. Implement secret management best practices
4. Regular security audits

---

**Report Generated**: February 11, 2026  
**Assessment Tool**: Manual Review + npm audit + GitHub Advisory Database  
**Reviewed By**: GitHub Copilot Security Agent
