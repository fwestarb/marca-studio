import {cp,mkdir,rm,lstat,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
if(!['folio-studio','marca-studio'].includes(pkg.name))throw new Error('Unexpected project');
const docs=path.resolve(root,'docs');
if(path.dirname(docs)!==path.resolve(root)||path.basename(docs)!=='docs')throw new Error('Invalid deployment path');
await readFile(path.join(root,'dist/index.html'));
try{if((await lstat(docs)).isSymbolicLink())throw new Error('Deployment directory must not be a symlink');}catch(e){if(e.code!=='ENOENT')throw e;}
console.log('Preparing static publication:',docs);
await rm(docs,{recursive:true,force:true});
await mkdir(docs,{recursive:true});
await cp(path.join(root,'dist'),docs,{recursive:true});
await writeFile(path.join(docs,'.nojekyll'),'');
