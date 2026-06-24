# Exercice 18 — Récursivité

## Objectif
Écrire une fonction récursive.

## Instructions
1. Écrivez une fonction `fibonacci(n)` récursive.
2. Testez avec n=10, n=20.
3. Comparez avec une version itérative.

## Code de départ
```fortran
program recursivite
  implicit none
  ! À compléter
contains
  recursive function fibonacci(n) result(f)
    integer, intent(in) :: n
    integer :: f
    ! À compléter
  end function fibonacci
end program recursivite
```
