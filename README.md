# Booking AI

An AI-powered accommodation search platform that aggregates results from multiple sources (Booking.com, Google Hotels) and ranks them using intelligent scoring to help users find their perfect stay.

## Overview

Booking AI is a modern web application that searches for hotels, apartments, and other accommodations across multiple platforms, then uses AI-based scoring to present the best options tailored to user preferences.

### Key Features

- 🔍 **Multi-Source Search**: Aggregates results from Booking.com and Google Hotels
- 🤖 **AI-Powered Ranking**: Scores and ranks accommodations based on user preferences
- 💱 **Multi-Currency Support**: CZK, EUR, USD
- 🌍 **Multi-Language**: Czech and English
- 👨‍👩‍👧‍👦 **Family-Friendly**: Support for children with age-specific searches
- 💾 **Smart Persistence**: Remembers your last search preferences
- 📱 **Responsive Design**: Modern, mobile-friendly interface

## How It Works

### Architecture

```
┌─────────────┐
│   React     │  User Interface
│  Frontend   │  (Vite + Tailwind CSS)
└──────┬──────┘
       │
       │ HTTP/JSON
       │
┌──────▼──────┐
│   Express   │  API Server
│   Backend   │  (Node.js)
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       │              │              │
┌──────▼──────┐ ┌────▼─────┐ ┌──────▼──────┐
│ Booking.com │ │  Google  │ │   Scoring   │
│   Service   │ │  Hotels  │ │   Service   │
│  (RapidAPI) │ │ (SerpAPI)│ │   (AI/Mock) │
└─────────────┘ └──────────┘ └─────────────┘
```

### Search Flow

1. **User Input**: User enters location, dates, guests, preferences, and special instructions
2. **Parallel Fetching**: System fetches up to 50 results from each source simultaneously
3. **Aggregation**: All results are combined into a single pool (up to 100 accommodations)
4. **AI Scoring**: Each accommodation is scored based on:
   - Price competitiveness
   - Location quality
   - Amenities match
   - User reviews and ratings
   - Cleanliness and safety
   - Value for money
5. **Ranking**: Results are sorted by overall AI score
6. **Top Selection**: Top N results (based on user's limit) are returned
7. **Display**: Results shown with total price, per-night price, and detailed scores

### Result Aggregation Strategy

Unlike traditional search engines that limit results at the API level, Booking AI:
- Fetches **50 results** from Booking.com
- Fetches **50 results** from Google Hotels
- Scores **all 100 results** with AI
- Returns **top 10** (or user-specified limit) best matches

This ensures you get the absolute best options across all platforms, not just the first results from each source.

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API Keys:
  - [RapidAPI](https://rapidapi.com/tipsters/api/booking-com) for Booking.com
  - [SerpAPI](https://serpapi.com/) for Google Hotels

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Booking
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

3. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start the server
   cd server
   npm start

   # Terminal 2: Start the client
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:5173
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000

# API Keys
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=booking-com15.p.rapidapi.com
SERPAPI_KEY=your_serpapi_key_here

# Optional: For future AI scoring
OPENAI_API_KEY=your_openai_key_here
```

### API Key Setup

1. **RapidAPI (Booking.com)**:
   - Sign up at [RapidAPI](https://rapidapi.com)
   - Subscribe to [Booking.com API](https://rapidapi.com/tipsters/api/booking-com)
   - Copy your API key to `RAPIDAPI_KEY`

2. **SerpAPI (Google Hotels)**:
   - Sign up at [SerpAPI](https://serpapi.com)
   - Get your API key from the dashboard
   - Copy to `SERPAPI_KEY`

## Usage

1. **Enter Search Criteria**:
   - Location (city, country, or region)
   - Check-in and check-out dates
   - Number of adults and children
   - Children's ages (if applicable)
   - Preferred currency (CZK, EUR, USD)
   - Language (Czech or English)

2. **Set Preferences** (optional):
   - WiFi, Parking, Pool, Gym
   - Breakfast, Pet-friendly
   - Air conditioning, Kitchen
   - Balcony, Sea/Mountain view
   - Ski resort, Sauna, Hot tub, etc.

3. **Add AI Instructions** (optional):
   - Free text describing your ideal stay
   - Used by AI for better scoring

4. **Search**: Click "Search with AI"

5. **Review Results**:
   - See top-ranked accommodations
   - View detailed scores
   - Check total price and per-night rates
   - Click through to booking source

## Current Limitations

- **Booking.com API**: May have rate limits or require specific destination IDs
- **AI Scoring**: Currently using mock scores (real AI integration planned)
- **Admin Panel**: Not yet implemented
- **Airbnb**: No public API available
- **Location Autocomplete**: Basic text input (autocomplete planned)

## Roadmap

- [ ] Real AI scoring with OpenAI/Anthropic/Gemini
- [ ] Admin panel with Google OAuth
- [ ] Webhook integration for n8n
- [ ] Location autocomplete with country flags
- [ ] More accommodation sources
- [ ] Price tracking and alerts
- [ ] User accounts and saved searches

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
