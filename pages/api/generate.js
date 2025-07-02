export default function handler(req, res) {
  // Şifre uzunluğunu parametreden al veya varsayılan 12 karakter kullan
  const length = parseInt(req.query.length) || 12;
  
  // Şifre oluşturma fonksiyonu
  function generatePassword(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }

  // Şifre oluştur
  const password = generatePassword(length);
  
  // Yanıt
  res.status(200).json({ 
    password: password,
    length: length,
    timestamp: new Date().toISOString()
  });
}