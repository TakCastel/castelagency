import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import { Separator } from "@/components/ui/separator";
import {
  getPostBySlug,
  getBlogSlugs,
  type BlogDetail,
  type BlogSectionBody,
} from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: `${post.title} | Blog | Studio Castel`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Studio Castel`,
      description: post.excerpt,
      type: "article",
      locale: "fr_FR",
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleBody({ body }: { body: BlogSectionBody[] }) {
  return (
    <div className="space-y-4">
      {body.map((block, i) =>
        typeof block === "string" ? (
          <p key={i} className="text-muted-foreground text-pretty leading-relaxed">
            {block}
          </p>
        ) : (
          <ul key={i} className="list-disc space-y-2 pl-6 text-muted-foreground text-pretty leading-relaxed">
            {block.list.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

function ArticleSections({ post }: { post: BlogDetail }) {
  return (
    <div className="space-y-16">
      {post.sections.map((section, index) => (
        <AnimatedSection key={section.id} delay={index}>
          <section aria-labelledby={section.id}>
            <h2
              id={section.id}
              className="text-titre-petit font-semibold tracking-tight text-foreground"
            >
              {section.title}
            </h2>
            <div className="mt-4">
              <ArticleBody body={section.body} />
            </div>
          </section>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const firstSection = post.sections[0];
  const remainingSections = post.sections.slice(1);

  return (
    <>
      {/* Hero pleine hauteur, image seule (même style que pages services) */}
      <section
        className="relative -mt-20 w-full overflow-hidden md:-mt-24"
        style={{ minHeight: "100svh" }}
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={post.image ?? "/hero-background.png"}
            alt=""
            fill
            className="object-cover object-center opacity-45 blur-xs shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      </section>

      <main className="relative z-10 -mt-[70vh]">
        <article>
          {/* Carte sur l’image : en-tête + première section (style service) */}
          <div className="container px-4 pb-12 pt-16 sm:px-6">
            <div className="relative mx-auto max-w-2xl rounded-3xl border border-border/80 bg-background/95 px-6 py-8 shadow-xl shadow-black/20 backdrop-blur-sm sm:px-8 sm:py-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-small font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour au blog
              </Link>
              <time
                dateTime={post.date}
                className="mt-4 block text-small font-medium text-muted-foreground"
              >
                {formatDate(post.date)}
              </time>
              <header>
                <h1 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
                  {post.title}
                </h1>
                <p className="mt-6 text-paragraphe text-muted-foreground text-pretty">
                  {post.excerpt}
                </p>
              </header>

              {firstSection && (
                <>
                  <Separator className="my-10" />
                  <section aria-labelledby={firstSection.id}>
                    <h2
                      id={firstSection.id}
                      className="text-titre-petit font-semibold tracking-tight"
                    >
                      {firstSection.title}
                    </h2>
                    <div className="mt-4">
                      <ArticleBody body={firstSection.body} />
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>

          {/* Contenu principal : max-w-5xl comme les services */}
          <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6">
            {remainingSections.length > 0 && (
              <ArticleSections
                post={{ ...post, sections: remainingSections }}
              />
            )}

            <Separator className="my-12" />

            <section
              className="py-12 text-center"
              aria-labelledby="cta-article"
            >
              <h2 id="cta-article" className="sr-only">
                Passer à l’action
              </h2>
              <p className="text-paragraphe font-medium text-foreground">
                Un projet en tête ?
              </p>
              <p className="mt-4 text-muted-foreground text-pretty">
                Parlons de vos objectifs et de la meilleure façon de les réaliser.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link href="/blog">
                    <ArrowLeft className="h-4 w-4" />
                    Tous les articles
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/contact">Me contacter</Link>
                </Button>
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
