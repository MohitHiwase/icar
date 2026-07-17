const fs = require('fs');
const path = require('path');

const screens = [
  { name: "", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3YzdiZmJmYWIwMmE5OTUwNDc2M2FmMmY4EgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "datasets", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3ZDIzOTVlNmUwMWE2MzFkMWMwM2I1NTQ2EgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "settings", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3ZGIwY2I0NWYwNzA5MmIzOGFjMTY5MzAzEgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "analysis-studio", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3YzdmZjA1YWQwMmQzYzRhYzk1MDZkNjM0EgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "map", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3Y2Y5NjkwNzEwMDMwMTFmOWExMGUwMjhiEgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "reports", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3ZDdjMTYyNDkwMzRhNGUyMDA4MDA3NzllEgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "data-sources", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3YzdkNTFkMzUwMWE2MmRhZjNhMTc0ZDliEgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" },
  { name: "analytics", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NmM3YzdmMDBmMTIwNjM5NDZjNjJjMTQxNGJlEgsSBxDYnaPEhhAYAZIBIwoKcHJvamVjdF9pZBIVQhM0ODkwMjAxNjYzNDMyNzk1OTI4&filename=&opi=89354086" }
];

function convertHtmlToJsx(html) {
  let jsx = html;
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const styles = p1.split(';').filter(s => s.trim().length > 0);
    const styleObj = styles.reduce((acc, current) => {
      let [key, ...values] = current.split(':');
      let value = values.join(':');
      if(key && value) {
        key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc.push(`${key}: \`${value.trim()}\``);
      }
      return acc;
    }, []);
    return `style={{ ${styleObj.join(', ')} }}`;
  });
  // Self closing tags (img, input, hr, br)
  jsx = jsx.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
  jsx = jsx.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  jsx = jsx.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
  
  // React standard attributes for SVGs
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  
  return jsx;
}

async function processScreens() {
  for (const screen of screens) {
    try {
      console.log(`Fetching ${screen.name || 'dashboard'}...`);
      const response = await fetch(screen.url);
      const text = await response.text();
      
      const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<script>/);
      let bodyContent = '';
      if (bodyMatch && bodyMatch[1]) {
        bodyContent = bodyMatch[1];
      } else {
         const fallback = text.match(/<body[^>]*>([\s\S]*?)<\/body>/);
         if(fallback) bodyContent = fallback[1];
      }
      
      const jsxContent = convertHtmlToJsx(bodyContent);
      
      const pageCode = `export default function Page() {\n  return (\n    <div className="min-h-screen bg-[#F8F9FA] text-on-surface font-body-md overflow-x-hidden flex w-full">\n      <div dangerouslySetInnerHTML={{ __html: \`\n        <style>\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n            display: inline-block;\n            vertical-align: middle;\n        }\n        .custom-scrollbar::-webkit-scrollbar {\n            width: 4px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-track {\n            background: transparent;\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb {\n            background: #bdc9c4;\n            border-radius: 10px;\n        }\n        .elevation-1 {\n            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);\n        }\n        </style>\n      \` }} />\n      ${jsxContent}\n    </div>\n  );\n}\n`;

      const dir = path.join(__dirname, 'src', 'app', screen.name);
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, 'page.tsx'), pageCode);
      console.log(`Saved ${screen.name || 'dashboard'}`);
    } catch (e) {
      console.error(e);
    }
  }
}

processScreens();
