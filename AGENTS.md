# nounounimo

Petit site compagnon d'un **jeu de piste physique**. Le joueur suit un parcours
dans le monde réel, en tire un **code à 8 chiffres**, le saisit ici, et le site
lui révèle où trouver la suite. Des post-it numérotés font partie du dispositif
physique : une page les liste dans l'ordre pour pouvoir les remettre en place.

Application **100% front-end**, sans backend. Interface en **français**.

---

## Stack technique

| Outil | Usage |
|---|---|
| React 19 + TypeScript | UI |
| react-router 7 (mode data, `createHashRouter`) | Routage client en `#/...` |
| Web Crypto (natif) | Déchiffrement du message de récompense |
| Vite | Build / dev server (port **8888**) |
| Tailwind CSS v4 | Styles (via `@tailwindcss/vite`, pas de config JS) |
| Vitest + Testing Library | Tests unitaires et composants |
| Prettier | Formatage |
| ESLint (typescript-eslint) | Linting |
| Knip | Détection des fichiers / exports / dépendances inutilisés |

---

## Arborescence

```
src/
├── lib/                      # Logique pure, zéro React (entièrement testée)
│   ├── secret.ts             # unseal : PBKDF2 + AES-GCM, validation du code
│   ├── richText.ts           # parseEmphasis : le **gras** porté par le message
│   ├── schedule.ts           # OPENS_AT : l'heure d'ouverture du jeu
│   ├── postits.ts            # Étiquettes AA..DB, tuile DEPART, inclinaison
│   └── celebration.ts        # Positions des confettis et des ballons
├── components/
│   ├── Logo.tsx              # Chat et lapin dos à dos (même dessin que le favicon)
│   ├── BrandLink.tsx         # Logo + nom, retour à l'accueil
│   ├── Card.tsx              # Encart crème commun à toutes les pages
│   ├── Celebration.tsx       # Décor de victoire : ballons en fond, confettis
│   ├── CodeForm.tsx          # Champ de code + Valider, partagé accueil / échec
│   └── PostitNote.tsx        # Renvoi vers #/init, partagé accueil / échec
├── pages/
│   ├── Home.tsx              # Route #/
│   ├── Result.tsx            # Route #/{code} : vérification, succès ou échec
│   └── Init.tsx              # Route #/init : grille 9x9 de post-it
├── App.tsx                   # Layout : fond crème + <Outlet />
├── routes.ts                 # Table de routes, partagée par l'app et les tests
├── sealed.ts                 # GÉNÉRÉ par make seal, ne pas éditer à la main
├── main.tsx                  # Point d'entrée (createHashRouter)
└── index.css                 # Tailwind + thème (couleurs, typo, rayons)
public/
└── favicon.svg               # Le logo, en version autonome
scripts/
└── seal.mjs                  # Scelle le couple (code, message) dans src/sealed.ts
tests/
├── setup.ts                  # jest-dom + polyfill Web Crypto pour jsdom
├── fixtures/sealed.ts        # Sceau de test (1000 itérations, code 13579246)
├── unit/                     # Vitest - logique pure
└── component/                # Vitest + Testing Library - les 4 pages
```

---

## Routage

Hash routing (`#/`), donc aucun fallback SPA à configurer côté hébergement, et
`base: './'` dans `vite.config.ts` : le site fonctionne aussi dans un
sous-répertoire.

| Adresse | Page |
|---|---|
| `#/` | Accueil : logo, titre, champ de code (voir Heure d'ouverture) |
| `#/init` | Grille des post-it |
| `#/{code}` | Résultat : succès si le code ouvre le sceau, échec sinon |

La route résultat est un splat (`*`) : **toute** adresse inconnue (`#/bonjour`,
`#/a/b`) tombe sur la page d'échec. Il n'y a volontairement pas de page 404
distincte.

Les routes vivent dans `src/routes.ts` sous forme de `RouteObject[]`, sans JSX.
`main.tsx` les monte avec `createHashRouter`, les tests avec `createMemoryRouter`:
la même table est vérifiée des deux côtés.

---

## Heure d'ouverture

`OPENS_AT` dans `src/lib/schedule.ts` fixe l'instant où le jeu démarre, en date
absolue avec décalage horaire (`2026-09-12T18:00:00+02:00`). Avant cette heure,
l'accueil remplace le formulaire par "Il est trop tôt, reviens plus tard".
L'accueil bascule tout seul à l'heure dite, sans rechargement.

C'est une pancarte, pas une serrure : le test tourne sur l'horloge du visiteur,
donc reculer sa montre ou lire le bundle suffit à passer. Les routes `#/init` et
`#/{code}` restent d'ailleurs accessibles avant l'ouverture. Ce qui protège
vraiment la récompense reste le message scellé.

---

## Le secret : message scellé

Le site est purement front : tout ce qu'il sait est servi au navigateur. On ne
peut donc pas rendre le code introuvable, seulement rendre sa découverte plus
coûteuse que faire le parcours.

Le message de récompense est **chiffré avec le code comme clé** (PBKDF2-SHA256,
600 000 itérations, puis AES-GCM 256). Le bundle ne contient qu'un bloc base64.
Le bon code le déchiffre ; un mauvais code fait échouer l'authentification
AES-GCM. Le déchiffrement sert donc à la fois de vérification et de révélation :
il n'y a pas de booléen à retourner dans les devtools, et pas de texte à lire
dans le source.

### Poser le vrai secret

```sh
make seal
```

Le script demande le code et le message, puis écrit `src/sealed.ts`. Le texte en
clair ne touche jamais le disque ni git.

Le message accepte du **gras** avec la syntaxe `**...**`. La mise en forme
voyage donc **dans le chiffré**, jamais dans le code : écrire un fragment de la
récompense en dur dans un composant pour le mettre en valeur reviendrait à
l'afficher à qui lit le source. `parseEmphasis` ne fait que découper ce que
`unseal` a rendu. `src/sealed.ts` est livré avec un
secret de démonstration (code `12345678`) : tant que `make seal` n'a pas été
lancé, le site n'a rien de sérieux à protéger.

### Trois invariants à ne jamais casser

1. **Le message de récompense n'apparaît que comme sortie de `unseal`.** Aucun
   fragment en dur dans un composant, pas même une amorce de phrase.
2. **Aucun média de récompense dans `public/`** (photo du lieu, plan, QR code) :
   un fichier joint au bundle est lisible par tout le monde. Pour ajouter une
   image, il faut la chiffrer aussi.
3. **Ne jamais committer le code ni le message en clair**, y compris dans un
   test, un commentaire ou un message de commit. Les tests utilisent le sceau de
   `tests/fixtures/sealed.ts`, sans rapport avec le vrai.

Ce qui reste possible pour un curieux : lire le source, comprendre le mécanisme
et essayer tous les codes hors ligne. À 8 chiffres et 600 000 itérations, ce
balayage se compte en mois de calcul.

---

## Règles de développement

### Structure
- `src/lib/` : logique pure, zéro import React.
- `src/pages/` : un composant par route ; ce qui se répète descend dans
  `src/components/`.
- **Taille des fichiers** : viser < ~300 lignes ; au-delà, découper.

### Qualité du code
- **Factoriser, ne pas dupliquer** : le formulaire de code est partagé entre
  l'accueil et la page d'échec, l'encart et le lien de marque entre les pages.
- **Pas de code mort** : tout export doit être utilisé ou testé. `make knip`
  doit rester vert.
- **Commentaires utiles seulement** : expliquer le pourquoi / le non-évident ;
  ne jamais paraphraser le code.

### Tests
- **Logique pure entièrement testée** (`src/lib/`).
- **Tests de composants** sur les 4 pages, la navigation, et le fait que le
  message ne fuit pas sur un mauvais code.
- Les tests montent le sceau de `tests/fixtures/sealed.ts` via `vi.mock`, pour
  ne pas payer 600 000 itérations par assertion.

### Accessibilité
- Tout cliquable est un bouton/lien avec libellé accessible ; champs avec label
  ou `aria-label` ; focus clavier visible ; ne jamais coder l'information par la
  seule couleur.
- La page résultat annonce son état via `aria-live` : la vérification prend un
  temps perceptible.

### Style
- Palette chaleureuse définie en tokens Tailwind dans `src/index.css`
  (`cream`, `sand`, `clay`, `terracotta`, `bark`, `postit`).
- La fête de la page de victoire est faite maison, sans dépendance : keyframes
  CSS dans `index.css` (`nnm-bob`, `nnm-fall`, `nnm-pop`), positions calculées
  dans `src/lib/celebration.ts`. Le décor est `aria-hidden`, en `-z-10` sous un
  contenu passé en `z-10`, et il disparaît sous `prefers-reduced-motion`.
- Typographie 100% système (`--font-display` arrondie), aucune requête externe.
- **Mobile d'abord** : tout doit tenir à 375 px de large sans débordement
  horizontal.

### Qualité (avant de considérer une tâche terminée)
- `make check` doit passer (build + lint + typecheck + knip + tests).

---

## Commandes (Makefile)

| Commande | Effet |
|---|---|
| `make install` | Installe les dépendances |
| `make seal` | Scelle le code et le message dans `src/sealed.ts` |
| `make start` | Serveur de dev (http://localhost:8888) |
| `make build` | Build de production |
| `make lint` | ESLint |
| `make knip` | Détecte fichiers / exports / dépendances inutilisés |
| `make format` | Formate avec Prettier |
| `make typecheck` | Vérifie les types |
| `make test` | Tests unitaires et composants |
| `make fix` | Format + lint |
| `make check` | build + lint + typecheck + knip + tests |

---

## Conventions globales du dépôt

- **Code en anglais** : commentaires, identifiants, noms de variables et de
  fonctions. Seules les valeurs affichées à l'utilisateur sont en français.
- **Commits** : pas de trailer `Co-Authored-By`. Auteur = le compte git de
  YavaDeus uniquement. Vaut aussi pour les descriptions de pull request.
- **Typographie** : ne jamais introduire de tiret long (em-dash ou en-dash) dans
  le code, les chaînes, les commentaires ou la doc. Utiliser un tiret ASCII `-`,
  deux-points, parenthèses, ou reformuler.
