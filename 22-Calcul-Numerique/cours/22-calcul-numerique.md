# Calcul numérique en Fortran 95

Ce module explore les aspects numériques du Fortran 95 : précision des nombres flottants, fonctions intrinsèques pour l'arithmétique, et algorithmes numériques fondamentaux.

## Précision des nombres réels

Fortran 95 offre plusieurs façons de spécifier la précision.

```fortran
program precision_demo
    implicit none
    integer, parameter :: sp = kind(1.0)    ! simple précision
    integer, parameter :: dp = kind(1.0d0)  ! double précision

    real(sp) :: x
    real(dp) :: y

    x = 1.0_sp / 3.0_sp
    y = 1.0_dp / 3.0_dp

    print *, "Simple précision :", x
    print *, "Double précision :", y
end program precision_demo
```

## Fonctions intrinsèques numériques

Fortran 95 fournit des fonctions pour sonder et maîtriser l'arithmétique flottante.

```fortran
program epsilon_huge_tiny
    implicit none
    real :: x

    print *, "Epsilon :", epsilon(x)    ! plus petit écart représentable
    print *, "Huge    :", huge(x)       ! plus grand nombre fini
    print *, "Tiny    :", tiny(x)       ! plus petit nombre normalisé
    print *, "Précision :", precision(x) ! nombre de chiffres décimaux
    print *, "Radix   :", radix(x)     ! base du système (2)
end program epsilon_huge_tiny
```

## Méthode de Newton-Raphson

Un algorithme classique implémenté proprement.

```fortran
program newton_raphson
    implicit none
    real :: x, tol
    integer :: iter, max_iter

    x = 2.0          ! approximation initiale
    tol = 1.0e-12
    max_iter = 100

    do iter = 1, max_iter
        x = x - f(x) / f_prime(x)
        if (abs(f(x)) < tol) exit
    end do

    print *, "Racine trouvée :", x
    print *, "Itérations :", iter

contains

    function f(x) result(r)
        real, intent(in) :: x
        real :: r
        r = x**2 - 2.0   ! cherche sqrt(2)
    end function f

    function f_prime(x) result(r)
        real, intent(in) :: x
        real :: r
        r = 2.0 * x
    end function f_prime

end program newton_raphson
```

## Intégration numérique par trapèzes

Méthode simple mais robuste pour l'intégration.

```fortran
function integrer_trapezes(f, a, b, n) result(integral)
    implicit none
    real, intent(in) :: a, b
    integer, intent(in) :: n
    real :: integral, h, x
    integer :: i

    interface
        function f(x) result(r)
            real, intent(in) :: x
            real :: r
        end function f
    end interface

    h = (b - a) / n
    integral = 0.5 * (f(a) + f(b))

    do i = 1, n - 1
        x = a + i * h
        integral = integral + f(x)
    end do

    integral = integral * h
end function integrer_trapezes

program test_integrer
    implicit none

    print *, "Intégrale de sin(x) de 0 à pi :", &
        integrer_trapezes(f_sin, 0.0, 3.14159265, 1000)

contains

    function f_sin(x) result(r)
        real, intent(in) :: x
        real :: r
        r = sin(x)
    end function f_sin

end program test_integrer
```

## Élimination de Gauss

Résolution d'un système linéaire par pivot de Gauss.

```fortran
subroutine elim_gauss(a, b, x, n)
    implicit none
    integer, intent(in) :: n
    real, intent(inout) :: a(n, n), b(n)
    real, intent(out) :: x(n)
    real :: facteur
    integer :: i, j, k

    ! Élimination
    do k = 1, n - 1
        do i = k + 1, n
            facteur = a(i, k) / a(k, k)
            do j = k + 1, n
                a(i, j) = a(i, j) - facteur * a(k, j)
            end do
            b(i) = b(i) - facteur * b(k)
        end do
    end do

    ! Remontée
    do i = n, 1, -1
        x(i) = b(i)
        do j = i + 1, n
            x(i) = x(i) - a(i, j) * x(j)
        end do
        x(i) = x(i) / a(i, i)
    end do
end subroutine elim_gauss
```

## Recherche dichotomique

Algorithme efficace pour trouver une racine d'une fonction continue.

```fortran
function dichotomie(f, a, b, tol) result(r)
    implicit none
    real, intent(in) :: a, b, tol
    real :: r, fa, fb, fc, c

    interface
        function f(x) result(r)
            real, intent(in) :: x
            real :: r
        end function f
    end interface

    fa = f(a)
    fb = f(b)

    do
        c = (a + b) / 2.0
        fc = f(c)
        if (abs(fc) < tol .or. (b - a) < tol) exit
        if (fa * fc < 0.0) then
            b = c
            fb = fc
        else
            a = c
            fa = fc
        end if
    end do

    r = c
end function dichotomie
```

## Pièges courants

- Utiliser `real` simple précision par défaut alors que la double précision est nécessaire.
- Comparer des flottants avec `==` : préférer `abs(a - b) < epsilon * scale`.
- Division par zéro : un dénominateur nul en élimination de Gauss provoque une erreur.
- Perte de précision par soustraction de deux nombres proches.
- Oublier de dimensionner correctement les tableaux dans l'interface des fonctions.

## À retenir

- `epsilon`, `huge`, `tiny`, `precision` permettent de contrôler l'arithmétique flottante.
- Les algorithmes numériques (Newton, trapezes, Gauss) s'implémentent naturellement en Fortran.
- La double précision (`kind(1.0d0)`) est recommandée pour le calcul scientifique.
- Toujours traiter les cas singuliers et les divisions par zéro.
