# Exercice 24 — BLAS et LAPACK

## Objectif
Utiliser BLAS/LAPACK pour un calcul matriciel.

## Instructions
1. Créez deux matrices 3×3.
2. Utilisez `dgemm` de BLAS pour les multiplier.
3. Affichez le résultat.

## Code de départ
```fortran
program blas_example
  implicit none
  real(8), dimension(3,3) :: a, b, c
  integer :: i, j
  ! Initialisation
  do i = 1, 3
    do j = 1, 3
      a(i,j) = real(i+j-1, 8)
      b(i,j) = real(i-j, 8)
    end do
  end do
  ! Appel à dgemm
  ! À compléter
  write(*,*) "Multiplication terminee"
end program blas_example
```
