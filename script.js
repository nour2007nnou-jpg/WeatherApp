const API_KEY = "8642e5127a79122612ba4a922270f380";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ar`;

  try {
    result.innerHTML = "<p>جاري التحميل...</p>";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("المدينة غير موجودة ☹️");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    result.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  result.innerHTML = `<h2>${data.name}</h2>
<img src="${iconUrl}" alt="weather icon" />
<p style="font-size: 48px; margin: 10px 0">${Math.round(data.main.temp)}°C</p>
<p>${data.weather[0].description}</p>
<p>💧 الرطوبة: ${data.main.humidity}%</p>
<p>💨 الرياح: ${data.wind.speed} م/ث</p>
`;
}
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    result.innerHTML = `<p style="color: red;">❌ اكتب اسم مدينة</p>`;
    return;
  }
  getWeather(city);
});
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
