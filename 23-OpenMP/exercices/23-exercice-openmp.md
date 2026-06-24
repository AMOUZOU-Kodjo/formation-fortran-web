# Exercice 23 — OpenMP

## Objectif
Paralléliser une boucle avec OpenMP.

## Instructions
1. Compilez avec `gfortran -fopenmp -o omp omp.f95`.
2. Parallélisez une boucle qui remplit un tableau.
3. Utilisez `!$omp parallel do`.

## Code de départ
```fortran
program openmp
  implicit none
  integer, parameter :: n = 100000
  real, dimension(n) :: a
  integer :: i
  !$omp parallel do
  do i = 1, n
    a(i) = sin(real(i)/n * 6.28)
  end do
  !$omp end parallel do
  write(*,*) "Somme:", sum(a)
end program openmp
```
