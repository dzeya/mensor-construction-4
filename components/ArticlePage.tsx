import React, { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, BookOpen, Tag } from 'lucide-react';
import { Article } from '../articles';

type ArticlePageProps = {
  article: Article;
  onBack: () => void;
};

const ArticleFigure = ({ src, caption, priority = false }: { src: string; caption: string; priority?: boolean }) => (
  <figure className="article-figure">
    <div className="article-figure__frame">
      <img
        src={src}
        alt={caption}
        loading={priority ? 'eager' : 'lazy'}
        className="article-figure__img"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    </div>
    <figcaption className="article-figure__caption">{caption}</figcaption>
  </figure>
);

const markdownComponents = {
  h1: (props: any) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 leading-tight border-l-4 border-mensor-accent pl-3">{props.children}</h2>,
  h2: (props: any) => <h3 className="text-xl font-bold text-white mt-6 mb-3 leading-tight">{props.children}</h3>,
  p: (props: any) => <p className="text-base sm:text-lg text-mensor-light/85 leading-relaxed mb-5">{props.children}</p>,
  strong: (props: any) => <strong className="text-white">{props.children}</strong>,
  ol: (props: any) => <ol className="list-decimal list-inside space-y-3 text-mensor-light/85 mb-6 pl-1">{props.children}</ol>,
  ul: (props: any) => <ul className="list-disc list-inside space-y-3 text-mensor-light/85 mb-6 pl-1">{props.children}</ul>,
  li: (props: any) => <li className="leading-relaxed">{props.children}</li>,
  hr: () => <div className="my-8 h-px w-full bg-white/10" />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-mensor-accent/70 bg-white/5 text-mensor-light/90 italic px-4 py-3 my-6">
      {props.children}
    </blockquote>
  ),
};

const headingInsertions: Record<string, string[]> = {
  geodeziya: [
    'Почему стоит доверить это компании «Менсор»?',
    'Частые вопросы (FAQ)',
  ],
  toposemka: [
    'Три фактора, влияющих на цену',
    'Что вы получаете на выходе?',
    'Какие документы нужны для заказа?',
    'Почему выгодно заказать топосъемку в «Менсор»',
    'Частые вопросы (FAQ)',
  ],
  'bim-3d': [
    'Проблема плоских чертежей (2D)',
    'Решение: Scan-to-BIM от «Менсор»',
    'Почему это окупается:',
    'Кейс: реконструкция производства',
    'Почему «Менсор»?',
    'Частые вопросы (FAQ)',
  ],
  'vynos-granits': [
    'Что это такое?',
    'Когда это обязательно нужно делать?',
    'Как «Менсор» защищает ваши интересы',
    'Главный документ — акт восстановления',
    'Частые вопросы (FAQ)',
  ],
};

const formatContent = (slug: string, content: string) => {
  const headings = headingInsertions[slug] || [];
  let formatted = content;
  headings.forEach((line) => {
    const escaped = line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\n)${escaped}\\s*\\n`, 'g');
    formatted = formatted.replace(regex, `\n## ${line}\n\n`);
  });
  return formatted;
};

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [article.slug]);

  const [leadParagraph, bodyContent] = useMemo(() => {
    const blocks = article.content.split(/\n\n+/);
    const lead = blocks[0] || '';
    const rest = blocks.slice(1).join('\n\n');
    return [lead, formatContent(article.slug, rest)];
  }, [article.content, article.slug]);

  const [bodyHead, bodyTail] = useMemo(() => {
    const chunks = bodyContent.split(/\n\n+/);
    const splitIndex = Math.max(2, Math.floor(chunks.length / 2));
    return [
      chunks.slice(0, splitIndex).join('\n\n'),
      chunks.slice(splitIndex).join('\n\n'),
    ];
  }, [bodyContent]);

  return (
    <main className="pt-28 md:pt-32 pb-20 bg-mensor-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-mensor-light hover:text-white transition-colors font-mono uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={18} className="text-mensor-accent" />
          Назад к базе знаний
        </button>

        <div className="article-hero mt-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-mensor-light uppercase tracking-[0.2em]">
            <span className="text-mensor-accent">Статья {article.order}</span>
            <span className="w-10 h-[1px] bg-mensor-accent/30" />
            <span className="text-mensor-light/70">{article.focus}</span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.8fr)] gap-8 lg:gap-10 items-start">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">{article.title}</h1>
              <p className="text-lg text-mensor-light/80 leading-relaxed">
                {article.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <div className="pill">
                  <Clock size={16} className="text-mensor-accent" />
                  {article.readingTime}
                </div>
                <div className="pill">
                  <BookOpen size={16} className="text-mensor-accent" />
                  {article.focus}
                </div>
              </div>
              <div className="lead-card">
                <div className="lead-label">Вступление</div>
                <div className="article-lead">
                  {leadParagraph}
                </div>
              </div>
            </div>

            <div className="side-card lg:sticky lg:top-28">
              <h3 className="text-sm font-mono tracking-[0.18em] text-mensor-accent uppercase mb-4">Ключевые пометки</h3>
              <ul className="space-y-3 text-sm text-mensor-light/80">
                {article.meta.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <Tag size={16} className="text-mensor-accent mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <section className="relative z-10 mt-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="glass-panel border border-white/5 bg-black/60 p-6 sm:p-8 md:p-10 article-body">
            <div className="reading-column">
              {!!article.images?.[0] && (
                <ArticleFigure src={article.images[0].src} caption={article.images[0].caption} priority />
              )}
              <ReactMarkdown components={markdownComponents}>
                {bodyHead}
              </ReactMarkdown>
              {!!article.images?.[1] && (
                <ArticleFigure src={article.images[1].src} caption={article.images[1].caption} />
              )}
              <ReactMarkdown components={markdownComponents}>
                {bodyTail}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
