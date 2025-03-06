/**
 * Encodes a string into a Base64-encoded string.
 * @param input - The string to encode.
 * @returns A Base64-encoded string.
 */
function encode(input: string): string {
  return btoa(input);
}

/**
 * Decodes a Base64 string back into a regular string.
 * @param base64 - The Base64 string to decode.
 * @returns The decoded string.
 */
function decode(base64: string): string {
  return atob(base64);
}

export { encode, decode };
