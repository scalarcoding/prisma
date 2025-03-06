const deriveKeyFromPassword = async (password: string, salt: string) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
  
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode(salt),
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  };

  // Encrypt the token
const encryptToken = async (token: string, password: string) => {
    const salt = crypto.getRandomValues(new Uint8Array(16)); // Random salt
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const key = await deriveKeyFromPassword(password, btoa(String.fromCharCode(...salt)));
  
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(token)
    );
  
    // Store the salt, IV, and encrypted token
    return JSON.stringify({
      salt: Array.from(salt),
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    });
  };
  
  // Decrypt the token
  const decryptToken = async (encryptedData: string, password: string) => {
    const { salt, iv, data } = JSON.parse(encryptedData);
    const key = await deriveKeyFromPassword(password, btoa(String.fromCharCode(...salt)));
  
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
  
    return new TextDecoder().decode(decrypted);
  };


  const encryptAndStore = async (data: string, key: CryptoKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(data)
    );
  
    // Convert to a storable format
    const storedData = JSON.stringify({
      iv: Array.from(iv),
      ciphertext: Array.from(new Uint8Array(encrypted)),
    });
  
    localStorage.setItem("encryptedData", storedData); // Save to localStorage
  };
  
  const retrieveAndDecrypt = async (key: CryptoKey) => {
    const storedData = localStorage.getItem("encryptedData");
    if (!storedData) throw new Error("No data found!");
  
    const { iv, ciphertext } = JSON.parse(storedData);
  
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      new Uint8Array(ciphertext)
    );
  
    return new TextDecoder().decode(decrypted); // Return the original data
  };
  

  export { deriveKeyFromPassword, encryptToken, decryptToken, encryptAndStore, retrieveAndDecrypt }