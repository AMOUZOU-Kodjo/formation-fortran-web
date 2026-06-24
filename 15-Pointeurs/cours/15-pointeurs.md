# Pointeurs en Fortran 95

Les pointeurs en Fortran 95 sont des variables qui contiennent l'adresse mémoire d'une autre variable (la **cible**). Contrairement aux langages comme C, les pointeurs Fortran sont fortement typés et ne peuvent pointer que vers des variables compatibles.

## Déclaration d'un pointeur et d'une cible

L'attribut `pointer` déclare un pointeur ; l'attribut `target` déclare une cible.

```fortran
program premier_pointeur
  implicit none
  real, target :: valeur = 3.14
  real, pointer :: p

  p => valeur
  print *, p               ! affiche 3.14

  valeur = 2.71
  print *, p               ! affiche 2.71 (p suit la cible)

  p = 1.0
  print *, valeur           ! affiche 1.0 (modification via p)
end program premier_pointeur
```

## Association avec `=>`

L'opérateur `=>` associe un pointeur à une cible.

```fortran
integer, target :: a = 10
integer, pointer :: ptr

ptr => a
print *, ptr
```

## Test d'association avec `associated`

La fonction `associated` vérifie si un pointeur est associé à une cible, et optionnellement à une cible spécifique.

```fortran
program test_associated
  implicit none
  real, target :: x = 5.0
  real, pointer :: p, q

  nullify(p)
  if (.not. associated(p)) then
    print *, "p n'est associé à rien"
  end if

  p => x
  if (associated(p, x)) then
    print *, "p pointe bien vers x"
  end if

  q => x
  if (associated(p, q)) then
    print *, "p et q pointent vers la même cible"
  end if
end program test_associated
```

## Pointeur comme cible d'un autre pointeur

Un pointeur peut lui-même être cible d'un autre pointeur.

```fortran
real, target :: a = 1.0
real, pointer :: p1, p2

p1 => a
p2 => p1
print *, p2  ! affiche 1.0
```

## Pointeurs et tableaux

Un pointeur peut cibler un tableau entier ou une section de tableau.

```fortran
program pointeur_tableau
  implicit none
  real, target, dimension(10) :: t
  real, pointer, dimension(:) :: vue

  t = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
  vue => t(3:7)
  print *, vue  ! affiche 3.0 4.0 5.0 6.0 7.0

  vue => t(1:10:2)
  print *, vue  ! affiche 1.0 3.0 5.0 7.0 9.0
end program pointeur_tableau
```

## Pointeur sur un type dérivé

On peut déclarer un pointeur vers un type dérivé.

```fortran
type :: Noeud
  integer :: valeur
  type(Noeud), pointer :: suivant
end type Noeud

type(Noeud), target :: n1, n2
n1%valeur = 1
n2%valeur = 2
n1%suivant => n2
print *, n1%suivant%valeur  ! affiche 2
```

## Pointeurs et allocation dynamique

On peut allouer dynamiquement un pointeur avec `allocate`.

```fortran
program alloc_pointeur
  implicit none
  real, pointer :: p
  real, pointer, dimension(:) :: vec

  allocate(p)
  p = 42.0
  print *, p
  deallocate(p)

  allocate(vec(100))
  vec = 0.0
  deallocate(vec)
end program alloc_pointeur
```

## `nullify` pour dissocier

`nullify` détache un pointeur de sa cible sans désallouer.

```fortran
real, target :: x = 5.0
real, pointer :: p

p => x
nullify(p)
if (.not. associated(p)) print *, "p est nul"
```

## Pointeur en argument de procédure

Un pointeur peut être passé à une subroutine, généralement avec `intent(inout)`.

```fortran
module liste_module
  implicit none

  type :: Cellule
    integer :: donnee
    type(Cellule), pointer :: suivant
  end type Cellule

  contains

  subroutine ajouter_tete(tete, val)
    type(Cellule), pointer, intent(inout) :: tete
    integer, intent(in) :: val
    type(Cellule), pointer :: nouveau
    allocate(nouveau)
    nouveau%donnee = val
    nouveau%suivant => tete
    tete => nouveau
  end subroutine ajouter_tete

end module liste_module
```

## À retenir

- `pointer :: p` déclare un pointeur ; `target :: t` déclare une cible.
- `p => t` associe le pointeur à la cible.
- `associated(p)` teste l'association.
- `nullify(p)` dissocie sans désallouer.
- `allocate(p)` alloue un nouveau bloc mémoire pointé par `p`.
- Un pointeur peut cibler un tableau ou une section de tableau.

## Pièges courants

- **Pointeur non associé** : utiliser un pointeur avant de l'associer provoque une erreur. Toujours initialiser avec `nullify`.
- **Confondre `=>` et `=`** : `p => t` associe ; `p = t` copie la valeur (si `t` est cible) ou assigne.
- **Fuite mémoire** : un `allocate` sur un pointeur sans `deallocate` crée une fuite.
- **Pointeur sur une variable qui sort de portée** : si la cible est une variable locale qui n'existe plus, le pointeur devient pendant.
- **Passage de pointeur à une procédure sans interface explicite** : les pointeurs nécessitent une interface explicite pour être passés correctement.
