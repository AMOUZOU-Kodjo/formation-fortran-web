# Exercice 10 — Modules

## Objectif
Créer et utiliser un module.

## Instructions
1. Créez un module `constantes` avec pi=3.14159265.
2. Utilisez-le dans le programme principal.

## Code de départ
```fortran
module constantes
  implicit none
  real, parameter :: pi = 3.14159265
end module constantes

program test_module
  use constantes
  implicit none
  ! À compléter
end program test_module
```
