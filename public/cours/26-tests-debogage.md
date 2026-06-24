# Tests et débogage en Fortran 95

Ce module couvre les techniques de test et de débogage pour le code Fortran 95 : utilisation du débogueur GDB, options de compilation, assertions et tests unitaires.

## Compilation avec options de débogage

Les options du compilateur gfortran activent différents niveaux de vérification.

```bash
# Options de base pour le débogage
gfortran -g -Wall -fcheck=all -fbounds-check -o programme programme.f90

# Explication des options :
# -g            : inclut les symboles de débogage
# -Wall         : active tous les avertissements
# -fcheck=all   : vérifie les débordements de tableau, etc.
# -fbounds-check: vérifie les bornes des tableaux à l'exécution
```

Exemple de code qui plante sans `-fcheck=all` :

```fortran
program depassement
    implicit none
    integer, dimension(5) :: tab
    integer :: i

    do i = 1, 10
        tab(i) = i  ! Erreur : dépasse la taille 5
    end do
end program depassement
```

Avec `-fcheck=all`, ce code produit un message d'erreur clair à l'exécution.

## Utilisation de GDB

GDB (GNU Debugger) permet d'exécuter pas à pas et d'inspecter les variables.

```bash
gfortran -g -o programme programme.f90
gdb programme
```

Commandes GDB essentielles :

```gdb
run          # Lance le programme
break 42     # Point d'arrêt à la ligne 42
break nom_subroutine  # Point d'arrêt à l'entrée d'un sous-programme
next         # Exécute la ligne suivante (sans entrer dans les appels)
step         # Exécute la ligne suivante (entre dans les appels)
print var    # Affiche la valeur d'une variable
display var  # Affiche la variable à chaque arrêt
continue     # Reprend l'exécution jusqu'au prochain point d'arrêt
backtrace    # Affiche la pile d'appels
quit         # Quitte GDB
```

## Tests unitaires avec assertions

Une assertion vérifie une condition et s'arrête si elle est fausse.

```fortran
module test_utils
    implicit none
contains
    subroutine assert_equal(a, b, message)
        real, intent(in) :: a, b
        character(len=*), intent(in) :: message

        if (abs(a - b) > 1.0e-10) then
            print *, "ÉCHEC : ", message
            print *, "  attendu :", a
            print *, "  obtenu  :", b
            stop
        else
            print *, "OK : ", message
        end if
    end subroutine assert_equal

    subroutine assert_true(condition, message)
        logical, intent(in) :: condition
        character(len=*), intent(in) :: message

        if (.not. condition) then
            print *, "ÉCHEC : ", message
            stop
        else
            print *, "OK : ", message
        end if
    end subroutine assert_true
end module test_utils

program test_maths
    use test_utils
    implicit none

    call assert_equal(4.0, carre(2.0), "carre(2.0) == 4.0")
    call assert_equal(0.0, carre(0.0), "carre(0.0) == 0.0")
    call assert_equal(1.0, carre(-1.0), "carre(-1.0) == 1.0")

contains

    function carre(x) result(r)
        real, intent(in) :: x
        real :: r
        r = x * x
    end function carre

end program test_maths
```

## Impression de débogage conditionnelle

Utiliser des directives de compilation pour activer/désactiver les impressions.

```fortran
program debogage_conditionnel
    implicit none
    logical, parameter :: debug = .true.
    real :: x, y

    x = 3.0
    y = x * 2.0

    if (debug) then
        print *, "DEBUG : x =", x, "y =", y
    end if
end program debogage_conditionnel
```

## Vérification des allocate

Toujours vérifier le statut des allocations.

```fortran
subroutine creer_grand_tableau(n)
    implicit none
    integer, intent(in) :: n
    real, allocatable :: tab(:)
    integer :: stat

    allocate(tab(n), stat=stat)
    if (stat /= 0) then
        print *, "Erreur d'allocation : taille =", n
        stop
    end if

    ! Utilisation
    tab = 1.0

    deallocate(tab)
end subroutine creer_grand_tableau
```

## Test de performance (profiling)

```fortran
program profiler
    implicit none
    real :: t_debut, t_fin
    integer :: i

    call cpu_time(t_debut)

    do i = 1, 1000000
        if (mod(i, 100000) == 0) then
            call cpu_time(t_fin)
            print *, "Itération", i, ": temps =", t_fin - t_debut, "s"
        end if
    end do

    call cpu_time(t_fin)
    print *, "Temps total :", t_fin - t_debut, "s"
end program profiler
```

## Test unitaire structuré

```fortran
module tests_rk4
    implicit none
contains
    subroutine tester_rk4()
        ! Test : résoudre dy/dt = y avec y(0) = 1
        ! Solution exacte : y(t) = exp(t)
        real :: y, t, dt, solution_exacte
        integer :: i

        y = 1.0
        t = 0.0
        dt = 0.001

        do i = 1, 1000
            call rk4_step(derivee_test, t, y, dt)
            t = t + dt
        end do

        solution_exacte = exp(1.0)

        if (abs(y - solution_exacte) < 1.0e-6) then
            print *, "OK : RK4 sur exp(t) ->", y
        else
            print *, "ÉCHEC : attendu", solution_exacte, "obtenu", y
        end if
    end subroutine tester_rk4

    function derivee_test(t, y) result(r)
        real, intent(in) :: t, y
        real :: r
        r = y
    end function derivee_test
end module tests_rk4
```

## Pièges courants

- Compiler en mode `-O2` pendant le débogage : les optimisations masquent les variables.
- Ignorer les avertissements du compilateur : `-Wall` n'est pas optionnel.
- Tester sans vérifier les cas limites (tableaux vides, zéro, infini).
- Confondre `stop` (arrêt total) et `return` (sortie de sous-programme).
- Utiliser `print` de débogage et oublier de les retirer.
- Ne pas tester les échecs d'allocation sur les grands tableaux.

## À retenir

- Compiler avec `-g -Wall -fcheck=all` pendant le développement.
- GDB permet l'inspection pas à pas et l'affichage des variables.
- Les assertions détectent automatiquement les régressions.
- `cpu_time` mesure les performances du code.
- `allocate(..., stat=stat)` doit toujours être vérifié.
