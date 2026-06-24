# Types dérivés en Fortran 95

Les types dérivés permettent de regrouper plusieurs variables de types différents sous une seule entité. C'est l'équivalent des structures en C ou des enregistrements en Pascal. Fortran 95 offre une syntaxe claire pour leur définition et leur manipulation.

## Définition d'un type dérivé

Le mot-clé `type` débute la définition, `end type` la termine.

```fortran
program ex_type
  implicit none

  type :: Point
    real :: x
    real :: y
  end type Point

  type :: Cercle
    type(Point) :: centre
    real :: rayon
  end type Cercle

  type(Cercle) :: c
  c%centre%x = 0.0
  c%centre%y = 0.0
  c%rayon = 5.0

  print *, "Cercle centré en (", c%centre%x, ",", c%centre%y, ") de rayon", c%rayon
end program ex_type
```

## Accès aux composants

On utilise l'opérateur `%` pour accéder aux champs d'une variable de type dérivé.

```fortran
type :: Personne
  character(len=30) :: nom
  integer :: age
  real :: taille
end type Personne

type(Personne) :: p
p%nom = "Dupont"
p%age = 25
p%taille = 1.78
```

## Initialisation d'un type dérivé

On peut initialiser une variable avec un constructeur littéral.

```fortran
type :: Date
  integer :: jour
  integer :: mois
  integer :: annee
end type Date

type(Date) :: d
d = Date(15, 3, 2025)
print *, d%jour, "/", d%mois, "/", d%annee
```

On peut aussi fournir des valeurs par défaut dans la définition du type.

```fortran
type :: Compteur
  integer :: valeur = 0
  integer :: pas = 1
end type Compteur

type(Compteur) :: c
print *, c%valeur  ! affiche 0
```

## Tableaux de types dérivés

On peut déclarer un tableau dont chaque élément est un type dérivé.

```fortran
program tableau_types
  implicit none

  type :: Point
    real :: x, y
  end type Point

  type(Point), dimension(10) :: points
  integer :: i

  do i = 1, 10
    points(i)%x = real(i)
    points(i)%y = real(i * i)
  end do

  print *, points(5)
end program tableau_types
```

## Types dérivés comme arguments de procédure

On passe un type dérivé à une subroutine ou fonction comme n'importe quelle variable.

```fortran
module geometrie
  implicit none

  type :: Rectangle
    real :: largeur
    real :: hauteur
  end type Rectangle

  contains

  function surface_rect(r) result(s)
    type(Rectangle), intent(in) :: r
    real :: s
    s = r%largeur * r%hauteur
  end function surface_rect

  subroutine agrandir(r, facteur)
    type(Rectangle), intent(inout) :: r
    real, intent(in) :: facteur
    r%largeur = r%largeur * facteur
    r%hauteur = r%hauteur * facteur
  end subroutine agrandir

end module geometrie

program test
  use geometrie
  implicit none
  type(Rectangle) :: boite
  boite = Rectangle(3.0, 4.0)
  print *, surface_rect(boite)
  call agrandir(boite, 2.0)
  print *, boite
end program test
```

## Composants allocatables dans un type dérivé

Un type dérivé peut contenir un tableau allocatable, pratique pour des données de taille variable.

```fortran
type :: Ensemble
  integer :: taille
  real, allocatable, dimension(:) :: valeurs
end type Ensemble

type(Ensemble) :: e
e%taille = 5
allocate(e%valeurs(5))
e%valeurs = [1.0, 2.0, 3.0, 4.0, 5.0]
deallocate(e%valeurs)
```

## Visibilité des composants

Dans un module, les composants d'un type dérivé peuvent être déclarés `private` ou `public`.

```fortran
module pile_module
  implicit none
  private
  public :: Pile, empiler, depiler

  type :: Pile
    private
    integer, allocatable, dimension(:) :: donnees
    integer :: sommet = 0
  end type Pile

  contains
  ! procédures d'accès
end module pile_module
```

## À retenir

- `type :: Nom ... end type` définit un nouveau type.
- `%` accède aux composants d'une variable de type dérivé.
- Un constructeur littéral `Type(val1, val2, ...)` initialise une variable.
- Les types dérivés peuvent contenir des tableaux et d'autres types dérivés.
- Les composants peuvent avoir des valeurs par défaut.
- On peut utiliser `private` / `public` sur les composants dans un module.

## Pièges courants

- **Oublier le `::` après `type(Nom)`** : la syntaxe correcte est `type(Nom) :: var`.
- **Confondre constructeur et accès** : `var%champ` pour accéder, `Type(champ=val)` pour construire.
- **Passer un type dérivé sans interface explicite** : hors module, le passage d'un type dérivé nécessite un bloc `interface` ou un module.
- **Comparer deux types dérivés** : Fortran 95 ne permet pas la comparaison directe avec `==` ; il faut comparer chaque composant individuellement.
- **Allocatable dans un type sans désallocation** : désallouer les composants allocatables avant que la variable ne sorte de portée.
