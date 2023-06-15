export default function getToken() {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem('token');
    return item ? String(item) : null; // Return token as a string or null
  }
  return null; // Return null if window is undefined (e.g., during server-side rendering)
}
