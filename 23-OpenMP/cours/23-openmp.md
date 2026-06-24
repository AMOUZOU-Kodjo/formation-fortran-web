# Parallélisme avec OpenMP

OpenMP est une API de programmation parallèle pour la mémoire partagée. Ce module explique comment paralléliser du code Fortran 95 avec les directives OpenMP pour exploiter les processeurs multicœurs.

## Principe général

OpenMP utilise des directives sous forme de commentaires spéciaux (`!$omp`). Si le compilateur ne supporte pas OpenMP, ces lignes sont ignorées et le code reste séquentiel.

```fortran
program hello_omp
    implicit none
    integer :: nthreads, tid

    !$omp parallel private(tid)
    tid = omp_get_thread_num()
    print *, "Bonjour du thread", tid
    !$omp end parallel
end program hello_omp
```

Compilation avec gfortran : `gfortran -fopenmp -o hello hello.f90`

## La directive `parallel do`

Parallélise automatiquement une boucle `do` en distribuant les itérations entre les threads.

```fortran
program somme_parallele
    implicit none
    integer, parameter :: n = 1000000
    real, dimension(n) :: a, b, c
    integer :: i

    a = 1.0
    b = 2.0

    !$omp parallel do
    do i = 1, n
        c(i) = a(i) + b(i)
    end do
    !$omp end parallel do

    print *, "c(1) =", c(1), "c(n) =", c(n)
end program somme_parallele
```

## Réduction avec `reduction`

L'opération de réduction combine les résultats partiels de chaque thread sans conflit.

```fortran
program calcul_pi
    implicit none
    integer, parameter :: n = 1000000
    real :: h, x, sum
    integer :: i

    h = 1.0 / n
    sum = 0.0

    !$omp parallel do private(x) reduction(+:sum)
    do i = 1, n
        x = h * (i - 0.5)
        sum = sum + 4.0 / (1.0 + x * x)
    end do
    !$omp end parallel do

    print *, "Pi ~", h * sum
end program calcul_pi
```

## Section critique avec `critical`

Protège une section de code contre les accès concurrents.

```fortran
program compteur
    implicit none
    integer :: compteur, i

    compteur = 0

    !$omp parallel do
    do i = 1, 1000
        !$omp critical
        compteur = compteur + 1
        !$omp end critical
    end do
    !$omp end parallel do

    print *, "Compteur :", compteur
end program compteur
```

## Variables privées et partagées

- `private(var)` : chaque thread a sa propre copie, non initialisée.
- `firstprivate(var)` : chaque thread a sa copie initialisée à la valeur avant la région parallèle.
- `shared(var)` : tous les threads partagent la même variable (comportement par défaut).

```fortran
program private_demo
    implicit none
    integer :: i, tid, n

    n = 4

    !$omp parallel private(tid) firstprivate(n)
    tid = omp_get_thread_num()
    print *, "Thread", tid, "n =", n
    !$omp end parallel
end program private_demo
```

## Sections parallèles

Exécute des blocs de code différents en parallèle.

```fortran
program sections_demo
    implicit none

    !$omp parallel sections
    !$omp section
    print *, "Section 1 exécutée par le thread", omp_get_thread_num()
    !$omp section
    print *, "Section 2 exécutée par le thread", omp_get_thread_num()
    !$omp section
    print *, "Section 3 exécutée par le thread", omp_get_thread_num()
    !$omp end parallel sections
end program sections_demo
```

## Parallélisme sur matrice

Exemple d'addition de matrices parallélisée.

```fortran
subroutine ajouter_matrice(a, b, c, m, n)
    implicit none
    integer, intent(in) :: m, n
    real, intent(in) :: a(m, n), b(m, n)
    real, intent(out) :: c(m, n)
    integer :: i, j

    !$omp parallel do private(i, j)
    do i = 1, m
        do j = 1, n
            c(i, j) = a(i, j) + b(i, j)
        end do
    end do
    !$omp end parallel do
end subroutine ajouter_matrice
```

## Fonctions OpenMP utiles

```fortran
program infos_omp
    implicit none
    integer :: nthreads, tid

    !$omp parallel private(tid)
    tid = omp_get_thread_num()
    if (tid == 0) then
        nthreads = omp_get_num_threads()
        print *, "Nombre de threads disponibles :", nthreads
    end if
    !$omp end parallel
end program infos_omp
```

## Pièges courants

- Oublier `private` pour les variables d'itération : les threads interfèrent.
- Utiliser `critical` trop largement : détruit les bénéfices du parallélisme.
- Course critique (race condition) sur les variables partagées non protégées.
- Oublier de compiler avec `-fopenmp` (gfortran) ou l'équivalent.
- Supposer que paralléliser une boucle `do` est toujours plus rapide (surcharge pour les petites boucles).
- Variables non initialisées avec `private` : utiliser `firstprivate` si besoin.

## À retenir

- `!$omp parallel do` parallélise facilement les boucles.
- `reduction` gère les cumuls sans conflit.
- `critical` protège les sections sensibles mais ralentit.
- `private`, `firstprivate` et `shared` contrôlent la visibilité des données.
- Le parallélisme a un coût : réserver OpenMP aux boucles de grande taille.
