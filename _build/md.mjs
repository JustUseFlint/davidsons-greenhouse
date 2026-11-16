// Tiny markdown-ish renderer for journal posts. Supports ## / ### headings, paragraphs, - and 1. lists,
// | tables |, > callouts, **bold**, *italic*, [text](href). Internal links start with ~/ and get the page root.
import { esc, slugify } from './shell.mjs';
const inline = (s, root) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, h) => {
    h = h.replace(/&amp;/g, '&');
    if (h.startsWith('~/')) return `<a href="${root}${h.slice(2)}">${t}</a>`;
    return `<a href="${esc(h)}" target="_blank" rel="noopener">${t}</a>`;
  });
export function md(src, root) {
  const lines = src.trim().split('\n'); const out = []; const toc = []; let i = 0;
  const para = []; const flush = () => { if (para.length) { out.push(`<p>${inline(para.join(' '), root)}</p>`); para.length = 0; } };
  while (i < lines.length) {
    const l = lines[i].trimEnd();
    if (!l.trim()) { flush(); i++; continue; }
    let m;
    if ((m = l.match(/^(##|###) (.+)$/))) { flush(); const lvl = m[1].length; const id = slugify(m[2]); if (lvl === 2) toc.push([id, m[2]]); out.push(`<h${lvl} id="${id}">${inline(m[2], root)}</h${lvl}>`); i++; continue; }
    if (/^- /.test(l)) { flush(); const it = []; while (i < lines.length && /^- /.test(lines[i])) { it.push(`<li>${inline(lines[i].slice(2), root)}</li>`); i++; } out.push(`<ul>${it.join('')}</ul>`); continue; }
    if (/^\d+\. /.test(l)) { flush(); const it = []; while (i < lines.length && /^\d+\. /.test(lines[i])) { it.push(`<li>${inline(lines[i].replace(/^\d+\. /, ''), root)}</li>`); i++; } out.push(`<ol>${it.join('')}</ol>`); continue; }
    if (/^\|/.test(l)) { flush(); const rows = []; while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const [h, , ...b] = rows; out.push(`<div class="tbl"><table><thead><tr>${cells(h).map(c => `<th scope="col">${inline(c, root)}</th>`).join('')}</tr></thead><tbody>${b.map(r => `<tr>${cells(r).map((c, j) => j ? `<td>${inline(c, root)}</td>` : `<th scope="row">${inline(c, root)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`); continue; }
    if (/^> /.test(l)) { flush(); const q = []; while (i < lines.length && /^> /.test(lines[i])) { q.push(lines[i].slice(2)); i++; } out.push(`<aside class="note"><p>${inline(q.join(' '), root)}</p></aside>`); continue; }
    para.push(l.trim()); i++;
  }
  flush();
  return { html: out.join('\n'), toc };
}
export const words = s => s.replace(/[#>*|\-\[\]()~]/g, ' ').split(/\s+/).filter(Boolean).length;
