<script lang="ts">
  export let content: string = '';

  type Block =
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'p'; text: string };

  function stripUnsafeHtml(raw: string): string {
    return raw
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/javascript:/gi, '');
  }

  function looksLikeHtml(text: string): boolean {
    return /<\/?(p|h1|h2|h3|h4|ul|ol|li|br|strong|em|a|blockquote|div|section)\b/i.test(text);
  }

  function parseMarkdownBlocks(raw: string): Block[] {
    const lines = raw.replace(/\r\n/g, '\n').split('\n');
    const blocks: Block[] = [];
    let listBuffer: string[] = [];
    let paraBuffer: string[] = [];

    const flushPara = () => {
      if (paraBuffer.length > 0) {
        blocks.push({ type: 'p', text: paraBuffer.join(' ').trim() });
        paraBuffer = [];
      }
    };

    const flushList = () => {
      if (listBuffer.length > 0) {
        blocks.push({ type: 'ul', items: [...listBuffer] });
        listBuffer = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushPara();
        flushList();
        continue;
      }

      if (trimmed.startsWith('### ')) {
        flushPara();
        flushList();
        blocks.push({ type: 'h3', text: trimmed.slice(4).trim() });
      } else if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
        flushPara();
        flushList();
        blocks.push({ type: 'h2', text: trimmed.replace(/^#+\s+/, '').trim() });
      } else if (/^[-*•]\s+/.test(trimmed)) {
        flushPara();
        listBuffer.push(trimmed.replace(/^[-*•]\s+/, '').trim());
      } else {
        flushList();
        paraBuffer.push(trimmed);
      }
    }

    flushPara();
    flushList();
    return blocks;
  }

  $: isHtml = looksLikeHtml(content);
  $: blocks = isHtml ? [] : parseMarkdownBlocks(content);
</script>

{#if isHtml}
  <div class="axelo-prose space-y-5 text-sm sm:text-base text-axelo-graphite leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-axelo-dark [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-axelo-dark [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_a]:text-axelo-blue [&_a]:underline">
    {@html stripUnsafeHtml(content)}
  </div>
{:else}
  <div class="space-y-5">
    {#each blocks as block}
      {#if block.type === 'h2'}
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-axelo-dark pt-4">
          {block.text}
        </h2>
      {:else if block.type === 'h3'}
        <h3 class="text-base sm:text-lg font-semibold tracking-tight text-axelo-dark pt-2">
          {block.text}
        </h3>
      {:else if block.type === 'ul'}
        <ul class="space-y-2 pl-5 list-disc text-sm sm:text-base text-axelo-graphite leading-relaxed">
          {#each block.items as item}
            <li>{item}</li>
          {/each}
        </ul>
      {:else}
        <p class="text-sm sm:text-base text-axelo-graphite leading-relaxed">
          {block.text}
        </p>
      {/if}
    {/each}
  </div>
{/if}
