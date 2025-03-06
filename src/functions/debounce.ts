/**
 * Creates a debounced version of a function.
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced function.
 */
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timer); // Reset the timer on each call
      timer = setTimeout(() => {
        func(...args); // Call the function after the delay
      }, delay);
    };
  }

  
export { debounce }