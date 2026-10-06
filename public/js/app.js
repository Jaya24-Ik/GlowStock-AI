const products = [
    {
        id: 1,
        name: "Matte Lipstick",
        brand: "Lakmé",
        category: "Makeup",
        price: 499,
        stock: 18,
        min: 20,
        sales: 45,
        expiry: "2027-06-15",
        image: "images/Lipstick.jpg"
    },
    {
        id: 2,
        name: "Fit Me Foundation",
        brand: "Maybelline",
        category: "Makeup",
        price: 699,
        stock: 12,
        min: 15,
        sales: 38,
        expiry: "2027-08-20",
        image: "images/Foundation.jpg"
    },
    {
        id: 3,
        name: "Vitamin C Face Serum",
        brand: "Mamaearth",
        category: "Skincare",
        price: 799,
        stock: 7,
        min: 15,
        sales: 31,
        expiry: "2027-04-10",
        image: "images/Faceserum.jpg"
    },
    {
        id: 4,
        name: "Hydrating Moisturizer",
        brand: "Pond's",
        category: "Skincare",
        price: 549,
        stock: 31,
        min: 15,
        sales: 28,
        expiry: "2027-11-05",
        image: "images/Moisturizer.jpg"
    },
    {
        id: 5,
        name: "Dream Lengths Shampoo",
        brand: "L'Oréal",
        category: "Haircare",
        price: 449,
        stock: 9,
        min: 12,
        sales: 35,
        expiry: "2027-09-12",
        image: "images/Shampoo.jpg"
    },
    {
        id: 6,
        name: "Aqua Perfume",
        brand: "Fogg",
        category: "Fragrance",
        price: 899,
        stock: 24,
        min: 10,
        sales: 18,
        expiry: "2028-01-20",
        image: "images/Perfume.jpg"
    },
    {
        id: 7,
        name: "Ultra Sheer Sunscreen",
        brand: "Neutrogena",
        category: "Skincare",
        price: 899,
        stock: 26,
        min: 15,
        sales: 42,
        expiry: "2027-03-18",
        image: "images/Sunscreen.jpg"
    },
    {
        id: 8,
        name: "Lash Sensational Mascara",
        brand: "Maybelline",
        category: "Makeup",
        price: 599,
        stock: 22,
        min: 10,
        sales: 29,
        expiry: "2027-07-25",
        image: "images/Mascara.jpg"
    },
    {
        id: 9,
        name: "Face Wash",
        brand: "Cetaphil",
        category: "Skincare",
        price: 399,
        stock: 34,
        min: 15,
        sales: 27,
        expiry: "2027-10-10",
        image: "images/Facewash.jpg"
    },
    {
        id: 10,
        name: "Body Mist",
        brand: "Body Cupid",
        category: "Body Care",
        price: 449,
        stock: 15,
        min: 10,
        sales: 16,
        expiry: "2027-12-15",
        image: "images/Bodycupid.jpg"
    },
    {
        id: 11,
        name: "Deep Moisture Body Lotion",
        brand: "Nivea",
        category: "Body Care",
        price: 349,
        stock: 29,
        min: 12,
        sales: 21,
        expiry: "2028-02-10",
        image: "images/Body Lotion.jpg"
    },
    {
        id: 12,
        name: "Hair Fall Rescue Serum",
        brand: "TRESemmé",
        category: "Haircare",
        price: 649,
        stock: 11,
        min: 12,
        sales: 19,
        expiry: "2027-08-30",
        image: "images/Hair serum.jpg"
    }
];
function go(page){
 document.querySelectorAll(".page").forEach(x=>x.classList.remove("active-page"));
 document.getElementById(page).classList.add("active-page");
 document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
 document.getElementById("pageTitle").textContent=page==="ai"?"AI Insights":page[0].toUpperCase()+page.slice(1);
 if(page==="products")renderProducts();
 if(page==="inventory")renderInventory();
 if(page==="ai")renderAI();
 document.getElementById("sidebar").classList.remove("open");
 window.scrollTo(0,0);
}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>go(n.dataset.page));
function toggleSidebar(){document.getElementById("sidebar").classList.toggle("open")}
function status(p){return p.stock===0?["out","Out of Stock"]:p.stock<=p.min?["low","Low Stock"]:["good","Healthy"]}
function productRow(p) {
    const s = status(p);

    return `
        <tr>
            <td>
                <div class="product-cell">
                    <div class="product-img">
                        <img 
                            src="${p.image}" 
                            alt="${p.name}"
                            onerror="this.src='images/Lipstick.jpg'"
                        >
                    </div>

                    <div>
                        <b>${p.name}</b>
                        <small>${p.brand} • SKU GS-${1000 + p.id}</small>
                    </div>
                </div>
            </td>

            <td>${p.category}</td>

            <td>₹${p.price.toLocaleString("en-IN")}</td>

            <td>
                <b>${p.stock}</b> units
            </td>

            <td>
                <span class="badge ${s[0]}">${s[1]}</span>
            </td>

            <td>
                ${new Date(p.expiry).toLocaleDateString("en-IN")}
            </td>

            <td>
                <button 
                    class="text-btn" 
                    onclick="showToast('Product details opened')">
                    View
                </button>
            </td>
        </tr>
    `;
}

function renderProducts(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 const c=document.getElementById("categoryFilter")?.value||"";
 document.getElementById("productRows").innerHTML=products.filter(p=>(!q||(p.name+p.brand+p.category).toLowerCase().includes(q))&&(!c||p.category===c)).map(productRow).join("");
}
function renderInventory(){
 document.getElementById("inventoryRows").innerHTML=products.map(p=>{
   const days=Math.max(1,Math.round(p.stock/(p.sales/30)));
   const reorder=Math.max(Math.ceil(p.sales)-p.stock,0);
   return `<tr><td><b>${p.name}</b><br><small>${p.brand}</small></td><td><b>${p.stock}</b></td><td>${p.min}</td><td>${p.sales}</td><td><span class="${days<=10?"risk-tag":"forecast"}">${days<=10?"High risk":"~"+days+" days cover"}</span></td><td><button class="text-btn" onclick="showToast('AI recommends ordering '+reorder+' units')">AI Suggest</button></td></tr>`
 }).join("");
}
function renderAI(){
 const risk=products.map(p=>({...p,days:Math.max(1,Math.round(p.stock/(p.sales/30))),reorder:Math.max(Math.ceil(p.sales)-p.stock,0)})).sort((a,b)=>a.days-b.days);
 document.getElementById("riskList").innerHTML=risk.slice(0,4).map(p=>`<div class="risk-item"><div><b>${p.name}</b><small>${p.stock} units • ${p.sales} sold in 30 days</small></div><span class="risk-tag">${p.days} days left</span></div>`).join("");
 document.getElementById("reorderList").innerHTML=risk.filter(p=>p.reorder>0).slice(0,4).map(p=>`<div class="reorder-item"><div><b>${p.name}</b><small>Current ${p.stock} • Minimum ${p.min}</small></div><span class="reorder-tag">Order ${p.reorder}</span></div>`).join("");
}
async function runAI(){
 const s=document.getElementById("aiStatus"); if(s)s.textContent="ANALYZING...";
 showToast("✦ AI is analyzing sales velocity and stock...");
 await new Promise(r=>setTimeout(r,900));
 if(s)s.textContent="UPDATED";
 renderAI();
 showToast("AI analysis completed");
}
async function askAI(){
 const input=document.getElementById("question"); const q=input.value.trim(); if(!q)return;
 const chat=document.getElementById("chat");
 chat.innerHTML+=`<div class="user-msg"><span>${escapeHtml(q)}</span></div>`;
 let answer;
 try{
  const r=await fetch("/api/ai/assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q})});
  const d=await r.json(); answer=d.answer;
 }catch(e){answer=localAI(q)}
 chat.innerHTML+=`<div class="bot">✦ <span>${answer}</span></div>`;
 input.value=""; chat.scrollTop=chat.scrollHeight;
}
function localAI(q){
 q=q.toLowerCase();
 if(q.includes("low"))return"AI check: Vitamin C Face Serum, Dream Lengths Shampoo, Fit Me Foundation and Matte Lipstick need attention.";
 if(q.includes("reorder")||q.includes("purchase"))return"Prioritize Vitamin C Face Serum and Dream Lengths Shampoo based on sales velocity.";
 if(q.includes("sale")||q.includes("sell"))return"Vitamin C Face Serum and Matte Lipstick show strong recent sales velocity.";
 if(q.includes("expiry"))return"Review products expiring within 90 days and use FEFO when issuing stock.";
 return"Monitor low-stock items, expiry dates and high-demand products for the next purchase.";
}
function quickAsk(q){document.getElementById("question").value=q;askAI()}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openModal(){document.getElementById("modal").classList.add("open")}
function closeModal(){document.getElementById("modal").classList.remove("open")}
function addProduct(){
 const name=document.getElementById("newName").value.trim();if(!name)return showToast("Enter a product name");
 products.push({id:Date.now(),name,brand:document.getElementById("newBrand").value||"New Brand",category:document.getElementById("newCat").value,price:Number(document.getElementById("newPrice").value)||0,stock:Number(document.getElementById("newStock").value)||0,min:10,sales:0,expiry:"2028-12-31",image:"https://images.unsplash.com/photo-1711553102487-17d221102837?auto=format&fit=crop&q=80&w=700"});
 closeModal();renderProducts();showToast("Product added successfully");
}
function exportCSV(){
 const rows=[["Product","Brand","Category","Price","Stock","Minimum","30-Day Sales","Expiry"],...products.map(p=>[p.name,p.brand,p.category,p.price,p.stock,p.min,p.sales,p.expiry])];
 const blob=new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="glowstock-products.csv";a.click();URL.revokeObjectURL(a.href);
}
renderProducts();renderInventory();renderAI();
