# Font Generator

A modern web-based font generator that converts plain text into stylized Unicode fonts. Built with Flask and featuring a responsive design with TailwindCSS.

#🔥Font Generator Demo

👉 https://font-generator-seven.vercel.app/

## Features

- **25+ Font Styles**: Transform text into various Unicode font styles including:
  - Typewriter/Monospace
  - Outline/Double-struck
  - Serif variations (bold, italic)
  - Sans-serif variations
  - Script styles
  - Fraktur (gothic) styles
  - Enclosed characters (circled, squared, parenthesized)
  - Special formatting (superscript, subscript, small caps, fullwidth)

- **Modern UI/UX**: Clean, responsive design optimized for both desktop and mobile devices
- **Search & Filter**: Quickly find specific font styles with real-time search
- **Copy Functionality**: One-click copy to clipboard for individual fonts or all fonts at once
- **Character Counter**: Visual feedback for text input with character limits
- **Toast Notifications**: User-friendly feedback for all actions

## Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: TailwindCSS
- **Icons**: Font Awesome
- **Font Conversion**: Custom Unicode character mapping system

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mufaz-vk/font-generator.git
cd font-generator
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set environment variables:
```bash
export SESSION_SECRET="your-secret-key-here"
```

4. Run the application:
```bash
python main.py
```

The application will be available at `http://localhost:5000`

## Project Structure

```
font-generator/
├── app.py              # Flask application setup
├── main.py             # Application entry point
├── fonts.py            # Font conversion logic
├── templates/
│   └── index.html      # Main template
├── static/
│   ├── style.css       # Custom styles
│   └── script.js       # JavaScript functionality
└── README.md
```

## Usage

1. **Enter Text**: Type or paste your text in the input field (up to 500 characters)
2. **Generate Fonts**: Click "Generate Fonts" to see all available style variations
3. **Search Styles**: Use the search bar to filter font styles by name
4. **Copy Text**: Click the "Copy" button on any font card to copy to clipboard
5. **Copy All**: Use "Copy All" to copy all visible font variations at once

## Font Conversion System

The application uses a custom font conversion system based on Unicode Mathematical Alphanumeric Symbols and other Unicode blocks. Each font style is implemented as a character-by-character mapping using predefined Unicode dictionaries.

### Supported Characters
- Letters: a-z, A-Z
- Numbers: 0-9
- Special characters (limited support depending on font style)

### Font Categories
- **Mathematical**: Serif, Sans-serif, Script, Fraktur variations
- **Enclosed**: Circled, Squared, Parenthesized characters
- **Positional**: Superscript, Subscript
- **Stylistic**: Typewriter, Outline, Small Caps, Fullwidth
- **Special**: Upside Down, Mirror, Currency, Regional Indicators

## API Endpoints

- `GET /` - Main page
- `POST /` - Generate fonts (form submission)

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Modern browsers with Clipboard API support are recommended for optimal copy functionality.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch 
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Developer

**MUHAMMED MUFAZ**  
AI Engineer

- GitHub: [github.com/mufaz-vk](https://github.com/mufaz-vk)
- LinkedIn: [linkedin.com/in/mufazvk](https://www.linkedin.com/in/mufazvk/)

## Acknowledgments

- Unicode Consortium for character specifications
- Font Awesome for icons
- TailwindCSS for styling framework
- Flask community for the excellent web framework

---

Built with ❤️ using Flask, Python, and modern web technologies
