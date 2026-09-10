# nounounimo

Site compagnon d'un jeu de piste : on y entre le code à 8 chiffres trouvé sur le
parcours, et le site révèle où chercher la suite. Application front, sans
backend.

## Démarrer

```sh
make install
make start
```

L'application tourne sur http://localhost:8888.

## Poser le secret

```sh
make seal
```

Le script demande le code et le message de récompense, puis écrit le bloc
chiffré dans `src/sealed.ts`. Le texte en clair n'est jamais écrit sur le
disque. Voir [AGENTS.md](AGENTS.md) pour le détail du mécanisme.

## Commandes

`make` seul liste toutes les cibles disponibles. Les principales :

| Commande | Effet |
|---|---|
| `make start` | Serveur de dev |
| `make seal` | Scelle le code et le message |
| `make build` | Build de production |
| `make test` | Tests |
| `make fix` | Format + lint |
| `make check` | build + lint + typecheck + knip + tests |

La documentation de développement est dans [AGENTS.md](AGENTS.md).

## Licence

MIT
