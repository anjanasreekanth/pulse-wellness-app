const motivationalQuotes = [
  { quote: "You are doing great ....keep up the good work ", author: "System" },
  { quote: "Hardest step is starting, is what matters most", author: "System" },
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};
