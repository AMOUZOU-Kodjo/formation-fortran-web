# Exercice 22 — Calcul numérique

## Objectif
Résoudre une équation numérique.

## Instructions
1. Implémentez la méthode de dichotomie pour trouver la racine de f(x)=x²-2.
2. L'intervalle initial est [0, 2], tolérance 1e-6.

## Code de départ
```fortran
program dichotomie
  implicit none
  real :: a=0.0, b=2.0, m, tol=1e-6
  ! À compléter
contains
  real function f(x)
    real, intent(in) :: x
    f = x**2 - 2.0
  end function
end program dichotomie
```
