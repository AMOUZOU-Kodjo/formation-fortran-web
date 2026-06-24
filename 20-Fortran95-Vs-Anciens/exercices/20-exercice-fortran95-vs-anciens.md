# Exercice 20 — F95 vs anciens standards

## Objectif
Moderniser du code Fortran 77 en Fortran 95.

## Instructions
1. Le code ci-dessous utilise des labels et du F77.
2. Réécrivez-le en Fortran 95 avec `do`/`end do`, `if`/`end if`.
3. Ajoutez `implicit none`.

## Code F77
```fortran
      PROGRAM OLD
      DIMENSION A(10)
      DO 10 I=1,10
      A(I)=I*2
   10 CONTINUE
      DO 20 I=1,10
      WRITE(*,*) A(I)
   20 CONTINUE
      END
```
