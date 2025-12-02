const translations = {
  en: {
    title: "Welcome to Water Footprint Project",
    about: "About",
    saveWater: "How to Save Water",
    news: "News & Articles",
    calculator: "Calculator",
    homeContent: "Calculate Your Water Footprint",
    aboutContent: "This project spreads awareness about water footprints and teaches how to use water wisely.",
    saveWaterContent: "Turn off taps, fix leaks, use bucket instead of shower, and reuse grey water for plants.",
    newsContent: "Read latest news and research about water scarcity and sustainability efforts.",
    calcContent: "Use this tool to calculate your daily water footprint and learn how to reduce it."
  },
  hi: {
    title: "वॉटर फुटप्रिंट परियोजना में आपका स्वागत है",
    about: "के बारे में",
    saveWater: "पानी बचाने के तरीके",
    news: "समाचार और लेख",
    calculator: "कैलकुलेटर",
    homeContent: "अपना पानी का फुटप्रिंट गणना करें",
    aboutContent: "यह परियोजना पानी के फुटप्रिंट के बारे में जागरूकता फैलाती है और पानी का समझदारी से उपयोग करना सिखाती है।",
    saveWaterContent: "नल बंद करें, लीकेज ठीक करें, शॉवर की जगह बाल्टी का उपयोग करें, और पौधों के लिए ग्रे वॉटर का पुन: उपयोग करें।",
    newsContent: "पानी की कमी और स्थिरता पर नवीनतम समाचार और शोध पढ़ें।",
    calcContent: "इस टूल का उपयोग करके अपना दैनिक वॉटर फुटप्रिंट निकालें और इसे कम करने के तरीके जानें।"
  }
};

function changeLanguage(lang) {
  if (document.querySelector("h1")) document.querySelector("h1").textContent = translations[lang].title;
  if (document.querySelector('a[href="about.html"]')) document.querySelector('a[href="about.html"]').textContent = translations[lang].about;
  if (document.querySelector('a[href="save-water.html"]')) document.querySelector('a[href="save-water.html"]').textContent = translations[lang].saveWater;
  if (document.querySelector('a[href="news.html"]')) document.querySelector('a[href="news.html"]').textContent = translations[lang].news;
  if (document.querySelector('a[href="calculate.html"]')) document.querySelector('a[href="calculate.html"]').textContent = translations[lang].calculator;

  if (document.querySelector("#home-content")) document.querySelector("#home-content").textContent = translations[lang].homeContent;
  if (document.querySelector("#about-content")) document.querySelector("#about-content").textContent = translations[lang].aboutContent;
  if (document.querySelector("#save-water-content")) document.querySelector("#save-water-content").textContent = translations[lang].saveWaterContent;
  if (document.querySelector("#news-content")) document.querySelector("#news-content").textContent = translations[lang].newsContent;
  if (document.querySelector("#calc-content")) document.querySelector("#calc-content").textContent = translations[lang].calcContent;
}
