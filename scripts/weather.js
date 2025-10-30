import "../styles/weather.css"; 

const WEATHER_API_KEY = 'df9facbcbc7370c8519f19b8c429a17e'; 
const WEATHER_BASE_URL = 'https://api.weatherstack.com';

const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    currentLocationBtn: document.getElementById('currentLocationBtn'),
    weatherLoading: document.getElementById('weatherLoading'),
    weatherContent: document.getElementById('weatherContent'),
    weatherError: document.getElementById('weatherError'),
    errorMessage: document.getElementById('errorMessage'),
    cityName: document.getElementById('cityName'),
    country: document.getElementById('country'),
    date: document.getElementById('date'),
    temperature: document.getElementById('temperature'),
    feelsLike: document.getElementById('feelsLike'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherDescription: document.getElementById('weatherDescription'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    visibility: document.getElementById('visibility')
};

document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadWeather('Moscow');
    
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    if (elements.currentLocationBtn) {
        elements.currentLocationBtn.addEventListener('click', getCurrentLocation);
    }
}

function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (city) {
        loadWeather(city);
    } else {
        showError('Пожалуйста, введите название города');
    }
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Геолокация не поддерживается вашим браузером');
        return;
    }
    
    setLoading(true);
    elements.currentLocationBtn.disabled = true;
    
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            loadWeatherByCoords(latitude, longitude);
            elements.currentLocationBtn.disabled = false;
        },
        error => {
            showError('Не удалось получить ваше местоположение');
            elements.currentLocationBtn.disabled = false;
            setLoading(false);
        }
    );
}

async function loadWeather(city = 'Moscow') {
    setLoading(true);
    hideError();
    
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
    }
}

async function loadWeatherByCoords(lat, lon) {
    setLoading(true);
    hideError();
    
    try {
        const weatherData = await fetchWeatherData(`${lat},${lon}`);
        displayWeatherData(weatherData);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
    }
}

async function fetchWeatherData(query) {
    const url = `${WEATHER_BASE_URL}/current?access_key=${WEATHER_API_KEY}&query=${encodeURIComponent(query)}&units=m`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Ошибка сети');
    }
    
    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.info || 'Ошибка получения данных');
    }
    
    return data;
}

function displayWeatherData(data) {
    if (!data.current || !data.location) {
        throw new Error('Неверный формат данных');
    }
    
    const current = data.current;
    const location = data.location;
    
    elements.cityName.textContent = location.name;
    elements.country.textContent = location.country;
    elements.date.textContent = formatDate(location.localtime);
    elements.temperature.textContent = `${Math.round(current.temperature)}°C`;
    elements.feelsLike.textContent = `${Math.round(current.feelslike)}°C`;
    
    if (current.weather_icons?.[0]) {
        elements.weatherIcon.src = current.weather_icons[0];
        elements.weatherIcon.alt = current.weather_descriptions?.[0] || '';
    }
    
    if (current.weather_descriptions) {
        elements.weatherDescription.textContent = current.weather_descriptions[0];
    }
    
    elements.humidity.textContent = `${current.humidity}%`;
    elements.windSpeed.textContent = `${current.wind_speed} км/ч`;
    elements.pressure.textContent = `${current.pressure} гПа`;
    elements.visibility.textContent = `${current.visibility} км`;
    
    showContent();
}

function formatDate(localtimeString) {
    if (!localtimeString) return 'Дата не доступна';
    
    try {
        const [datePart, timePart] = localtimeString.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        const date = new Date(year, month - 1, day, hours, minutes);
        
        return date.toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return localtimeString;
    }
}

function setLoading(isLoading) {
    elements.weatherLoading.style.display = isLoading ? 'block' : 'none';
    elements.weatherContent.style.display = isLoading ? 'none' : 'block';
    elements.weatherError.style.display = 'none';
    
    if (elements.searchBtn) {
        elements.searchBtn.disabled = isLoading;
        const btnText = elements.searchBtn.querySelector('.btn-text');
        const btnSpinner = elements.searchBtn.querySelector('.btn-spinner');
        if (btnText) btnText.style.display = isLoading ? 'none' : 'block';
        if (btnSpinner) btnSpinner.style.display = isLoading ? 'block' : 'none';
    }
}

function showContent() {
    elements.weatherContent.style.display = 'block';
    elements.weatherError.style.display = 'none';
}

function showError(message) {
    elements.weatherContent.style.display = 'none';
    elements.weatherLoading.style.display = 'none';
    elements.weatherError.style.display = 'block';
    elements.errorMessage.textContent = message;
}

function hideError() {
    elements.weatherError.style.display = 'none';
}

window.loadWeather = loadWeather;