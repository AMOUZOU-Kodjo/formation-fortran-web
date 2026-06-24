# Exercice 26 — Tests et débogage

## Objectif
Déboguer un programme Fortran.

## Instructions
1. Le programme ci-dessous contient 3 erreurs.
2. Compilez avec `-Wall -g` pour les trouver.
3. Corrigez-les et vérifiez le résultat.

## Code à corriger
```fortran
program debug
  implicit none
  integer :: i
  real, dimension(5) :: t
  do i = 1, 10
    t(i) = i * 2
  end do
  write(*,*) "Moyenne:", sum(t) / size(t)
  write(*,*) "Le programme est correct"
end program debug
```
