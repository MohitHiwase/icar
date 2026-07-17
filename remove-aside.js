const fs = require('fs');
const path = require('path');

function walk(dir) {
    let files = [];
    fs.readdirSync(dir, {withFileTypes: true}).forEach(f => {
        const p = path.join(dir, f.name);
        if(f.isDirectory()) files.push(...walk(p));
        else if (f.name === 'page.tsx') files.push(p);
    });
    return files;
}

try {
    fs.renameSync(path.join('src', 'app', 'map'), path.join('src', 'app', 'gis-map'));
    console.log("Renamed map to gis-map");
} catch(e) {
    console.log("map directory not found or already renamed");
}

const fileList = walk('src/app');

fileList.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\{\/\*.*?Sidebar.*?\*\/\}\s*<aside[\s\S]*?<\/aside>/i, '');
    content = content.replace(/<aside[\s\S]*?<\/aside>/i, '');
    fs.writeFileSync(file, content);
    console.log('Removed aside from', file);
});
