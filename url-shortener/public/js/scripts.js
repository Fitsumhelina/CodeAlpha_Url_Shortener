document.getElementById('url-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const longUrl = document.getElementById('longUrl').value;
  
    try {
      const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const resultDiv = document.getElementById('result');
        const shortUrlAnchor = document.getElementById('shortUrl');
  
        shortUrlAnchor.href = data.shortUrl;
        shortUrlAnchor.textContent = data.shortUrl;
        resultDiv.classList.remove('hidden');
      } else {
        alert(data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  