import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { StudioGeneration } from '../types/studio';

/**
 * Export a studio generation as a ZIP file containing:
 * - script.txt: Voiceover script
 * - subtitles.srt: SRT subtitle file
 * - storyboard.md: Markdown formatted storyboard
 * - meta.json: All metadata
 */
export async function exportGenerationAsZip(generation: StudioGeneration): Promise<void> {
  const zip = new JSZip();
  const { output, input } = generation;

  // 1. script.txt
  const scriptContent = `${output.title}\n${'='.repeat(output.title.length)}\n\n${output.voiceover_script}\n\nCTA: ${output.cta}`;
  zip.file('script.txt', scriptContent);

  // 2. subtitles.srt
  zip.file('subtitles.srt', output.subtitle_srt);

  // 3. storyboard.md
  const storyboardMd = generateStoryboardMarkdown(generation);
  zip.file('storyboard.md', storyboardMd);

  // 4. meta.json
  const meta = {
    id: generation.id,
    created_at: generation.created_at,
    input: input,
    output: {
      title: output.title,
      cta: output.cta,
      duration: output.storyboard.reduce((sum, s) => sum + (s.t_end - s.t_start), 0)
    }
  };
  zip.file('meta.json', JSON.stringify(meta, null, 2));

  // Generate ZIP and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const fileName = `finops-studio-${sanitizeFileName(output.title)}-${generation.id.slice(0, 8)}.zip`;
  saveAs(blob, fileName);
}

function generateStoryboardMarkdown(generation: StudioGeneration): string {
  const { output } = generation;
  
  let md = `# ${output.title}\n\n`;
  md += `**CTA:** ${output.cta}\n\n`;
  md += `---\n\n`;
  md += `## 🎬 Storyboard\n\n`;
  
  output.storyboard.forEach((scene, index) => {
    const duration = scene.t_end - scene.t_start;
    md += `### Scene ${index + 1} (${scene.t_start}s - ${scene.t_end}s, ${duration}s)\n\n`;
    md += `**On-Screen Text:**\n> ${scene.on_screen_text}\n\n`;
    md += `**B-Roll/Visual:**\n> ${scene.broll_suggestion}\n\n`;
    md += `---\n\n`;
  });

  md += `## 📝 Full Script\n\n`;
  md += `${output.voiceover_script}\n\n`;
  
  md += `## 💬 Subtitles (SRT)\n\n`;
  md += `\`\`\`srt\n${output.subtitle_srt}\n\`\`\`\n`;

  return md;
}

function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9ğüşıöçĞÜŞİÖÇ\s-]/gi, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}


