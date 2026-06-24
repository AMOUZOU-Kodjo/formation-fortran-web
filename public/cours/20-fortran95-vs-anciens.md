# Fortran 95 face aux anciennes normes

Fortran a beaucoup évolué depuis sa création dans les années 1950. Ce module compare Fortran 95 avec les anciennes normes (Fortran 66, 77) en mettant en évidence les améliorations majeures qui font de Fortran 95 un langage moderne et structuré.

## Format libre vs format fixe

Le changement le plus visible est la syntaxe.

### Format fixe (Fortran 77)

```fortran
      PROGRAM SOMME
      INTEGER N, I, S
      S = 0
      DO 10 I = 1, N
         S = S + I
   10 CONTINUE
      PRINT *, S
      END
```

Les colonnes 1-5 sont réservées aux étiquettes, la colonne 6 pour la continuation, et les colonnes 73-80 sont ignorées.

### Format libre (Fortran 95)

```fortran
program somme
    implicit none
    integer :: n, i, s
    s = 0
    do i = 1, n
        s = s + i
    end do
    print *, s
end program somme
```

Plus de contraintes de colonnes. Le code est plus lisible et s'écrit naturellement.

## Déclarations implicites vs `implicit none`

En Fortran 77, les variables non déclarées étaient implicitement typées : `i-n` pour les entiers, autres pour les réels.

```fortran
! Fortran 77 - X est réel, I est entier automatiquement
      X = 3.14
      I = 42
```

Fortran 95 interdit cette pratique ambiguë avec `implicit none`.

```fortran
program clair
    implicit none
    real :: x = 3.14
    integer :: i = 42
end program clair
```

## Architecture modulaire

Fortran 77 organisait le code en sous-programmes et fonctions. Fortran 95 introduit les modules.

```fortran
module mathematiques
    implicit none
contains
    function factorielle(n) result(res)
        integer, intent(in) :: n
        integer :: res, i
        res = 1
        do i = 2, n
            res = res * i
        end do
    end function factorielle
end module mathematiques

program demo
    use mathematiques
    implicit none
    print *, factorielle(5)
end program demo
```

## Allocation dynamique

Fortran 77 utilisait des tableaux à taille fixe. Fortran 95 offre l'allocation dynamique.

```fortran
! Fortran 77 - taille fixe
      REAL A(100)

! Fortran 95 - allocation dynamique
    real, allocatable :: a(:)
    integer :: n

    read *, n
    allocate(a(n))
    ! ...
    deallocate(a)
```

## Variables allocatables comme arguments

Fortran 95 permet de passer des tableaux allocatables aux sous-programmes.

```fortran
subroutine creer_tableau(t, n)
    implicit none
    real, allocatable, intent(out) :: t(:)
    integer, intent(in) :: n
    integer :: i

    allocate(t(n))
    do i = 1, n
        t(i) = real(i)
    end do
end subroutine creer_tableau
```

## Structures de contrôle modernes

Fortran 77 utilisait des `if` arithmétiques et des `goto` nombreux. Fortran 95 propose `select case`, `exit`, `cycle`.

```fortran
! Fortran 95
select case (mois)
    case (1, 3, 5, 7, 8, 10, 12)
        jours = 31
    case (4, 6, 9, 11)
        jours = 30
    case (2)
        jours = 28
    case default
        jours = -1
end select
```

## Types dérivés

Fortran 77 n'avait pas de structures de données. Fortran 95 introduit les `type`.

```fortran
type point
    real :: x, y
    character(len=20) :: nom
end type point

type(point) :: p
p%x = 1.0
p%y = 2.0
p%nom = "origine"
```

## Pièges courants

- Utiliser du code F95 avec un compilateur F90 : certaines fonctionnalités (comme `forall`) peuvent manquer.
- Mélanger format fixe et libre dans le même fichier (extension `.f` vs `.f90`).
- Supposer que `real` a la même précision qu'en F77 (sur certains compilateurs modernes, `real` peut être 8 octets).
- Utiliser des extensions propriétaires (comme `!DEC$`) qui nuisent à la portabilité.
- Oublier de libérer la mémoire `allocate` avec `deallocate`.

## À retenir

- Fortran 95 abandonne le format fixe pour le format libre.
- `implicit none` supprime les déclarations implicites dangereuses.
- Les modules remplacent les `common blocks` et offrent l'encapsulation.
- L'allocation dynamique et les types dérivés enrichissent l'expressivité.
- Les structures de contrôle modernes (`select case`, `cycle`, `exit`) améliorent la clarté.
