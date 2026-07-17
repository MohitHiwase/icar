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

const fileList = walk('src/app');

fileList.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix mismatched <a ...> ... </Link> -> <a ...> ... </a>
    content = content.replace(/<a([^>]*)>([\s\S]*?)<\/Link>/g, '<a$1>$2</a>');
    
    // Fix invalid style settings: `&quot` -> ""
    content = content.replace(/`\&quot`/g, "'\"'");
    content = content.replace(/`\&quot(.*?)`/g, `'"$1"'`);
    
    fs.writeFileSync(file, content);
    console.log('Fixed syntax in', file);
});
