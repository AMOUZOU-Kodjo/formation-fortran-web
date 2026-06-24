# BLAS et LAPACK en Fortran 95

BLAS (Basic Linear Algebra Subprograms) et LAPACK (Linear Algebra PACKage) sont les bibliothèques standard pour l'algèbre linéaire en Fortran. Ce module explique comment les utiliser dans vos programmes Fortran 95.

## Qu'est-ce que BLAS ?

BLAS fournit des opérations vectorielles et matricielles de base classées en trois niveaux :

- **Niveau 1** : opérations vecteur-vecteur (produit scalaire, norme)
- **Niveau 2** : opérations matrice-vecteur (produit matrice-vecteur)
- **Niveau 3** : opérations matrice-matrice (produit matriciel)

## Niveau 1 : produit scalaire avec `ddot`

```fortran
program blas_niveau1
    implicit none
    integer, parameter :: n = 5
    real*8 :: x(n), y(n), dot
    external :: ddot

    x = (/ 1.0d0, 2.0d0, 3.0d0, 4.0d0, 5.0d0 /)
    y = (/ 5.0d0, 4.0d0, 3.0d0, 2.0d0, 1.0d0 /)

    dot = ddot(n, x, 1, y, 1)
    print *, "Produit scalaire :", dot
end program blas_niveau1
```

## Niveau 2 : produit matrice-vecteur avec `dgemv`

```fortran
program blas_niveau2
    implicit none
    integer, parameter :: m = 3, n = 3
    real*8 :: a(m, n), x(n), y(m)
    external :: dgemv

    a = reshape((/ 1.0d0, 0.0d0, 0.0d0, &
                   0.0d0, 1.0d0, 0.0d0, &
                   0.0d0, 0.0d0, 1.0d0 /), (/ m, n /))
    x = (/ 2.0d0, 3.0d0, 4.0d0 /)
    y = 0.0d0

    ! y = alpha * A * x + beta * y
    call dgemv('N', m, n, 1.0d0, a, m, x, 1, 0.0d0, y, 1)
    print *, "A * x :", y
end program blas_niveau2
```

## Niveau 3 : produit matriciel avec `dgemm`

`dgemm` est la routine la plus célèbre de BLAS pour le produit de deux matrices.

```fortran
program produit_matrice
    implicit none
    integer, parameter :: m = 2, n = 2, k = 2
    real*8 :: a(m, k), b(k, n), c(m, n)
    external :: dgemm

    a = reshape((/ 1.0d0, 3.0d0, 2.0d0, 4.0d0 /), (/ m, k /))
    b = reshape((/ 1.0d0, 0.0d0, 1.0d0, 1.0d0 /), (/ k, n /))
    c = 0.0d0

    ! C = alpha * A * B + beta * C
    call dgemm('N', 'N', m, n, k, 1.0d0, a, m, b, k, 0.0d0, c, m)

    print *, "Produit A * B :"
    print *, c(1, :), c(2, :)
end program produit_matrice
```

Paramètres de `dgemm` :

- `'N'` ou `'T'` : utiliser la matrice normale ou transposée
- `m, n, k` : dimensions
- `alpha, beta` : scalaires multiplicatifs
- `a, b, c` : matrices
- `lda, ldb, ldc` : leading dimension (généralement la première dimension déclarée)

## Résolution de systèmes avec LAPACK

LAPACK étend BLAS avec la résolution de systèmes linéaires, valeurs propres, SVD, etc.

### `dgesv` : résolution de `A * x = b`

```fortran
program resoudre_systeme
    implicit none
    integer, parameter :: n = 3
    integer :: ipiv(n), info
    real*8 :: a(n, n), b(n)
    external :: dgesv

    a = reshape((/ 2.0d0, 1.0d0, 1.0d0, &
                   4.0d0, 3.0d0, 1.0d0, &
                   2.0d0, 2.0d0, 2.0d0 /), (/ n, n /))
    b = (/ 4.0d0, 8.0d0, 6.0d0 /)

    call dgesv(n, 1, a, n, ipiv, b, n, info)

    if (info == 0) then
        print *, "Solution :", b
    else
        print *, "La matrice est singulière"
    end if
end program resoudre_systeme
```

### `dsyev` : valeurs propres d'une matrice symétrique

```fortran
program valeurs_propres
    implicit none
    integer, parameter :: n = 3
    integer :: lwork, info
    real*8 :: a(n, n), w(n), work(100)
    external :: dsyev

    a = reshape((/ 1.0d0, 2.0d0, 0.0d0, &
                   2.0d0, 2.0d0, 1.0d0, &
                   0.0d0, 1.0d0, 3.0d0 /), (/ n, n /))

    lwork = 100
    call dsyev('V', 'U', n, a, n, w, work, lwork, info)

    if (info == 0) then
        print *, "Valeurs propres :", w
    end if
end program valeurs_propres
```

## Compilation avec BLAS/LAPACK

```bash
gfortran -o programme programme.f90 -llapack -lblas
```

Sous Windows avec gfortran, installer les bibliothèques via MSYS2 ou utiliser des distributions comme OpenBLAS.

```bash
gfortran -o programme programme.f90 -lopenblas
```

## Interface générique avec des modules

Pour éviter `external` et les erreurs de type, on peut créer une interface.

```fortran
module blas_interfaces
    implicit none
    interface
        subroutine dgemm(transa, transb, m, n, k, alpha, a, lda, b, ldb, &
                        beta, c, ldc)
            character, intent(in) :: transa, transb
            integer, intent(in) :: m, n, k, lda, ldb, ldc
            real*8, intent(in) :: alpha, beta
            real*8, intent(in) :: a(lda, *), b(ldb, *)
            real*8, intent(inout) :: c(ldc, *)
        end subroutine dgemm
    end interface
end module blas_interfaces
```

## Pièges courants

- Oublier que BLAS utilise le column-major (ordre des colonnes), comme Fortran.
- Confondre `lda`, `ldb`, `ldc` avec les dimensions logiques m, n, k.
- Ne pas vérifier `info` après un appel LAPACK.
- Passer des tableaux non contigus en mémoire sans faire de copie.
- Oublier de linker les bibliothèques (`-llapack -lblas`).

## À retenir

- BLAS fournit les opérations de base (produits scalaire, matriciel).
- LAPACK résout les systèmes linéaires et les problèmes de valeurs propres.
- `dgemm` est l'opération matricielle fondamentale.
- `dgesv` résout `A * x = b` avec pivot de Gauss.
- Toujours linker avec `-llapack -lblas` ou utiliser OpenBLAS.
