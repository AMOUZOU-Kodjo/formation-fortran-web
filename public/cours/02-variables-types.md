# Variables et types de données

Ce module couvre les types de données intrinsèques de Fortran 95 : les entiers, les réels, les complexes, les caractères, et les booléens. Vous apprendrez à déclarer des variables, à utiliser les paramètres constants, et à maîtriser la précision numérique.

## Types de données intrinsèques

Fortran 95 propose cinq types de données de base :

- `integer` : nombres entiers (positifs, négatifs ou nuls)
- `real` : nombres à virgule flottante (simple précision)
- `double precision` : nombres à virgule flottante (double précision)
- `complex` : nombres complexes
- `character` : chaînes de caractères
- `logical` : valeurs booléennes (`.true.` ou `.false.`)

## Déclaration de variables

La syntaxe utilise `::` entre le type et le nom de la variable. On peut déclarer plusieurs variables du même type en les séparant par des virgules.

```fortran
program declaration
  implicit none
  integer :: i, j, k
  real :: x, y
  double precision :: z
  complex :: c
  character(len=20) :: nom
  logical :: est_valide

  i = 10
  x = 3.14159
  z = 3.141592653589793d0
  c = (1.0, 2.0)
  nom = "Fortran"
  est_valide = .true.

  write(*,*) "i =", i
  write(*,*) "x =", x
  write(*,*) "z =", z
  write(*,*) "c =", c
  write(*,*) "nom = ", nom
  write(*,*) "est_valide =", est_valide
end program declaration
```

## Le type `integer`

Les entiers sont signés par défaut. Leur taille dépend du compilateur, mais vaut généralement 4 ou 8 octets. On peut spécifier la taille avec `integer(kind=4)` ou `integer(kind=8)`.

```fortran
program entiers
  implicit none
  integer :: a
  integer(kind=8) :: grand

  a = 2147483647
  grand = 9223372036854775807_8
  write(*,*) "a =", a
  write(*,*) "grand =", grand
end program entiers
```

## Le type `real` et la précision

Les réels peuvent être déclarés en simple ou double précision. Les constantes en double précision doivent utiliser `d0` au lieu de `e0`.

```fortran
program reels
  implicit none
  real :: x
  double precision :: y

  x = 1.234567e2
  y = 1.23456789012345d0
  write(*,*) "simple précision :", x
  write(*,*) "double précision :", y
end program reels
```

## Le type `character`

Les chaînes de caractères ont une longueur fixe déclarée à la compilation. L'attribut `len=*` permet de passer une chaîne de longueur quelconque uniquement dans les procédures.

```fortran
program caracteres
  implicit none
  character(len=30) :: message
  character :: une_lettre

  message = "Apprendre Fortran 95"
  une_lettre = "A"
  write(*,*) message
  write(*,*) une_lettre
end program caracteres
```

## Les constantes (`parameter`)

Le mot-clé `parameter` permet de définir des constantes dont la valeur ne peut pas être modifiée.

```fortran
program constantes
  implicit none
  real, parameter :: pi = 3.14159265
  integer, parameter :: max_iter = 1000

  write(*,*) "pi =", pi
  write(*,*) "max iterations =", max_iter
  ! pi = 3.0  ! erreur de compilation
end program constantes
```

## Initialisation des variables

Les variables peuvent être initialisées au moment de la déclaration en leur affectant une valeur.

```fortran
program initialisation
  implicit none
  integer :: compteur = 0
  real :: somme = 0.0
  logical :: fini = .false.

  write(*,*) "compteur:", compteur, "somme:", somme, "fini:", fini
end program initialisation
```

## À retenir

- Les types de base sont `integer`, `real`, `double precision`, `complex`, `character`, `logical`.
- La syntaxe de déclaration est `type :: nom` avec `::`.
- Utilisez `parameter` pour les constantes invariables.
- `implicit none` est obligatoire pour éviter les erreurs de typage.
- Les constantes réelles en double précision utilisent `d0`.

## Pièges courants

- **Oublier `::`** : la syntaxe `integer x` est acceptée par certains compilateurs mais déconseillée. Utilisez systématiquement `integer :: x`.
- **Confondre simple et double précision** : écrire `3.14159` au lieu de `3.14159d0` en double précision tronque la valeur.
- **Dépassement d'entier** : un `integer` standard ne dépasse pas environ 2,1 milliards. Utilisez `integer(kind=8)` si nécessaire.
- **Chaînes trop longues** : affecter une chaîne de 30 caractères à une variable `character(len=10)` provoque une troncature silencieuse.
- **Paramètre modifié** : toute tentative de modification d'une variable `parameter` provoque une erreur de compilation.
