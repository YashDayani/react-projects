import { marked } from 'marked';
import Prism from 'prismjs';

Prism.manual = true;

const formatGeminiStyle = (text) => {
    marked.setOptions({
        highlight: function (code, lang) {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        },
        langPrefix: 'language-'
    });

    let html = marked(text);

    html = html.replace(/<h2/g, '<h2 class="mb-4 mt-6"')
        .replace(/<h3/g, '<h3 class="mb-3 mt-5"')
        .replace(/<p>/g, '<p class="mb-4">')
        .replace(/<ul>/g, '<ul class="mb-4">')
        .replace(/<li>/g, '<li class="mb-2 ml-4">');

    html = html.replace(/<pre><code class="language-(\w+)">/g, '<pre class="language-$1"><code class="language-$1">');
    html = html.replace(/<pre><code>/g, '<pre class="language-none"><code class="language-none">');

    return html;
};

export default formatGeminiStyle;
