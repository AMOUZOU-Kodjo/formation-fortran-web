# Exercice 27 — Projet final

## Objectif
Réaliser un mini-projet complet en Fortran 95.

## Instructions
Créez un programme de **calculatrice matricielle** qui :
1. Lit deux matrices depuis des fichiers.
2. Propose un menu : addition, multiplication, transposition.
3. Affiche et sauvegarde le résultat.

## Code de départ
```fortran
program calculatrice_matricielle
  implicit none
  integer :: choix
  logical :: continuer = .true.
  do while (continuer)
    write(*,*) "=== Calculatrice Matricielle ==="
    write(*,*) "1. Addition"
    write(*,*) "2. Multiplication"
    write(*,*) "3. Transposition"
    write(*,*) "4. Quitter"
    write(*,*) "Votre choix :"
    read(*,*) choix
    ! À compléter
  end do
end program calculatrice_matricielle
```
