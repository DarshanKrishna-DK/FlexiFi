# FlexiFi - AI-Powered Finance Dashboard

A modern, animated React web application for FlexiFi, an AI-powered finance and asset analyzer that integrates with Fi's production MCP (Model Context Protocol) server.

## Features

- **Modern UI/UX**: Sleek design with purple theme and smooth animations
- **AI-Powered Insights**: Intelligent financial analysis and predictions
- **Asset Visualizations**: Interactive dashboards and charts
- **Voice & Text Commands**: Natural language processing for generating visualizations
- **Investment Analysis**: Comprehensive analysis for stocks, SIPs, mutual funds
- **Tool Integration**: Seamless integration with existing financial tools
- **Fi Authentication**: Secure authentication through Fi's production server
- **Environment Configuration**: Supports both development and production environments

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Styling**: CSS3 with custom animations
- **Backend Integration**: Fi Production MCP server
- **API Management**: TypeScript service layer with environment configuration

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Access to Fi's production API (for production mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Agentic-Dashboard-Visualizer
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   The application automatically uses the appropriate environment:
   - **Development**: Uses `.env.development` (mock server at localhost:8080)
   - **Production**: Uses `.env.production` (Fi production servers)

   You can override settings by creating a `.env.local` file.

4. **Start the React development server**
   ```bash
   # For development (uses mock data)
   npm start

   # For production build
   npm run build
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header with login button
│   ├── Hero.tsx            # Hero section with main CTA
│   ├── Features.tsx        # Features showcase
│   ├── About.tsx           # About section with testimonials
│   ├── Footer.tsx          # Footer with links and contact info
│   └── AuthModal.tsx       # Fi authentication modal
├── App.tsx                 # Main application component
├── index.tsx              # Application entry point
└── index.css              # Global styles and animations
```

## API Configuration

The application supports both development and production environments:

### Production Mode (Default)
- **API Base URL**: `https://api.fi.money`
- **MCP Endpoint**: `https://mcp.fi.money`
- **Authentication**: Full Fi production authentication
- **Data**: Real user data from Fi servers

### Development Mode
- **API Base URL**: `http://localhost:8080`
- **MCP Endpoint**: `http://localhost:8080`
- **Authentication**: Mock authentication with demo phone numbers
- **Data**: Simulated data for testing

### Environment Variables
```bash
# Production (.env.production)
REACT_APP_FI_API_BASE_URL=https://api.fi.money
REACT_APP_FI_MCP_ENDPOINT=https://mcp.fi.money
REACT_APP_ENVIRONMENT=production

# Development (.env.development)
REACT_APP_FI_API_BASE_URL=http://localhost:8080
REACT_APP_FI_MCP_ENDPOINT=http://localhost:8080
REACT_APP_ENVIRONMENT=development
```

## Authentication

The application integrates with Fi's OAuth authentication system:

### Production Authentication Flow:
1. Click "Login with Fi" button in the header
2. **Redirects to Fi's authentication server** (`https://auth.fi.money/oauth/authorize`)
3. User completes authentication on Fi's secure platform
4. Fi redirects back to the app with authorization code
5. App exchanges code for access token and stores session securely

### Development Authentication Flow:
- **Development**: Uses modal with demo phone numbers for testing (e.g., 1111111111, 2222222222)
- **Production**: Full OAuth redirect flow with Fi's production servers

### OAuth Configuration:
- **Client ID**: `flexifi_web_client` (production) / `flexifi_dev_client` (development)
- **Redirect URI**: `http://localhost:3000/auth/callback` (development) / `https://your-domain.com/auth/callback` (production)
- **Scopes**: `read:user read:accounts read:transactions`

## Demo Phone Numbers

For testing purposes, use any of these phone numbers:
- 1111111111, 2222222222, 3333333333, 4444444444, 5555555555
- 6666666666, 7777777777, 8888888888, 9999999999, 1010101010
- And more (see AuthModal component for full list)

## Available Scripts

### Development Scripts
- `npm start` - Runs the app in development mode
- `npm run start:dev` - Switch to development environment and start
- `npm run start:prod` - Switch to production environment and start
- `npm build` - Builds the app for production
- `npm run build:prod` - Switch to production environment and build
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

### Environment Management
- `npm run env:dev` - Switch to development environment
- `npm run env:prod` - Switch to production environment
- `npm run env:status` - Show current environment configuration

### Manual Environment Switching
```bash
# Switch to development (mock server)
node scripts/switch-env.js development

# Switch to production (Fi servers)
node scripts/switch-env.js production

# Check current environment
node scripts/switch-env.js status
```

## Features Overview

### 🎨 Modern Design
- Purple gradient theme
- Smooth animations and transitions
- Responsive design for all devices
- Glass morphism effects

### 🤖 AI Integration
- Natural language processing
- Voice command support
- Intelligent insights generation
- Predictive analytics

### 📊 Visualizations
- Interactive dashboards
- Real-time charts and graphs
- Custom visualization generation
- Asset performance tracking

### 🔒 Security
- Secure Fi authentication
- Bank-grade encryption
- Session management
- Privacy-focused design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email hello@flexifi.ai or join our community discussions.
