# Interface avec le langage C

L'interfaçage entre Fortran 95 et le langage C permet de combiner la puissance du calcul numérique de Fortran avec les bibliothèques système et les API écrites en C. Ce module explique comment utiliser le module `iso_c_binding` introduit dans Fortran 2003 mais largement supporté pour appeler du code C depuis Fortran 95.

## Le module `iso_c_binding`

Le module `iso_c_binding` fournit des types dérivés et des constantes pour assurer la compatibilité entre les types Fortran et C.

```fortran
use iso_c_binding
```

Il définit des types comme `c_int`, `c_float`, `c_double`, `c_char`, `c_ptr` et des fonctions comme `c_f_pointer` et `c_loc`.

## Correspondance des types

Les types doivent correspondre exactement entre les deux langages.

| Type C | Type Fortran (iso_c_binding) |
|--------|-----------------------------|
| `int` | `integer(c_int)` |
| `float` | `real(c_float)` |
| `double` | `real(c_double)` |
| `char` | `character(c_char)` |
| `void*` | `type(c_ptr)` |

## L'attribut `bind(c)`

L'attribut `bind(c)` indique au compilateur Fortran d'utiliser les conventions d'appel du C (passage par valeur, ordre des arguments, nommage).

```fortran
subroutine calculer(a, b, c) bind(c, name="calculer")
    use iso_c_binding
    implicit none
    real(c_double), intent(in), value :: a, b
    real(c_double), intent(out) :: c
    c = a + b
end subroutine calculer
```

## Passage par valeur avec `value`

En C, les arguments scalaires sont passés par valeur. L'attribut `value` force Fortran à passer la valeur plutôt qu'une référence.

```fortran
subroutine afficher_entier(n) bind(c, name="afficher_entier")
    use iso_c_binding
    implicit none
    integer(c_int), intent(in), value :: n
    print *, "Valeur reçue :", n
end subroutine afficher_entier
```

## Manipulation des pointeurs C

Le type `type(c_ptr)` représente un pointeur C. La fonction `c_f_pointer` convertit un pointeur C en un pointeur Fortran.

```fortran
subroutine traiter_tableau(ptr, n) bind(c)
    use iso_c_binding
    implicit none
    type(c_ptr), intent(in), value :: ptr
    integer(c_int), intent(in), value :: n
    integer(c_int), pointer :: tab(:)
    integer :: i

    call c_f_pointer(ptr, tab, [n])

    do i = 1, n
        tab(i) = tab(i) * 2
    end do
end subroutine traiter_tableau
```

## Appel de fonctions C depuis Fortran

On peut déclarer une interface pour une fonction C et l'appeler directement.

```fortran
program appel_c
    use iso_c_binding
    implicit none

    interface
        function sqrt_c(x) bind(c, name="sqrt")
            use iso_c_binding
            implicit none
            real(c_double), intent(in), value :: x
            real(c_double) :: sqrt_c
        end function sqrt_c
    end interface

    real(c_double) :: x

    x = 9.0_c_double
    print *, "sqrt(9.0) =", sqrt_c(x)
end program appel_c
```

## Chaînes de caractères

Les chaînes C terminées par `\0` diffèrent des chaînes Fortran à longueur fixe. La conversion nécessite un traitement explicite.

```fortran
function fortran_string_to_c(s) result(cs)
    use iso_c_binding
    implicit none
    character(len=*), intent(in) :: s
    character(kind=c_char), allocatable :: cs(:)
    integer :: i, n

    n = len_trim(s)
    allocate(cs(n + 1))
    do i = 1, n
        cs(i) = s(i:i)
    end do
    cs(n + 1) = c_null_char
end function fortran_string_to_c
```

## Pièges courants

- Oublier `use iso_c_binding` dans chaque sous-programme utilisant `bind(c)`.
- Confondre `c_f_pointer` (pointeur C vers Fortran) et `c_loc` (pointeur Fortran vers C).
- Ne pas utiliser `value` pour les scalaires passés depuis C.
- Oublier le terminateur `c_null_char` pour les chaînes C.
- Tableaux Fortran en column-major vs tableaux C en row-major : inversion des indices.

## À retenir

- `use iso_c_binding` standardise l'interfaçage Fortran/C.
- `bind(c)` applique les conventions d'appel C.
- `value` force le passage par valeur pour les scalaires.
- `type(c_ptr)` et `c_f_pointer` gèrent les pointeurs.
- La disposition mémoire (column-major vs row-major) doit être prise en compte.
