# nounounimo

> Le concept reste à écrire : remplacer ce paragraphe par ce que fait
> l'application, pour qui, et ce qui la rend particulière.

Application **100% front-end**, sans backend. Interface en **français**.

---

## Stack technique

| Outil | Usage |
|---|---|
| React 19 + TypeScript | UI |
| react-router 7 (mode data, SPA) | Routage client |
| Vite | Build / dev server (port **1313**) |
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
├── pages/                    # Un composant par route
│   ├── Home.tsx              # Route /
│   ├── About.tsx             # Route /a-propos
│   └── NotFound.tsx          # Route * (404)
├── App.tsx                   # Layout commun : nav + <Outlet />
├── routes.ts                 # Table de routes, partagée par l'app et les tests
├── main.tsx                  # Point d'entrée (createBrowserRouter)
└── index.css                 # Import Tailwind + reset minimal
public/
└── favicon.svg               # Favicon
tests/
├── setup.ts                  # Setup Testing Library (jest-dom)
├── unit/                     # Vitest - logique pure
└── component/                # Vitest + Testing Library
```

---

## Routage

Les routes vivent dans `src/routes.ts` sous forme de `RouteObject[]`, sans JSX.
`src/main.tsx` les monte avec `createBrowserRouter`, les tests avec
`createMemoryRouter` : la même table est vérifiée des deux côtés.

Ajouter une route = un composant dans `src/pages/`, une entrée dans
`src/routes.ts`, un lien dans la nav de `src/App.tsx` si elle doit y figurer.

L'application est une SPA servie depuis la racine : tout hébergement doit
renvoyer `index.html` sur les URLs inconnues (fallback SPA), sinon un accès
direct à `/a-propos` renvoie un 404 serveur.

---

## Règles de développement

### Structure
- `src/lib/` : logique pure, zéro import React.
- `src/pages/` : un composant par route, l'état partagé remonte dans le layout.
- **Taille des fichiers** : viser < ~300 lignes ; au-delà, découper.

### Qualité du code
- **Factoriser, ne pas dupliquer** : extraire les helpers réutilisables.
- **Pas de code mort** : tout export doit être utilisé ou testé. `make knip`
  doit rester vert.
- **Commentaires utiles seulement** : expliquer le pourquoi / le non-évident ;
  ne jamais paraphraser le code.

### Tests
- **Logique pure entièrement testée** (`src/lib/`).
- **Tests de composants** sur les interactions clés via Testing Library, y
  compris la navigation.

### Accessibilité
- Tout cliquable est un bouton/lien avec libellé accessible ; champs avec label
  ou `aria-label` ; focus clavier visible ; ne jamais coder l'information par la
  seule couleur.

### Qualité (avant de considérer une tâche terminée)
- `make check` doit passer (build + lint + typecheck + knip + tests).

---

## Commandes (Makefile)

| Commande | Effet |
|---|---|
| `make install` | Installe les dépendances |
| `make start` | Serveur de dev (http://localhost:1313) |
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
