# FlexiFi Production Setup Guide

## 🔑 Required Configuration from Fi Team

Before deploying to production, you need to obtain the following from Fi:

### 1. OAuth Application Registration
Contact Fi team to register your application and get:

```bash
# OAuth Client Credentials
REACT_APP_CLIENT_ID=your_actual_fi_client_id
REACT_APP_CLIENT_SECRET=your_fi_client_secret  # If required
```

### 2. Production API Endpoints
Verify these URLs with Fi team:

```bash
# Base URLs
REACT_APP_FI_API_BASE_URL=https://api.fi.money
REACT_APP_FI_MCP_ENDPOINT=https://mcp.fi.money
REACT_APP_FI_AUTH_URL=https://auth.fi.money/oauth/authorize

# API Endpoints
REACT_APP_LOGIN_ENDPOINT=/auth/login
REACT_APP_AUTH_CALLBACK_ENDPOINT=/auth/callback
REACT_APP_USER_DATA_ENDPOINT=/api/user
REACT_APP_DASHBOARD_DATA_ENDPOINT=/api/dashboard
REACT_APP_CHAT_ENDPOINT=/api/chat
```

### 3. OAuth Scopes and Permissions
Confirm the required scopes with Fi:
- `read:user` - Access user profile information
- `read:accounts` - Access account balances and details
- `read:transactions` - Access transaction history
- `read:portfolios` - Access investment portfolios

## 🚀 Production Deployment Steps

### Step 1: Environment Configuration
1. Copy the template file:
   ```bash
   cp .env.template .env.production
   ```

2. Fill in the actual values from Fi team:
   ```bash
   # Edit .env.production with real values
   REACT_APP_CLIENT_ID=your_real_client_id
   REACT_APP_REDIRECT_URI=https://your-actual-domain.com/auth/callback
   ```

### Step 2: Domain Configuration
1. Update your production domain in `.env.production`:
   ```bash
   REACT_APP_REDIRECT_URI=https://your-domain.com/auth/callback
   ```

2. Register this redirect URI with Fi team

### Step 3: Build and Deploy
```bash
# Switch to production environment
npm run env:prod

# Build for production
npm run build

# Deploy the build folder to your hosting platform
```

## 🔒 Security Considerations

### Environment Variables
- **Never commit** `.env.production` with real secrets to version control
- **Use your hosting platform's** environment variable system for production
- **Rotate credentials** regularly

### OAuth Security
- **HTTPS only** in production
- **Validate state parameter** (already implemented)
- **Short token expiration** times
- **Secure token storage** (already implemented)

## 🧪 Testing OAuth Flow

### Development Testing
```bash
# Test with mock server
npm run start:dev
```

### Production Testing
```bash
# Test with Fi production servers
npm run start:prod
```

### OAuth Flow Testing
1. Click "Login with Fi"
2. Should redirect to Fi's OAuth page
3. Complete authentication on Fi's platform
4. Should redirect back to `/auth/callback`
5. Should show success message and redirect to dashboard

## 📞 Fi Team Contact Points

When contacting Fi team, request:

1. **OAuth Client Registration**
   - Application name: FlexiFi
   - Redirect URIs: Your production callback URLs
   - Required scopes: `read:user read:accounts read:transactions`

2. **API Documentation**
   - Authentication endpoints
   - User data endpoints
   - MCP chat endpoints
   - Rate limits and quotas

3. **Testing Credentials**
   - Sandbox/staging environment access
   - Test user accounts
   - API testing tools

## 🐛 Troubleshooting

### Common Issues

**OAuth Redirect Not Working:**
- Check redirect URI matches exactly with Fi registration
- Ensure HTTPS in production
- Verify client ID is correct

**API Calls Failing:**
- Check base URLs are correct
- Verify authentication headers
- Check CORS settings

**Token Expiration:**
- Implement token refresh logic
- Handle 401 responses gracefully
- Clear expired sessions

### Debug Mode
Set this for additional logging:
```bash
REACT_APP_DEBUG=true
```

## 📋 Deployment Checklist

- [ ] Obtained OAuth client credentials from Fi
- [ ] Verified all API endpoints with Fi team
- [ ] Updated production domain in environment config
- [ ] Registered redirect URI with Fi
- [ ] Tested OAuth flow in staging
- [ ] Configured HTTPS for production
- [ ] Set up environment variables in hosting platform
- [ ] Tested production build locally
- [ ] Deployed and verified OAuth flow works end-to-end
