# Tableaux

Ce module présente les tableaux en Fortran 95, de leur déclaration à leur manipulation avancée. Fortran 95 offre un support natif puissant pour les opérations vectorielles, les sections de tableaux, et les constructeurs.

## Déclaration de tableaux

Un tableau se déclare avec l'attribut `dimension` ou directement avec les parenthèses.

```fortran
program declaration
  implicit none
  integer, dimension(10) :: t1           ! tableau de 10 entiers
  real :: t2(5)                          ! tableau de 5 réels
  integer :: t3(0:9)                     ! indices de 0 à 9
  integer, dimension(3, 4) :: matrice    ! tableau 2D (3 lignes, 4 colonnes)

  t1(1) = 42
  write(*,*) "Premier élément :", t1(1)
end program declaration
```

## Indices et bornes

Par défaut, les indices commencent à 1. On peut spécifier des bornes personnalisées avec `début:fin`.

```fortran
program bornes
  implicit none
  integer :: t(-5:5)     ! indices de -5 à 5
  integer :: i

  do i = -5, 5
    t(i) = i * 10
  end do

  write(*,*) "t(-5) =", t(-5)
  write(*,*) "t(0) =", t(0)
  write(*,*) "t(5) =", t(5)
  write(*,*) "Taille :", size(t)
  write(*,*) "Borne inf :", lbound(t, 1)
  write(*,*) "Borne sup :", ubound(t, 1)
end program bornes
```

## Constructeurs de tableaux

On peut initialiser un tableau avec un constructeur `(/ /)` ou la syntaxe moderne `[ ]`.

```fortran
program constructeurs
  implicit none
  integer :: t1(5)
  integer :: t2(3, 2)
  integer :: i, j

  t1 = (/ 10, 20, 30, 40, 50 /)

  t2 = reshape( (/ 1, 2, 3, 4, 5, 6 /), (/ 3, 2 /) )

  do i = 1, 3
    do j = 1, 2
      write(*,*) "t2(", i, ",", j, ") =", t2(i, j)
    end do
  end do
end program constructeurs
```

## Sections de tableaux

Fortran permet d'extraire des sous-ensembles contigus d'un tableau avec la notation `(`début`:fin`:pas`)`.

```fortran
program sections
  implicit none
  integer :: t(10)
  integer :: i

  t = (/ (i*2, i = 1, 10) /)

  write(*,*) "t complet   :", t
  write(*,*) "t(3:7)      :", t(3:7)
  write(*,*) "t(1:10:2)   :", t(1:10:2)   ! pas de 2
  write(*,*) "t(10:1:-1)  :", t(10:1:-1)  ! ordre inverse
  write(*,*) "t(5)        :", t(5)         ! un seul élément
  write(*,*) "t(:5)       :", t(:5)        ! début implicite
  write(*,*) "t(6:)       :", t(6:)        ! fin implicite
end program sections
```

## Opérations vectorielles

Fortran 95 permet d'opérer sur des tableaux entiers sans boucle explicite.

```fortran
program vectoriel
  implicit none
  real :: a(5), b(5), c(5)
  integer :: i

  a = (/ 1.0, 2.0, 3.0, 4.0, 5.0 /)
  b = (/ 5.0, 4.0, 3.0, 2.0, 1.0 /)

  c = a + b
  write(*,*) "a + b :", c

  c = a * b
  write(*,*) "a * b :", c

  c = sqrt(a)
  write(*,*) "sqrt(a) :", c

  write(*,*) "Somme de a :", sum(a)
  write(*,*) "Moyenne de a :", sum(a) / size(a)
  write(*,*) "Max de a :", maxval(a)
  write(*,*) "Min de a :", minval(a)
end program vectoriel
```

## Tableaux à pas constant (`implied do`)

La boucle implicite (implied do) permet de générer des valeurs dans un constructeur.

```fortran
program implied_do
  implicit none
  integer :: t(10)
  integer :: i

  t = (/ (i**2, i = 1, 10) /)

  do i = 1, 10
    write(*,*) "t(", i, ") =", t(i)
  end do
end program implied_do
```

## La fonction `reshape`

`reshape` permet de redimensionner un tableau.

```fortran
program reshape_ex
  implicit none
  integer :: vec(6)
  integer :: mat(2, 3)
  integer :: i, j

  vec = (/ 1, 2, 3, 4, 5, 6 /)
  mat = reshape(vec, (/ 2, 3 /))

  do i = 1, 2
    do j = 1, 3
      write(*,*) "mat(", i, ",", j, ") =", mat(i, j)
    end do
  end do
end program reshape_ex
```

## À retenir

- Les tableaux se déclarent avec `dimension(n)` ou directement `taille(n)`.
- Les indices commencent à 1 par défaut.
- Les sections utilisent la notation `(début:fin:pas)`.
- Les opérations arithmétiques s'appliquent élément par élément sur des tableaux entiers.
- `sum`, `maxval`, `minval`, `size` sont des fonctions intrinsèques utiles.
- Les constructeurs utilisent `(/ /)` ou `[ ]`.

## Pièges courants

- **Indice hors bornes** : Fortran ne vérifie pas les bornes à l'exécution par défaut. Un indice invalide peut écraser la mémoire.
- **Forme incompatible** : `a + b` exige que `a` et `b` aient exactement la même forme (rang et taille).
- **Confondre `size` et `shape`** : `size(t)` retourne le nombre total d'éléments ; `shape(t)` retourne un tableau des dimensions.
- **Constructeur vide** : `(/ /)` n'est pas autorisé.
- **Indice négatif** : attention aux bornes personnalisées ; `t(-1)` est valide si déclaré avec `integer :: t(-5:5)`.
- **Sections contiguës** : les sections de tableau doivent être contiguës dans l'un des rangs. Pour des motifs plus complexes, utilisez une boucle.
