# Formation Fortran 95 — Du Débutant à l'Expert en Calcul Scientifique

Formation complète et progressive en programmation Fortran 95, conçue pour vous emmener du niveau débutant jusqu'à l'expert en calcul scientifique, avec une approche **projets progressifs**.

## Structure

La formation est découpée en **4 parties** et **27 modules**. Chaque module contient :
- `cours/` — cours en Markdown
- `exercices/` — fichiers Fortran à compléter

---

## Partie 1 : Les Fondamentaux 🟢

| # | Module | Projet associé |
|---|--------|---------------|
| 01 | Introduction à Fortran 95 | Premier programme — Hello World |
| 02 | Variables, types et opérateurs | Calculateur de base |
| 03 | Opérateurs arithmétiques et logiques | Calculatrice simple |
| 04 | Contrôle de flux | Catégoriseur de valeurs |
| 05 | Boucles | Tables de multiplication |
| 06 | Tableaux | Statistiques sur tableau |
| 07 | Fonctions et subroutines | Factorielle et combinaisons |
| 08 | Entrées/Sorties | Formulaire de saisie |
| 09 | Fichiers | Journal de bord |
| 10 | Modules | Bibliothèque mathématique |

## Partie 2 : Intermédiaire 🟡

| # | Module | Projet associé |
|---|--------|---------------|
| 11 | Interfaces | Dispatch de procédures |
| 12 | Allocation dynamique | Tableau dynamique |
| 13 | Types dérivés | Gestionnaire de points 2D |
| 14 | Surcharge d'opérateurs | Algèbre de vecteurs |
| 15 | Pointeurs | Liste chaînée simple |
| 16 | Bibliothèque intrinsèque | Analyse statistique |
| 17 | Tableaux avancés | Traitement d'images |
| 18 | Récursivité | Fibonacci et tours de Hanoï |
| 19 | Interfaçage avec C | Bibliothèque mixte C/Fortran |
| 20 | Fortran 95 vs anciens standards | Migration de code F77 |

## Partie 3 : Avancé 🟠

| # | Module | Projet associé |
|---|--------|---------------|
| 21 | Bonnes pratiques | Audit et refactoring de code |
| 22 | Calcul numérique | Solveur d'équations |
| 23 | OpenMP | Parallélisation de boucles |
| 24 | BLAS / LAPACK | Multiplications matricielles |
| 25 | Calcul scientifique | Intégration numérique |
| 26 | Tests et débogage | Suite de tests unitaires |
| 27 | Projet final | Calculatrice matricielle complète |

---

## Installation du compilateur

Avant de commencer, installez **gfortran** (compilateur GNU Fortran) :

- **Windows** : [TDM-GCC](https://jmeubank.github.io/tdm-gcc/) ou [MinGW-w64](https://www.mingw-w64.org/)
- **macOS** : `brew install gcc`
- **Linux** : `sudo apt install gfortran` (Ubuntu/Debian) ou `sudo dnf install gcc-gfortran` (Fedora/RHEL)

Vérifiez l'installation : `gfortran --version`

## Comment utiliser cette formation

1. **Suivez l'ordre** — Chaque module construit sur le précédent
2. **Lisez le cours** dans le dossier `cours/`
3. **Faites les exercices** dans le dossier `exercices/`
4. **Compilez et exécutez** avec `gfortran -Wall -std=f95 -o prog source.f95`
5. **Passez au module suivant**

## Progression recommandée

- **Partie 1** (modules 01-10) : ~2-3 semaines
- **Partie 2** (modules 11-20) : ~3-4 semaines
- **Partie 3** (modules 21-27) : ~3-4 semaines

## Site web interactif

Un site web interactif est disponible avec suivi de progression, quiz et certificat :
- **URL** : https://formation-fortran.vercel.app
- **Code source** : https://github.com/AMOUZOU-Kodjo/formation-fortran-web

Bon apprentissage ! 🚀
