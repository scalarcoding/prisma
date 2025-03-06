function unixToSupabaseTimestamptz(unixTimestamp:number) {
    // Convert the Unix timestamp to milliseconds for Date object
    const date = new Date(unixTimestamp * 1000);
    return date.toISOString(); // Returns ISO 8601 format
  }
  
  // Example usage
  const unixTimestamp = 1732672188;
  console.log(unixToSupabaseTimestamptz(unixTimestamp));
  // Output: "2024-11-26T12:49:48.000Z"

  
  export {unixToSupabaseTimestamptz} 