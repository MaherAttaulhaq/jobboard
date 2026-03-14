const fs = require('fs');
let jsx = fs.readFileSync('temp.jsx', 'utf8');

jsx = jsx.replace(/<button className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition-all">/g, 
  '<Button className="px-8 py-4 rounded-lg font-bold transition-all" size="lg">');
jsx = jsx.replace(/<\/button>/g, '</Button>');
jsx = jsx.replace(/<button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">/g, 
  '<Button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors" size="lg">');
jsx = jsx.replace(/<button className="bg-primary px-6 py-3 rounded-r-md font-bold hover:bg-indigo-700 transition-colors">/g, 
  '<Button className="px-6 py-3 rounded-r-md font-bold transition-colors rounded-l-none">');

// Let's change input elements:
jsx = jsx.replace(/<input className="w-full border-none focus:ring-0 text-slate-700" placeholder="Job title or keyword" type="text"\/>/g,
  '<Input className="w-full border-none focus-visible:ring-0 text-slate-700 shadow-none" placeholder="Job title or keyword" type="text" />');

jsx = jsx.replace(/<input className="bg-white text-slate-900 border-none rounded-l-md w-full px-4 py-3 focus:ring-0" placeholder="Email Address" type="email"\/>/g,
  '<Input className="bg-white text-slate-900 border-none rounded-none rounded-l-md w-full px-4 py-3 focus-visible:ring-0 shadow-none" placeholder="Email Address" type="email" />');

// Instead of Shadcn Select which is complex, we'll keep the standard select but maybe style it a bit or just leave it.

// Clean up standard empty class attrs from the html
// and Build page.tsx with imports
const defaultImports = `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 font-sans">`;

const footer = `    </div>
  );
}`;

fs.writeFileSync('app/page.tsx', defaultImports + '\n' + jsx + '\n' + footer);
