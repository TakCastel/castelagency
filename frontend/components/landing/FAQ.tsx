import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    q: "Quels types de projets prenez-vous en charge ?",
    a: "Je couvre l’essentiel du web : création et refonte de sites vitrines, e‑commerce, applications et outils sur mesure (portails, dashboards, outils internes). J’assure aussi l’UX/UI, le branding, les contenus (copy, médias) et le SEO. En complément, j’accompagne sur les process IA : prompting, automatisations (n8n), agents et chatbots. Du site simple au projet sur mesure, tout est possible — l’important est de bien cadrer le périmètre ensemble."
  },
  {
    q: "Où êtes-vous situé et travaillez-vous à distance ?",
    a: "Le studio est basé à Avignon (Vaucluse), en Provence-Alpes-Côte d’Azur. Je travaille en local pour les clients de la région (Avignon, Vaucluse, PACA) et à distance partout en France. Les échanges se font en visio ou sur site selon votre préférence. Pour le cadrage, les validations et la formation, je m’adapte à votre façon de travailler."
  },
  {
    q: "Combien de temps faut-il pour lancer un site ?",
    a: "Cela dépend du périmètre. Un site vitrine bien cadré peut être livré en quelques jours. Un e‑commerce ou une application sur mesure demandent plus de temps (plusieurs semaines à quelques mois). Le cadrage initial permet de fixer un planning réaliste et des jalons de livraison. Chaque étape est validée avec vous pour avancer sans surprise et livrer dans les délais convenus."
  },
  {
    q: "Comment se passe la première prise de contact et le devis ?",
    a: "Vous pouvez me contacter via la page Contact ou demander un devis via la page Devis. La première heure d’échange est gratuite : on discute de votre projet, de vos objectifs et de votre cible. Ensuite, je vous envoie une proposition (devis et planning) adaptée à votre besoin. Aucune obligation : vous validez uniquement si la proposition vous convient."
  },
  {
    q: "Qu’est-ce que le cadrage et pourquoi c’est important ?",
    a: "Le cadrage, c’est la phase en amont du design et du développement : on définit ensemble les objectifs du projet, la cible, les messages clés, l’arborescence du site et la stratégie SEO. J’en tire un document de cadrage et un plan de contenu que vous validez. Tout le monde part sur la même base, ce qui limite les allers-retours et permet de livrer à l’heure et dans le scope. C’est la base d’un projet réussi."
  },
  {
    q: "Faites-vous du SEO, y compris du SEO local à Avignon ?",
    a: "Oui. Je m’occupe du SEO technique (structure, performance, indexation), du contenu (mots-clés, maillage interne), des analytics et du suivi. Pour les entreprises implantées à Avignon et en Vaucluse, je propose aussi un accompagnement SEO local (référencement local, Google Business Profile, cohérence des mentions d’adresse). L’objectif est une visibilité durable en recherche organique, avec des indicateurs suivis dans le temps."
  },
  {
    q: "Proposez-vous une maintenance et des évolutions après la mise en ligne ?",
    a: "Oui. Une fois le site en ligne, je reste disponible pour la maintenance (mises à jour, corrections), les évolutions (nouveaux blocs, fonctionnalités) et l’amélioration continue (SEO, conversion, A/B tests). On peut mettre en place un forfait heures, des interventions ponctuelles ou un accompagnement continu selon vos besoins. Je peux aussi vous former à la mise à jour du site pour que vous soyez autonomes sur le quotidien."
  },
  {
    q: "Quelles technologies utilisez-vous pour les sites ?",
    a: "J’adapte la stack au projet : sites vitrines et blogs avec WordPress, Nuxt ou Next.js selon les besoins (performance, éditorial, référencement). Pour le contenu, j’utilise des CMS comme Directus ou Decap CMS quand c’est pertinent. E‑commerce et applications sur mesure sont développés avec les technologies les plus adaptées (Shopify, Prestashop ou WooCommerce). L’objectif est toujours un site rapide, accessible et facile à faire évoluer."
  },
  {
    q: "Peut-on voir des exemples de réalisations ?",
    a: "Oui. La section Mes projets présente une sélection de réalisations (sites vitrines, e‑commerce, refontes, applications). Vous y verrez le type de livrables et l’approche. Pour un projet proche du vôtre, on peut en discuter lors du premier échange et, si besoin, regarder ensemble des cas concrets en visio."
  },
  {
    q: "Proposez-vous un accompagnement sur l’IA et les automatisations ?",
    a: "Oui. En plus du web classique, j’accompagne sur les process IA : bonnes pratiques de prompting, mise en place d’outils et de workflows (n8n ou équivalents), conception d’agents ou de chatbots, et systèmes automatisés (modération, tri de contenu, routage). L’idée est d’intégrer l’IA dans votre façon de travailler en respectant vos workflows existants."
  },
  {
    q: "Comment se déroule un projet du début à la fin ?",
    a: "En trois temps : (1) Cadrage — on définit objectifs, cible, arborescence et plan de contenu/SEO ; vous validez ce socle. (2) Conception et développement — wireframes, maquettes, puis développement ; livraisons par jalons avec des points de validation. (3) Mise en ligne et accompagnement — déploiement, formation si besoin, puis maintenance et évolutions selon vos besoins. Chaque étape est clairement définie et validée avec vous."
  }
];

export function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a
      }
    }))
  };

  return (
    <section id="faq" className="container py-16 md:py-20">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-small font-medium text-muted-foreground">FAQ</p>
        <h2 className="mt-2 text-balance text-titre-moyen font-semibold tracking-tight">
          Questions fréquentes
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>Je réponds avant de builder</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {items.map((it) => (
                <AccordionItem key={it.q} value={it.q}>
                  <AccordionTrigger>{it.q}</AccordionTrigger>
                  <AccordionContent>{it.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

