# Manipulations avancées des tableaux en Fortran 95

Fortran 95 offre des constructions puissantes pour manipuler les tableaux de manière expressive et concise. Les instructions `where` et `forall`, ainsi que les opérations vectorielles natives, permettent d'écrire du code sans boucles explicites.

## Opérations vectorielles

Fortran 95 permet d'opérer directement sur des tableaux entiers.

```fortran
program vectoriel
  implicit none
  real, dimension(5) :: a, b, c

  a = [1.0, 2.0, 3.0, 4.0, 5.0]
  b = [5.0, 4.0, 3.0, 2.0, 1.0]

  c = a + b         ! addition élément par élément
  c = a * b         ! multiplication élément par élément
  c = sqrt(a)       ! fonction intrinsèque vectorisée
  c = a ** 2        ! puissance vectorisée

  print *, c
end program vectoriel
```

## La construction `where`

`where` applique une opération uniquement aux éléments vérifiant une condition logique. Elle agit comme un masque.

```fortran
program ex_where
  implicit none
  real, dimension(6) :: donnees
  integer :: i

  donnees = [1.0, -2.0, 3.0, -4.0, 5.0, -6.0]

  where (donnees < 0.0)
    donnees = 0.0
  end where

  print *, donnees  ! [1.0, 0.0, 3.0, 0.0, 5.0, 0.0]
end program ex_where
```

## `where` ... `elsewhere`

On peut chaîner plusieurs blocs conditionnels avec `elsewhere`.

```fortran
program note_mention
  implicit none
  real, dimension(8) :: notes
  character(len=10), dimension(8) :: mentions
  integer :: i

  notes = [12.5, 8.0, 15.0, 6.5, 18.0, 10.0, 14.0, 9.5]

  where (notes >= 16.0)
    mentions = "TB"
  elsewhere (notes >= 14.0)
    mentions = "B"
  elsewhere (notes >= 12.0)
    mentions = "AB"
  elsewhere (notes >= 10.0)
    mentions = "Passable"
  elsewhere
    mentions = "Insuff."
  end where

  do i = 1, 8
    print *, notes(i), mentions(i)
  end do
end program note_mention
```

## `where` imbriqués et avec `elsewhere`

On peut aussi combiner des conditions avec des opérateurs logiques.

```fortran
where (donnees > 0.0 .and. donnees < 1.0)
  donnees = 1.0
elsewhere (donnees <= 0.0)
  donnees = -1.0
elsewhere
  donnees = 0.0
end where
```

## La construction `forall`

`forall` permet d'effectuer des affectations parallèles sur des sections de tableau avec des indices calculés.

```fortran
program ex_forall
  implicit none
  real, dimension(4, 4) :: A
  integer :: i, j

  forall (i = 1:4, j = 1:4)
    A(i, j) = real(i * j)
  end forall

  print *, A
end program ex_forall
```

## `forall` avec condition

On peut ajouter un masque pour ne traiter que certains indices.

```fortran
program forall_mask
  implicit none
  real, dimension(5, 5) :: M
  integer :: i, j

  M = 0.0
  forall (i = 1:5, j = 1:5, i /= j)
    M(i, j) = 1.0
  end forall

  print *, M  ! matrice avec 0 sur la diagonale, 1 ailleurs
end program forall_mask
```

## Expressions de tableau (tableau constructeur)

Fortran 95 permet de construire des tableaux de façon implicite.

```fortran
program constructeurs
  implicit none
  real, dimension(10) :: t

  ! constructeur de tableau implicite
  t = [ (real(i**2), i = 1, 10) ]
  print *, t

  ! initialisation uniforme
  t = 0.0

  ! sections de tableau
  t(1:5) = 1.0
  t(6:10) = 2.0
end program constructeurs
```

## Opérations matricielles

```fortran
program calcul_matriciel
  implicit none
  real, dimension(3, 3) :: A, B, C
  real, dimension(3) :: v, w
  integer :: i, j

  A = reshape([(real(i*j), i = 1, 3), j = 1, 3], shape(A))
  B = transpose(A)
  C = matmul(A, B)         ! produit matriciel
  v = [1.0, 2.0, 3.0]
  w = matmul(A, v)         ! produit matrice-vecteur

  print *, "Trace :", sum([(A(i,i), i=1,3)])
  print *, "Déterminant :", A(1,1)*A(2,2)*A(3,3) + &
                             A(1,2)*A(2,3)*A(3,1) + &
                             A(1,3)*A(2,1)*A(3,2) - &
                             A(1,3)*A(2,2)*A(3,1) - &
                             A(1,2)*A(2,1)*A(3,3) - &
                             A(1,1)*A(2,3)*A(3,2)
end program calcul_matriciel
```

## Tableaux et masques avec `pack` et `unpack`

`pack` compacte un tableau selon un masque ; `unpack` fait l'opération inverse.

```fortran
program pack_unpack
  implicit none
  real, dimension(5) :: t, t2
  real, allocatable, dimension(:) :: positifs
  logical, dimension(5) :: masque
  integer :: i

  t = [3.0, -1.0, 4.0, -1.0, 5.0]

  positifs = pack(t, t > 0.0)
  print *, positifs  ! [3.0, 4.0, 5.0]

  masque = t > 0.0
  t2 = unpack(positifs, masque, 0.0)
  print *, t2  ! [3.0, 0.0, 4.0, 0.0, 5.0]
end program pack_unpack
```

## À retenir

- Les opérations vectorielles s'appliquent élément par élément.
- `where ... end where` applique une opération conditionnelle sur les éléments.
- `forall (i=1:n) ... end forall` permet des affectations parallèles par indice.
- `pack` et `unpack` filtrent et reconstruisent des tableaux.
- `matmul` effectue le produit matriciel.
- Les constructeurs `[(expr, i=1,n)]` génèrent des tableaux à la volée.
- Les sections de tableau `t(1:5:2)` sont des vues sans copie.

## Pièges courants

- **`where` imbriqué** : `where` ne s'imbrique pas directement ; utiliser `elsewhere` et des opérateurs logiques.
- **`forall` n'est pas une boucle** : `forall` est une affectation parallèle ; les expressions ne doivent pas dépendre de l'ordre d'exécution.
- **Confondre `where` et `forall`** : `where` masque des éléments ; `forall` masque des indices.
- **Modifier un tableau dans `forall`** : on ne peut pas modifier la même variable dans plusieurs affectations du même `forall`.
- **Sections de tableau contiguës** : une section comme `t(1:10:2)` crée une vue non contiguë ; certaines opérations peuvent être moins efficaces.
- **Opérations vectorielles avec des tableaux de formes différentes** : les tableaux doivent être conformables (même forme) pour les opérations binaires.
