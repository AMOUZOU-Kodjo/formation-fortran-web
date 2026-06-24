# Exercice 19 — Interfaçage avec C

## Objectif
Appeler une fonction C depuis Fortran.

## Instructions
1. Écrivez la déclaration `bind(C)` pour la fonction `sqrt` de la libm C.
2. Appelez-la depuis le programme Fortran.
3. Affichez le résultat.

## Code de départ
```fortran
program interfacage_c
  implicit none
  interface
    function c_sqrt(x) bind(C, name="sqrt")
      use iso_c_binding
      real(c_double) :: c_sqrt
      real(c_double), value :: x
    end function
  end interface
  ! À compléter
end program interfacage_c
```
