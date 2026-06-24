# Bibliothèque intrinsèque de Fortran 95

Fortran 95 fournit un riche ensemble de fonctions intrinsèques couvrant les mathématiques, les chaînes de caractères, les tableaux et la manipulation de bits. Ces fonctions sont disponibles sans aucune déclaration préalable et sont optimisées par le compilateur.

## Fonctions mathématiques

Les fonctions mathématiques de base opèrent sur des `real` ou `integer`.

```fortran
program maths
  implicit none
  real :: x = 2.0, y

  y = sqrt(x)       ! racine carrée : sqrt(2.0) = 1.414...
  y = sin(x)        ! sinus (radians)
  y = cos(x)        ! cosinus (radians)
  y = tan(x)        ! tangente (radians)
  y = asin(0.5)     ! arc sinus
  y = acos(0.5)     ! arc cosinus
  y = atan(1.0)     ! arc tangente
  y = atan2(1.0, 1.0) ! arc tangente (y, x)
  y = exp(x)        ! exponentielle e^x
  y = log(x)        ! logarithme népérien
  y = log10(x)      ! logarithme décimal
  y = abs(-3.0)     ! valeur absolue
  y = mod(10, 3)    ! reste de la division : 1
  y = modulo(10, 3) ! modulo (toujours positif)
  y = sign(5.0, -2.0) ! transfert de signe : -5.0
  y = max(3.0, 7.0) ! maximum
  y = min(3.0, 7.0) ! minimum
end program maths
```

## Fonctions sur les chaînes de caractères

Les types `character` bénéficient de fonctions dédiées.

```fortran
program chaines
  implicit none
  character(len=30) :: texte = "  Bonjour le monde  "
  character(len=10) :: s1 = "abc", s2 = "ABC"

  print *, len(texte)           ! longueur déclarée : 30
  print *, len_trim(texte)      ! longueur sans espaces de fin
  print *, trim(texte)          ! chaîne sans espaces de fin
  print *, adjustl(texte)       ! ajuste à gauche
  print *, adjustr(texte)       ! ajuste à droite
  print *, index(texte, "monde") ! position de "monde" (0 si absent)
  print *, "bon" // "jour"      ! concaténation
  print *, repeat("ab", 3)      ! répétition : "ababab"
  print *, ichar('A')           ! code ASCII : 65
  print *, char(65)             ! caractère depuis code ASCII
  print *, lge(s1, s2)          ! >= lexical
  print *, lgt(s1, s2)          ! > lexical
  print *, lle(s1, s2)          ! <= lexical
  print *, llt(s1, s2)          ! < lexical
end program chaines
```

## Fonctions sur les tableaux

Ces fonctions opèrent sur des tableaux entiers sans boucle explicite.

```fortran
program operations_tableaux
  implicit none
  real, dimension(5) :: data = [3.0, 7.0, 2.0, 9.0, 5.0]
  integer, dimension(3, 4) :: mat

  print *, size(data)           ! nombre d'éléments : 5
  print *, size(mat, dim=1)     ! taille dimension 1 : 3
  print *, size(mat, dim=2)     ! taille dimension 2 : 4
  print *, shape(mat)           ! forme : [3, 4]
  print *, maxval(data)         ! valeur max : 9.0
  print *, minval(data)         ! valeur min : 2.0
  print *, sum(data)            ! somme : 26.0
  print *, product(data)        ! produit : 1890.0
  print *, maxloc(data)         ! indice du max : 4
  print *, minloc(data)         ! indice du min : 3
  print *, sum(data) / size(data) ! moyenne
end program operations_tableaux
```

## Fonctions de manipulation de tableaux

```fortran
program manipulation
  implicit none
  real, dimension(4) :: v = [1.0, 2.0, 3.0, 4.0]
  real, dimension(2, 3) :: a, b

  print *, dot_product(v, v)    ! produit scalaire : 30.0
  print *, matmul(a, b)         ! produit matriciel

  a = reshape([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape(a))
  print *, transpose(a)         ! transposée

  print *, lbound(v)            ! borne inférieure : 1
  print *, ubound(v)            ! borne supérieure : 4
  print *, allocated(v)         ! test d'allocation (.false.)
  print *, merge(1.0, 0.0, v > 2.0) ! masque : [0,0,1,1]
  print *, pack(v, v > 2.0)     ! compacte sous masque : [3,4]
end program manipulation
```

## Fonctions de conversion

```fortran
program conversions
  implicit none
  integer :: i = 42
  real :: r = 3.14
  complex :: c = (1.0, 2.0)

  print *, real(c)              ! partie réelle : 1.0
  print *, aimag(c)             ! partie imaginaire : 2.0
  print *, int(r)               ! troncature : 3
  print *, nint(r)              ! arrondi : 3
  print *, real(i)              ! conversion en réel : 42.0
  print *, cmplx(i, 1)          ! création complexe : (42,1)
end program conversions
```

## Fonctions de sélection et de tri

```fortran
program selection
  implicit none
  real, dimension(5) :: t = [3.0, 1.0, 4.0, 1.0, 5.0]

  print *, maxval(t, mask=t < 4.0)  ! max des éléments < 4 : 3
  print *, sum(t, mask=t > 2.0)     ! somme des éléments > 2 : 12
  print *, count(t > 2.0)           ! nombre d'éléments > 2 : 3
  print *, any(t > 4.0)             ! un élément > 4 ? : T
  print *, all(t > 0.0)             ! tous > 0 ? : T
end program selection
```

## À retenir

- Les fonctions intrinsèques sont toujours disponibles, sans module à importer.
- Les principales catégories sont : mathématiques, chaînes, tableaux, conversion, sélection.
- `sqrt`, `sin`, `cos`, `abs`, `mod` sont les bases mathématiques.
- `len`, `trim`, `index` manipulent les chaînes.
- `maxval`, `minval`, `sum`, `product` opèrent sur les tableaux.
- `size`, `shape`, `lbound`, `ubound` donnent les métadonnées d'un tableau.
- `matmul` et `dot_product` font le calcul matriciel.
- `merge`, `pack`, `count`, `any`, `all` travaillent avec des masques logiques.

## Pièges courants

- **Angles en radians** : `sin`, `cos`, `tan` attendent des radians, pas des degrés.
- **`mod` versus `modulo`** : `mod` suit le signe du dividende ; `modulo` retourne toujours un résultat non négatif.
- **`len` vs `len_trim`** : `len` retourne la longueur déclarée ; `len_trim` ignore les espaces de fin.
- **Indices de tableau** : `maxloc` et `minloc` retournent un tableau d'indices, pas un scalaire.
- **Dimensions de `matmul`** : les dimensions des matrices doivent être compatibles (n x m fois m x p).
- **Résultat de `real` avec un entier** : `real(3)` retourne `3.0` mais `real(3, kind=8)` permet de choisir la précision.
