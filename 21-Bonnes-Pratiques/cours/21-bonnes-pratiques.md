# Bonnes pratiques de programmation en Fortran 95

Ce module présente les conventions et bonnes pratiques pour écrire du code Fortran 95 maintenable, lisible et fiable. L'objectif est de produire un code professionnel adapté au calcul scientifique.

## Toujours utiliser `implicit none`

La règle la plus importante. Elle force la déclaration explicite de toutes les variables.

```fortran
program calcul
    implicit none
    integer :: i, n
    real :: somme
    ! Toute variable non déclarée provoque une erreur
end program calcul
```

## Conventions de nommage

Les noms doivent être explicites et suivre une convention cohérente.

```fortran
! Bon
integer :: nombre_de_points
real :: temperature_moyenne
character(len=256) :: fichier_entree

function calculer_moyenne(tab) result(moy)
    real, intent(in) :: tab(:)
    real :: moy
    moy = sum(tab) / size(tab)
end function calculer_moyenne
```

## L'attribut `intent`

Toujours spécifier `intent(in)`, `intent(out)` ou `intent(inout)` pour les arguments de sous-programmes.

```fortran
subroutine resoudre_systeme(a, b, x)
    implicit none
    real, intent(in) :: a(:,:)  ! matrice lue
    real, intent(in) :: b(:)    ! second membre lu
    real, intent(out) :: x(:)   ! solution écrite
    ! ...
end subroutine resoudre_systeme
```

## Organisation du code

Structurer le code en modules cohérents. Chaque module contient des fonctionnalités liées.

```fortran
module operateurs_matrice
    implicit none
    private
    public :: produit_matrice, transpose_matrice, trace

contains
    ! ...
end module operateurs_matrice
```

## Indentation et mise en forme

Une indentation cohérente (2 ou 3 espaces) améliore la lisibilité.

```fortran
program structure_exemple
    implicit none
    integer :: i, j

    boucle_principale : do i = 1, 10
        boucle_interne : do j = 1, 10
            if (i == j) cycle boucle_interne
            print *, i, j
        end do boucle_interne
    end do boucle_principale
end program structure_exemple
```

## Éviter les constantes magiques

Utiliser des paramètres nommés plutôt que des valeurs littérales.

```fortran
program physique
    implicit none
    real, parameter :: pi = 3.14159265358979323846
    real, parameter :: g = 9.80665  ! accélération gravitationnelle (m/s^2)
    real :: rayon, surface

    rayon = 5.0
    surface = pi * rayon**2
end program physique
```

## Gestion des erreurs

Vérifier systématiquement les retours d'opérations d'entrée/sortie et d'allocation.

```fortran
program lecture_fichier
    implicit none
    real :: val
    integer :: ios

    open(unit=10, file="donnees.txt", status="old", iostat=ios)
    if (ios /= 0) then
        print *, "Erreur : impossible d'ouvrir le fichier"
        stop
    end if

    read(10, *, iostat=ios) val
    if (ios /= 0) then
        print *, "Erreur de lecture"
    else
        print *, "Valeur :", val
    end if

    close(10)
end program lecture_fichier
```

## Commentaires pertinents

Commenter le *pourquoi*, pas le *comment*. Un code clair se lit tout seul.

```fortran
! Calcule la racine carrée par la méthode de Newton
function racine_carree(x) result(r)
    implicit none
    real, intent(in) :: x
    real :: r, old
    r = x

    do
        old = r
        r = 0.5 * (r + x / r)
        if (abs(r - old) < epsilon(r) * 10) exit
    end do
end function racine_carree
```

## Utiliser des modules plutôt que des `common`

Les `common blocks` de Fortran 77 sont à proscrire. Les modules offrent sécurité et clarté.

```fortran
! À ne plus faire
      COMMON /params/ N, DT, TMAX

! Façon moderne
module parametres
    implicit none
    integer, save :: n
    real, save :: dt, tmax
end module parametres
```

## Pièges courants

- Oublier `implicit none` : le compilateur devine les types, source d'erreurs silencieuses.
- Confondre `intent(in)` et `intent(inout)` : une variable `intent(in)` ne doit jamais être modifiée.
- Noms trop courts (`x`, `i`, `j`) sans contexte : utiliser `indice_colonne`, `nombre_iterations`.
- Indentation incohérente : rend le code difficile à suivre.
- Absence de vérification `iostat` : les fichiers inexistants ou les allocations échouées passent inaperçus.

## À retenir

- `implicit none` est obligatoire dans tout code professionnel.
- `intent` documente et sécurise le passage d'arguments.
- Les paramètres nommés (`parameter`) remplacent les constantes magiques.
- Toujours vérifier les codes d'erreur (`iostat`).
- Un code bien indenté et bien nommé se documente de lui-même.
