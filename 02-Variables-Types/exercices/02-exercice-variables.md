# Exercice 02 — Variables et types

## Objectif
Déclarer et utiliser différents types de variables.

## Instructions
1. Déclarez une variable `integer`, une `real(8)`, une `character(len=20)`.
2. Assignez-leur des valeurs et affichez-les.
3. Testez la conversion implicite entre `integer` et `real`.

## Code de départ
```fortran
program variables
  implicit none
  integer :: n
  real(8) :: x
  character(len=20) :: nom
  ! À compléter
end program variables
```

## Vérification
- Affiche les trois variables avec leurs types.
- La conversion implicite fonctionne sans warning (vérifiez avec -Wall).
