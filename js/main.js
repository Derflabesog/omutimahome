// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Check which page we are on and load corresponding dynamic data
  if (document.getElementById('tool-table-body')) {
    loadToolsFromSupabase();
  }
  if (document.getElementById('popular-cards-container')) {
    loadPopularToolsFromSupabase();
  }
  if (document.getElementById('developments-container')) {
    loadDevelopmentsFromSupabase();
  }
});

// 1. Populate the Tool Hire Full Table
async function loadToolsFromSupabase() {
  const tableBody = document.getElementById('tool-table-body');
  const client = window._supabase || _supabase;
  if (!client) return;

  const { data, error } = await client
    .from('listings')
    .select('*')
    .eq('category', 'tool-hire')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tools:', error.message);
    return;
  }

  if (data && data.length > 0) {
    tableBody.innerHTML = ''; 
    data.forEach(item => {
      const row = document.createElement('tr');
      const imageUrl = item.image_url || 'https://via.placeholder.com/50?text=Tool';
      
      row.innerHTML = `
        <td><img src="${imageUrl}" alt="${item.title}" class="table-img" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
        <td><strong>${item.title}</strong></td>
        <td><span class="rate-tag">${item.price}</span></td>
        <td><a href="contact.html?tool=${encodeURIComponent(item.title)}" class="btn btn-gold btn-sm">Reserve</a></td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// 2. Populate the Tool Hire Popular Cards (Top 3 items)
async function loadPopularToolsFromSupabase() {
  const container = document.getElementById('popular-cards-container');
  const client = window._supabase || _supabase;
  if (!client) return;

  const { data, error } = await client
    .from('listings')
    .select('*')
    .eq('category', 'tool-hire')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching popular tools:', error.message);
    return;
  }

  if (data && data.length > 0) {
    container.innerHTML = ''; 

    data.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      const imageUrl = item.image_url || 'https://via.placeholder.com/300x200?text=Tool';

      card.innerHTML = `
        <div class="pricing-badge">${item.price} / Day</div>
        <div class="card-body" style="padding: 0;">
          <img src="${imageUrl}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 4px 4px 0 0; margin-bottom: 1rem;">
          <h3>${item.title}</h3>
          <p>${item.description || 'Reliable equipment for your site and projects.'}</p>
        </div>
        <div class="card-footer" style="margin-top: 1rem;">
          <a href="contact.html?tool=${encodeURIComponent(item.title)}" class="btn btn-burgundy full-width">Book ${item.title} &rarr;</a>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

// 3. Populate Real Estate Developments
async function loadDevelopmentsFromSupabase() {
  const container = document.getElementById('developments-container');
  const client = window._supabase || _supabase;
  if (!client) return;

  const { data, error } = await client
    .from('listings')
    .select('*')
    .eq('category', 'development')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching developments:', error.message);
    return;
  }

  if (data && data.length > 0) {
    container.innerHTML = ''; 

    data.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      const imageUrl = item.image_url || 'https://via.placeholder.com/300x200?text=Development';

      card.innerHTML = `
        <div class="pricing-badge">${item.price}</div>
        <div class="card-body" style="padding: 0;">
          <img src="${imageUrl}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px 4px 0 0; margin-bottom: 1rem;">
          <h3>${item.title}</h3>
          <p>${item.description || 'Modern residential development in Okahandja.'}</p>
        </div>
        <div class="card-footer" style="margin-top: 1rem;">
          <a href="contact.html?property=${encodeURIComponent(item.title)}" class="btn btn-burgundy full-width">Inquire Now &rarr;</a>
        </div>
      `;
      container.appendChild(card);
    });
  }
}