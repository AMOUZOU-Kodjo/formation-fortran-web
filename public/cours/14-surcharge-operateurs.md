# Surcharge d'opérateurs en Fortran 95

Fortran 95 permet de redéfinir le comportement des opérateurs (+, -, *, /, ==, etc.) pour les types dérivés grâce au mot-clé `interface operator`. On parle de surcharge d'opérateur. Cela rend le code plus naturel et expressif.

## Surcharge de l'opérateur `+`

On définit une interface pour l'opérateur `+` en lui associant une fonction qui prend deux arguments et retourne un résultat.

```fortran
module vecteur_module
  implicit none

  type :: Vecteur2D
    real :: x, y
  end type Vecteur2D

  interface operator(+)
    module procedure addition_vecteurs
  end interface

  contains

  function addition_vecteurs(a, b) result(c)
    type(Vecteur2D), intent(in) :: a, b
    type(Vecteur2D) :: c
    c%x = a%x + b%x
    c%y = a%y + b%y
  end function addition_vecteurs

end module vecteur_module

program test_surcharge
  use vecteur_module
  implicit none
  type(Vecteur2D) :: v1, v2, v3
  v1 = Vecteur2D(1.0, 2.0)
  v2 = Vecteur2D(3.0, 4.0)
  v3 = v1 + v2
  print *, v3
end program test_surcharge
```

## Surcharge de `*` pour produit scalaire

On peut surcharger l'opérateur `*` pour implémenter un produit scalaire.

```fortran
interface operator(*)
  module procedure produit_scalaire
end interface

function produit_scalaire(a, b) result(p)
  type(Vecteur2D), intent(in) :: a, b
  real :: p
  p = a%x * b%x + a%y * b%y
end function produit_scalaire
```

## Surcharge de `==` et `/=`

On surcharge les opérateurs de comparaison pour tester l'égalité de deux types dérivés.

```fortran
module date_module
  implicit none

  type :: Date
    integer :: jour, mois, annee
  end type Date

  interface operator(==)
    module procedure dates_egales
  end interface

  interface operator(/=)
    module procedure dates_differentes
  end interface

  contains

  function dates_egales(a, b) result(eq)
    type(Date), intent(in) :: a, b
    logical :: eq
    eq = (a%jour == b%jour) .and. (a%mois == b%mois) .and. (a%annee == b%annee)
  end function dates_egales

  function dates_differentes(a, b) result(neq)
    type(Date), intent(in) :: a, b
    logical :: neq
    neq = .not. (a == b)
  end function dates_differentes

end module date_module

program test_date
  use date_module
  implicit none
  type(Date) :: d1, d2
  d1 = Date(1, 1, 2025)
  d2 = Date(2, 1, 2025)
  if (d1 == d2) then
    print *, "Dates identiques"
  else
    print *, "Dates différentes"
  end if
end program test_date
```

## Surcharge de l'opérateur d'affectation `=`

Avec `interface assignment(=)`, on personnalise l'affectation entre types dérivés.

```fortran
module conversion
  implicit none

  type :: Point
    real :: x, y
  end type Point

  type :: PointPolaire
    real :: r, theta
  end type PointPolaire

  interface assignment(=)
    module procedure point_vers_polaire
  end interface

  contains

  subroutine point_vers_polaire(p, c)
    type(PointPolaire), intent(out) :: p
    type(Point), intent(in) :: c
    p%r = sqrt(c%x**2 + c%y**2)
    p%theta = atan2(c%y, c%x)
  end subroutine point_vers_polaire

end module conversion

program test_assignment
  use conversion
  implicit none
  type(Point) :: c
  type(PointPolaire) :: p
  c = Point(3.0, 4.0)
  p = c
  print *, "r =", p%r, "theta =", p%theta
end program test_assignment
```

## Opérateurs définis par l'utilisateur avec `.nom`

On peut aussi créer ses propres opérateurs en les entourant de points `.`.

```fortran
module vecteur3d
  implicit none

  type :: Vect3D
    real :: x, y, z
  end type Vect3D

  interface operator(.cross.)
    module procedure produit_vectoriel
  end interface

  contains

  function produit_vectoriel(a, b) result(c)
    type(Vect3D), intent(in) :: a, b
    type(Vect3D) :: c
    c%x = a%y * b%z - a%z * b%y
    c%y = a%z * b%x - a%x * b%z
    c%z = a%x * b%y - a%y * b%x
  end function produit_vectoriel

end module vecteur3d

program test_cross
  use vecteur3d
  implicit none
  type(Vect3D) :: u, v, w
  u = Vect3D(1.0, 0.0, 0.0)
  v = Vect3D(0.0, 1.0, 0.0)
  w = u .cross. v
  print *, w
end program test_cross
```

## À retenir

- `interface operator(op)` associe un opérateur à une fonction.
- La fonction doit avoir deux arguments pour les opérateurs binaires, un pour les opérateurs unaires.
- `interface assignment(=)` personnalise l'affectation.
- Les opérateurs définis par l'utilisateur s'écrivent `.nom_operateur.`.
- La surcharge s'utilise principalement dans un module avec `module procedure`.

## Pièges courants

- **Mauvais nombre d'arguments** : un opérateur binaire attend exactement deux arguments `intent(in)`.
- **Confondre `operator` et `assignment`** : `operator` définit une expression ; `assignment` définit une affectation.
- **Surcharge d'opérateurs existants sur des types natifs** : on ne peut pas redéfinir `+` pour des `real` ; la surcharge ne fonctionne que si au moins un opérande est un type dérivé.
- **Oublier `module procedure`** : sans ce mot-clé, le compilateur ne trouve pas la fonction associée.
- **Opérateur défini ambigu** : si le compilateur ne peut pas distinguer entre un opérateur natif et un surchargé, il génère une erreur.
