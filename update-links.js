const fs = require('fs');
const path = require('path');

const fileList = [];
function walk(dir) {
    fs.readdirSync(dir, {withFileTypes: true}).forEach(f => {
        const p = path.join(dir, f.name);
        if(f.isDirectory()) walk(p);
        else if (f.name === 'page.tsx') fileList.push(p);
    });
}
walk('src/app');

// Maps text content to URL route
const routeMap = {
    'Dashboard': '/',
    'GIS Map': '/map',
    'Datasets': '/datasets',
    'Analysis Studio': '/analysis-studio',
    'Data Sources': '/data-sources',
    'Analytics': '/analytics',
    'Reports': '/reports',
    'Settings': '/settings'
};

fileList.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace regular `<a href="#">` with `href="route"` based on the contained text
    // The structure typically spans multiple lines. We'll use a regex that matches 
    // <a ... href="#" ...> (any content) <span>TEXT</span> (any content) </a>
    // Since Next.js `<Link>` provides better client-side transitions, we will replace `<a>` with `<Link>`
    
    // First ensure Next Link is imported
    if (!content.includes("import Link from 'next/link';")) {
        content = "import Link from 'next/link';\n" + content;
    }

    for (const [name, route] of Object.entries(routeMap)) {
        // Regex to find <a> with href="#" that contains the specific text label
        const r = new RegExp(`(<a[^>]*href=)"#"([^>]*>([\\s\\S]*?)${name}([\\s\\S]*?)<\/a>)`, 'g');
        content = content.replace(r, `$1"${route}"$2`);
    }

    // Now convert <a href="/something"> ... </a> to <Link href="/something"> ... </Link> if it's within the sidebar nav
    // We can just convert all <a href="/ to <Link href="/
    content = content.replace(/<a([^>]*)href="(\/[^"]*)"([^>]*)>/g, '<Link$1href="$2"$3>');
    content = content.replace(/<\/a>/g, '</Link>');

    fs.writeFileSync(file, content);
    console.log(`Updated routing in ${file}`);
});
