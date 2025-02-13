# AI Polyglot Chat Hub

A multilingual AI chat application supporting multiple roles and languages, powered by Gemini and Typhoon AI.

## Features
- 🌐 Supports Thai and English
- 👥 Multiple AI roles (General Assistant, Business Advisor, Chef, etc.)
- 🎨 Dynamic UI themes based on roles
- 📱 Responsive design
- 🔒 Secure API handling

## Demo
Visit: [AI Polyglot Chat Hub Demo](https://your-deployed-url.com)

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Spidergy07/AI-Polyglot-Chat-Hub.git
cd AI-Polyglot-Chat-Hub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key
TYPHOON_API_KEY=your_typhoon_api_key
ALLOWED_DOMAIN=localhost
```

4. Start the development server:
```bash
npm run dev
```

## Deployment on Vercel

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Add the following environment variables in Vercel:
   - `GEMINI_API_KEY`
   - `TYPHOON_API_KEY`
   - `ALLOWED_DOMAIN`

## Security
- API keys are securely handled through server-side API routes
- Rate limiting implemented
- CORS and referrer checking
- Security headers configured

## Getting API Keys
1. Gemini API: https://makersuite.google.com/app/apikey
2. Typhoon API: https://typhoon-th.com/

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License - see LICENSE file for details

## Author
Spidergy07

## Acknowledgments
- Google Gemini API
- Typhoon AI
- React
- Tailwind CSS 