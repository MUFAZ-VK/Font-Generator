import os
import logging
from flask import Flask, render_template, request
from fonts import Fonts

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key")

@app.route('/', methods=['GET', 'POST'])
def index():
   
    converted_fonts = {}
    input_text = ""
    
    if request.method == 'POST':
        input_text = request.form.get('text', '').strip()
        
        if input_text:
            font_converter = Fonts()
            
            font_methods = [
                ('typewriter', 'Typewriter', font_converter.typewriter),
                ('outline', 'Outline', font_converter.outline),
                ('serif', 'Serif Bold', font_converter.serif),
                ('bold_cool', 'Bold Script', font_converter.bold_cool),
                ('bold_italic', 'Bold Italic', font_converter.bold_italic),
                ('italic', 'Italic', font_converter.italic),
                ('sans_serif', 'Sans Serif', font_converter.sans_serif),
                ('sans_serif_bold', 'Sans Serif Bold', font_converter.sans_serif_bold),
                ('sans_serif_italic', 'Sans Serif Italic', font_converter.sans_serif_italic),
                ('sans_serif_bold_italic', 'Sans Serif Bold Italic', font_converter.sans_serif_bold_italic),
                ('script', 'Script', font_converter.script),
                ('script_bold', 'Script Bold', font_converter.script_bold),
                ('fraktur', 'Fraktur', font_converter.fraktur),
                ('fraktur_bold', 'Fraktur Bold', font_converter.fraktur_bold),
                ('circled', 'Circled', font_converter.circled),
                ('circled_negative', 'Circled Negative', font_converter.circled_negative),
                ('squared', 'Squared', font_converter.squared),
                ('squared_negative', 'Squared Negative', font_converter.squared_negative),
                ('parenthesized', 'Parenthesized', font_converter.parenthesized),
                ('fullwidth', 'Fullwidth', font_converter.fullwidth),
                ('small_caps', 'Small Caps', font_converter.small_caps),
                ('superscript', 'Superscript', font_converter.superscript),
                ('subscript', 'Subscript', font_converter.subscript),
                ('upside_down', 'Upside Down', font_converter.upside_down),
                ('mirror', 'Mirror', font_converter.mirror),
                ('currency', 'Currency Style', font_converter.currency),
                ('regional_indicator', 'Regional Indicator', font_converter.regional_indicator)
            ]
            
            for method_name, display_name, method in font_methods:
                try:
                    converted_text = method(input_text)
                    if converted_text and converted_text != input_text:
                        converted_fonts[method_name] = {
                            'name': display_name,
                            'text': converted_text
                        }
                except Exception as e:
                    logger.error(f"Error converting with {method_name}: {e}")
                    continue
    
    return render_template('index.html', 
                         input_text=input_text, 
                         converted_fonts=converted_fonts)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
