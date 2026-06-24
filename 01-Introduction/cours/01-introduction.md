# Introduction à Fortran 95

Fortran (FORMula TRANslation) est l'un des plus anciens langages de programmation encore utilisés, créé dans les années 1950 par IBM. Fortran 95 est une version modernisée qui introduit la programmation structurée, les types dérivés, les modules, et bien d'autres fonctionnalités. Ce module présente l'histoire du langage, son environnement de développement, et la structure d'un programme Fortran 95 minimal.

## Histoire et évolution

Fortran a été conçu pour le calcul scientifique et numérique. Les principales versions sont Fortran 77 (standardisé), Fortran 90 (ajout des modules, tableaux dynamiques, types dérivés), et Fortran 95 (corrections mineures et ajouts comme `forall` et `where`). Fortran 95 est considéré comme le dernier standard majeur avant Fortran 2003.

## Structure d'un programme Fortran 95

Tout programme Fortran 95 commence par une instruction `program` et se termine par `end program`. Le nom du programme suit `program`.

```fortran
program hello
  implicit none
  write(*,*) "Bonjour depuis Fortran 95 !"
end program hello
```

## La règle `implicit none`

Par défaut, Fortran suppose qu'une variable dont le nom commence par les lettres `i`, `j`, `k`, `l`, `m`, ou `n` est de type `integer`, et toutes les autres sont de type `real`. Cette règle implicite est source d'erreurs. On utilise `implicit none` pour désactiver ce comportement et forcer la déclaration explicite de toutes les variables.

```fortran
program exemple
  implicit none
  integer :: x
  x = 42
  write(*,*) "x = ", x
end program exemple
```

## Les commentaires

Un commentaire commence par un point d'exclamation `!` et s'étend jusqu'à la fin de la ligne.

```fortran
program commentaires
  implicit none
  ! Ceci est un commentaire
  integer :: a  ! commentaire en fin de ligne
  a = 10
  ! write(*,*) a  ! cette ligne est commentée
end program commentaires
```

## Installation de gfortran

Avant de pouvoir compiler et exécuter des programmes Fortran, vous devez installer un compilateur. **gfortran** est le compilateur GNU libre et gratuit, disponible sur tous les systèmes.

### Windows

1. Téléchargez **MinGW-w64** ou **TDM-GCC** (qui inclut gfortran) :
   - [TDM-GCC](https://jmeubank.github.io/tdm-gcc/) — recommandé pour les débutants
   - [MinGW-w64](https://www.mingw-w64.org/) — via l'installateur
2. Lancez l'installateur et sélectionnez **gfortran** dans la liste des composants.
3. Ajoutez le dossier `bin` de votre installation à la variable d'environnement `PATH` :
   - Exemple : `C:\TDM-GCC-64\bin`
4. Vérifiez l'installation dans un terminal :
   ```bash
   gfortran --version
   ```

### macOS

Avec **Homebrew** (recommandé) :
```bash
brew install gcc
```

Ou avec **MacPorts** :
```bash
sudo port install gcc14
```

Vérifiez l'installation :
```bash
gfortran --version
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install gfortran
```

Pour Fedora/RHEL :
```bash
sudo dnf install gcc-gfortran
```

Vérifiez l'installation :
```bash
gfortran --version
```

## Compilation et exécution

Une fois gfortran installé (voir section précédente), compilez votre fichier source `.f95` avec :

```bash
gfortran -o programme source.f95
```

Exécutez le programme compilé :
```bash
./programme          # Linux / macOS
programme.exe        # Windows
```

### Options utiles de gfortran

| Option            | Description |
|-------------------|-------------|
| `-o <fichier>`    | Nom du fichier exécutable produit |
| `-Wall`           | Active tous les avertissements |
| `-Werror`         | Traite les avertissements comme des erreurs |
| `-g`              | Ajoute les symboles de débogage |
| `-O2`             | Optimisation de niveau 2 |
| `-std=f95`        | Force le standard Fortran 95 |

Exemple complet avec vérifications :
```bash
gfortran -Wall -Werror -std=f95 -o mon_prog source.f95
```

## À retenir

- Tout programme commence par `program nom` et se termine par `end program nom`.
- Toujours écrire `implicit none` après `program` pour éviter les erreurs de typage implicite.
- Les commentaires commencent par `!`.
- Fortran 95 est un langage compilé, idéal pour le calcul numérique.
- L'extension de fichier recommandée est `.f95`.

## Pièges courants

- **Oublier `implicit none`** : une variable `iCount` sera automatiquement de type `integer` même si vous vouliez un `real`. Toujours mettre `implicit none`.
- **Confondre `=` et `==`** : en Fortran, `=` est l'affectation, `==` est la comparaison. Une erreur fréquente des débutants est d'utiliser `=` dans un `if`.
- **Oublier le nom dans `end program`** : bien que facultatif, il est conseillé de répéter le nom du programme dans `end program nom` pour la lisibilité.
- **Extension de fichier** : certains compilateurs attendent une extension spécifique (`.f`, `.for`, `.f90`, `.f95`). Vérifiez la documentation de votre compilateur.
