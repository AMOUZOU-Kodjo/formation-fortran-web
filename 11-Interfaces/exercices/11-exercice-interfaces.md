# Exercice 11 — Interfaces

## Objectif
Déclarer une interface explicite pour une procédure externe.

## Instructions
1. Écrivez une subroutine `affiche(x)` externe (dans un autre fichier ou après contains).
2. Déclarez son interface dans le programme principal.
3. Appelez-la avec un réel.

## Code de départ
```fortran
program interfaces
  implicit none
  ! Interface à écrire
end program interfaces

subroutine affiche(x)
  real, intent(in) :: x
  write(*,*) "x =", x
end subroutine affiche
```
