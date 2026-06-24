# Exercice 12 — Allocation dynamique

## Objectif
Allouer et désallouer un tableau dynamiquement.

## Instructions
1. Demandez à l'utilisateur la taille N d'un tableau.
2. Allouez un tableau de taille N avec `allocate`.
3. Remplissez avec des valeurs et affichez.
4. Désallouez avec `deallocate`.

## Code de départ
```fortran
program allocation
  implicit none
  integer, allocatable, dimension(:) :: t
  integer :: n, i
  write(*,*) "Taille du tableau :"
  read(*,*) n
  ! À compléter
end program allocation
```
