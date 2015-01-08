var React = require('react');
var ReactDOM = require('react-dom');

var WeatherApp = React.createClass({
    getInitialState: function() {
        return {
            city: '',
            temperature: '',
            description: '',
            error: null
        };
    },
    

    fetchWeather: function(city) {
        var apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey;
        
        var xhr = new XMLHttpRequest();
        var self = this;
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                self.setState({
                    city: response.name,
                    temperature: response.main.temp + '°C',
                    description: response.weather[0].description,
                    error: null
                });
            } else if (xhr.readyState === 4) {
                self.setState({ error: 'City not found' });
            }
        };
        
        xhr.open('GET', url, true);
        xhr.send();
    },

    handleSubmit: function(event) {
        event.preventDefault();
        var city = this.refs.cityInput.value.trim();
        if (city) {
            this.fetchWeather(city);
        }
    },

    render: function() {
        return (
            React.createElement('div', { style: styles.container },
                React.createElement('h2', null, 'Weather App (React 2015)'),
                React.createElement('form', { onSubmit: this.handleSubmit, style: styles.form },
                    React.createElement('input', { type: 'text', ref: 'cityInput', placeholder: 'Enter city name', style: styles.input }),
                    React.createElement('button', { type: 'submit', style: styles.button }, 'Get Weather')
                ),
                this.state.city ? React.createElement('div', { style: styles.result },
                    React.createElement('h3', null, 'City: ', this.state.city),
                    React.createElement('p', null, 'Temperature: ', this.state.temperature),
                    React.createElement('p', null, 'Description: ', this.state.description)
                ) : null,
                this.state.error ? React.createElement('p', { style: styles.error }, this.state.error) : null
            )
        );
    }
});

// Simple inline styles
var styles = {
    container: { textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' },
    form: { marginBottom: '10px' },
    input: { padding: '8px', marginRight: '5px', width: '200px' },
    button: { padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' },
    result: { marginTop: '15px', padding: '10px', border: '1px solid #ccc', display: 'inline-block', backgroundColor: '#f9f9f9' },
    error: { color: 'red', marginTop: '10px' }
};

ReactDOM.render(
    React.createElement(WeatherApp, null),
    document.getElementById('root')
);
