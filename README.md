# Taylor Plumbing London - AI-Powered Website

A modern, beautiful website for a London plumber with full AI chatbot integration.

## ✨ Features

- **🤖 AI Chatbot** - Interactive assistant that handles:
  - Emergency service inquiries
  - Price quotes
  - Booking requests
  - General questions
  
- **📅 Online Booking** - Full appointment booking system with:
  - Service selection
  - Customer details capture
  - Form submission
  
- **📞 Click-to-Call** - Easy phone contact
- **🛠️ Service Listings** - Complete services with pricing
- **🌍 Coverage Areas** - London neighborhoods served
- **⚡ 24/7 Emergency** - Prominent emergency messaging
- **📱 Fully Responsive** - Works on all devices

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Go to: https://vercel.com/new
2. Click "Import Project"
3. Select this repository from GitHub
4. Click "Deploy" - done!

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 3: GitHub + Vercel Integration

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect to Vercel:
- Go to https://vercel.com
- Import your GitHub repo
- Deploy automatically on every push

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
taylor-plumbing-london/
├── src/
│   └── app/
│       ├── page.tsx      # Main homepage with AI chatbot
│       ├── layout.tsx    # Root layout
│       └── globals.css   # Global styles
├── public/               # Static assets
├── package.json          # Dependencies
└── next.config.ts       # Next.js config
```

## 🎨 Customization

Edit `src/app/page.tsx` to customize:
- Business name, address, phone
- Services and pricing
- Chatbot responses
- Colors and branding

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Hosting:** Vercel

## 📞 Contact

For questions: info@autoaiwebsolutions.com

---

Built with ❤️ by [AutoAI Web Solutions](https://autoaiwebsolutions.com)
