# GlowStock AI — AI-Powered Cosmetic Inventory Management System

A college-project-ready full-stack starter for managing cosmetic products, stock, suppliers, sales, expiry dates and AI-based inventory insights.

## Features
- Modern responsive dashboard
- Product, inventory, supplier and sales management
- Low-stock and expiry alerts
- AI-style stock prediction and reorder recommendations
- AI Inventory Assistant (rule-based demo that works without an API key)
- Sales/category analytics
- CSV export
- Node.js + Express backend structure
- MySQL database schema
- Ready for connection to a real AI API later

## Run

1. Install Node.js.
2. Open terminal in this folder.
3. Run:
   `npm install`
4. Run:
   `npm start`
5. Open:
   `http://localhost:3000`

The demo works without MySQL or an AI API because the frontend uses sample data.

## Real AI upgrade
The `/server/ai.js` file is intentionally separated so an OpenAI/Gemini-compatible API can be connected later. Never put an API key in frontend JavaScript.

## Database
Import `database/schema.sql` into MySQL when you are ready for database integration.
