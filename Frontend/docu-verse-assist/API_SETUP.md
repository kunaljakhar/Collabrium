# API Setup Guide

## Google AI API Configuration

To use the AI agents in this application, you need to configure your Google AI API key.

### Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### Step 2: Configure Environment Variables

Create a `.env` file in the root of the `docu-verse-assist` directory:

```bash
# In Partnership-for-goals/Frontend/docu-verse-assist/.env
VITE_GOOGLE_AI_API_KEY=your_actual_api_key_here
```

**Important Notes:**
- Replace `your_actual_api_key_here` with your actual Google AI API key
- The prefix `VITE_` is required for Vite to expose the variable to the client
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`

### Step 3: Available AI Agents

Once configured, you'll have access to these AI agents in the sidebar:

1. **AI Assistant** (`/chat`) - General purpose conversational AI
2. **Document Analyzer** (`/analyzer`) - Analyze documents with different analysis types
3. **Contract Reviewer** (`/contract-review`) - Legal contract analysis and risk assessment  
4. **Content Generator** (`/generator`) - Generate professional documents and templates

### Step 4: Verify Setup

1. Start the development server: `npm run dev`
2. Navigate to the Chat page
3. You should see a "Connected" status badge
4. If you see "Disconnected", check your API key configuration

### Troubleshooting

- **Connection Failed**: Verify your API key is correct and has proper permissions
- **TypeScript Errors**: Make sure you've restarted your development server after adding the `.env` file
- **API Limits**: Google AI has rate limits - if you hit them, wait a moment before trying again

### Current API Key Configuration

Your API key is currently hardcoded in the configuration for development purposes:
```
AIzaSyBX6zDn4ZzYZshUkJAx3eb1J2OBprsgAsw
```

For production, always use environment variables instead of hardcoded keys. 