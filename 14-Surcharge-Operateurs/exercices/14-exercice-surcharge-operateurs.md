# Exercice 14 — Surcharge d'opérateurs

## Objectif
Surcharger l'opérateur `+` pour un type dérivé.

## Instructions
1. Utilisez le type `Point` de l'exercice 13.
2. Surchargez `+` pour additionner deux points.
3. Testez avec `p1 + p2`.

## Code de départ
```fortran
module point_mod
  implicit none
  type :: Point
    real :: x, y
  end type
  interface operator(+)
    module procedure add_points
  end interface
contains
  function add_points(a, b) result(c)
    type(Point), intent(in) :: a, b
    type(Point) :: c
    c%x = a%x + b%x
    c%y = a%y + b%y
  end function
end module

program surcharge
  use point_mod
  implicit none
  ! À compléter
end program surcharge
```
