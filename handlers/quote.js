export async function getRandomQuote() {
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.json();
  return data[0].q;
}
