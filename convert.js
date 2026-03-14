const fs = require('fs');
let html = fs.readFileSync('index/joboard_backup.html', 'utf8');

// replace class= with className=
html = html.replace(/class=/g, 'className=');

// replace HTML attributes with JSX camelCase equivalents
const reactAttributes = {
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'viewbox': 'viewBox',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'charset': 'charSet',
    'for': 'htmlFor',
};

for (const [key, value] of Object.entries(reactAttributes)) {
    const regex = new RegExp(key + '=', 'g');
    html = html.replace(regex, value + '=');
}

// remove all HTML comments to avoid issues
html = html.replace(/<!--[\s\S]*?-->/g, '');

// fix <br> and <hr>
html = html.replace(/<br\s*>/gi, '<br />');
html = html.replace(/<hr\s*>/gi, '<hr />');

// extract body contents
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
    let bodyContent = bodyMatch[1];
    fs.writeFileSync('temp.jsx', bodyContent);
} else {
    console.log('No body found');
}
