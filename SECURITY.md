# Security Policy

## Supported Versions

We take security seriously and actively maintain the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Security Measures

### 1. Dependency Management
- All dependencies are regularly updated to their latest secure versions
- Automated vulnerability scanning via `yarn audit`
- Resolutions configured to enforce secure package versions
- Minimum Node.js version: 18.0.0 (LTS with security updates)

### 2. Input Validation
All number formatting utilities include:
- Null/undefined checks
- Type validation
- NaN and Infinity handling
- Empty string validation
- Safe parsing of user input

Example:
```javascript
// All inputs are validated before processing
if (number === null || number === undefined || number === '') {
  return '';
}
const numValue = typeof number === 'string' ? parseFloat(number) : number;
if (isNaN(numValue)) {
  return '';
}
```

### 3. XSS Prevention
- No use of `dangerouslySetInnerHTML`
- All user inputs are sanitized through React's built-in escaping
- Output is always text-based, never HTML injection

### 4. Build Security
- Vite with secure defaults
- Content Security Policy compatible
- No eval() or Function() constructors
- Tree-shaking removes unused code
- Source maps for production debugging

### 5. Development Environment
- ESLint configured with security rules
- No credentials or secrets in code
- `.env` files excluded from git
- Separate development and production configs

### 6. Third-Party Dependencies

Current security status:
```bash
yarn audit
# ✓ 0 vulnerabilities found
```

### Known Issues

#### Node.js Deprecation Warnings
The following deprecation warnings are from Node.js core and don't pose security risks:
- `[DEP0169]`: `url.parse()` - Used by yarn, not our code
- `[DEP0040]`: `punycode` module - Transitive dependency, will be updated when dependencies upgrade

These are informational only and do not affect application security.

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. DO NOT open a public issue

Security vulnerabilities should be reported privately to prevent exploitation.

### 2. Email the maintainer

Send a detailed report to: **srinivas69cse@gmail.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Based on severity
  - Critical: 24-48 hours
  - High: 7 days
  - Medium: 14 days
  - Low: 30 days

### 4. Disclosure Policy

We follow responsible disclosure:
1. Security issue reported privately
2. Issue confirmed and fix developed
3. Patch released
4. Public disclosure after users have time to update (typically 7 days)

## Security Best Practices for Users

### For Library Users

When using this library in your application:

```javascript
// ✓ Good: Validate user input before formatting
const userInput = request.body.amount;
if (isValidNumber(userInput)) {
  const formatted = formatNumber(userInput);
  // Use formatted value safely
}

// ✗ Bad: Blindly trust user input
const formatted = formatNumber(request.body.amount);
```

### For Application Users

When running the web application:

1. **Use HTTPS in production**
   ```bash
   # Serve with HTTPS
   yarn build
   # Deploy to HTTPS-enabled hosting
   ```

2. **Set appropriate CSP headers**
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
   ```

3. **Keep dependencies updated**
   ```bash
   yarn upgrade-interactive --latest
   yarn audit
   ```

4. **Environment Variables**
   - Never commit `.env` files
   - Use different values for dev/prod
   - Rotate secrets regularly

## Security Checklist

Before deploying:

- [ ] Run `yarn audit` and resolve all vulnerabilities
- [ ] Update all dependencies to latest secure versions
- [ ] Review CSP headers
- [ ] Enable HTTPS
- [ ] Check for hardcoded secrets
- [ ] Verify `.env` is in `.gitignore`
- [ ] Run production build and test
- [ ] Enable security headers (HSTS, X-Frame-Options, etc.)
- [ ] Review error messages (don't leak sensitive info)
- [ ] Test input validation

## Automated Security

### GitHub Security Features (Recommended)

Enable these on your repository:

1. **Dependabot** - Automatic dependency updates
2. **Security Advisories** - Private vulnerability reporting
3. **Code Scanning** - Automated security analysis
4. **Secret Scanning** - Detect committed secrets

### CI/CD Integration

Add to your CI pipeline:

```yaml
# Example GitHub Actions
- name: Security Audit
  run: yarn audit

- name: Dependency Check
  run: yarn outdated || true

- name: Lint
  run: yarn lint
```

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security](https://react.dev/reference/react-dom/server)
- [Vite Security](https://vitejs.dev/guide/features.html#build-optimizations)

## Version History

### v2.0.0 (Current)
- ✓ All dependencies updated to latest secure versions
- ✓ Input validation on all utility functions
- ✓ Zero known vulnerabilities
- ✓ Modern Node.js (>=18.0.0) with latest security patches
- ✓ Secure build pipeline with Vite

### v1.0.2 (Legacy - No longer supported)
- Outdated dependencies
- No security updates

---

**Last Updated**: 2025-01-16
**Security Contact**: srinivas69cse@gmail.com
