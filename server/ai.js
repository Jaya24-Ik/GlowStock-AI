// Demo AI layer.
// This file can later call a real AI provider from the SERVER.
// Keep API keys here/server-side, never in public/js/app.js.

const products = [
  { name: "Matte Lipstick", category: "Makeup", stock: 18, min: 20, sales30: 46, price: 499 },
  { name: "Fit Me Foundation", category: "Makeup", stock: 12, min: 15, sales30: 38, price: 699 },
  { name: "Vitamin C Face Serum", category: "Skincare", stock: 7, min: 12, sales30: 41, price: 799 },
  { name: "Hydrating Moisturizer", category: "Skincare", stock: 31, min: 15, sales30: 21, price: 549 },
  { name: "Dream Lengths Shampoo", category: "Haircare", stock: 9, min: 14, sales30: 35, price: 449 },
  { name: "Aqua Perfume", category: "Fragrance", stock: 24, min: 10, sales30: 18, price: 899 }
];

function getAIInsights() {
  const insights = products.map(p => {
    const daily = Math.max(p.sales30 / 30, 0.1);
    const daysLeft = Math.round(p.stock / daily);
    const reorder = Math.max(Math.ceil(daily * 30) - p.stock, 0);
    return {
      product: p.name,
      category: p.category,
      daysLeft,
      reorder,
      confidence: Math.min(98, 72 + Math.round(p.sales30 / 5)),
      status: daysLeft <= 10 ? "urgent" : daysLeft <= 20 ? "watch" : "healthy"
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    summary: "AI analysis completed using recent sales velocity and current stock.",
    topRisk: insights.filter(x => x.status === "urgent").slice(0, 3),
    recommendations: insights.sort((a,b) => b.reorder-a.reorder).slice(0, 4),
    insights
  };
}

function askInventoryAssistant(q) {
  const text = q.toLowerCase();

  if (!text) return "Ask me about stock, reorder suggestions, sales, expiry, or products.";

  if (text.includes("low") || text.includes("stock")) {
    return "AI check: Vitamin C Face Serum, Dream Lengths Shampoo, Fit Me Foundation and Matte Lipstick need attention because their stock is near or below the minimum level.";
  }
  if (text.includes("reorder") || text.includes("purchase")) {
    return "AI recommendation: prioritize Vitamin C Face Serum and Dream Lengths Shampoo first. Their recent sales velocity suggests they may run low soon.";
  }
  if (text.includes("sale") || text.includes("sell") || text.includes("popular")) {
    return "AI trend: Vitamin C Face Serum and Matte Lipstick show strong recent sales velocity in the demo dataset.";
  }
  if (text.includes("expiry") || text.includes("expire")) {
    return "AI expiry check: review products with expiry dates within the next 90 days and use FEFO (First Expire, First Out) when issuing stock.";
  }
  if (text.includes("category")) {
    return "AI category insight: Makeup and Skincare are the main high-activity categories in this demo.";
  }

  return "Based on the current inventory data, I recommend monitoring low-stock items, reviewing expiry dates, and replenishing products with high sales velocity.";
}

module.exports = { getAIInsights, askInventoryAssistant };
