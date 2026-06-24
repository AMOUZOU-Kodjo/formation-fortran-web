# Récursivité en Fortran 95

Fortran 95 supporte la récursivité, c'est-à-dire la capacité d'une procédure à s'appeler elle-même. Cela permet d'écrire des solutions élégantes à des problèmes qui ont une structure naturellement récursive, comme les arbres, les fractales ou certains algorithmes mathématiques.

## Fonction récursive avec `result`

Une fonction récursive doit être précédée du mot-clé `recursive` et utiliser `result` pour nommer la valeur de retour.

```fortran
program test_factorielle
  implicit none

  recursive function factorielle(n) result(res)
    integer, intent(in) :: n
    integer :: res
    if (n <= 1) then
      res = 1
    else
      res = n * factorielle(n - 1)
    end if
  end function factorielle

  print *, factorielle(5)  ! affiche 120
end program test_factorielle
```

## Subroutine récursive

Une subroutine peut aussi être récursive.

```fortran
program test_affichage
  implicit none

  recursive subroutine affiche_compte(n)
    integer, intent(in) :: n
    if (n > 0) then
      call affiche_compte(n - 1)
      print *, n
    end if
  end subroutine affiche_compte

  call affiche_compte(5)
end program test_affichage
```

## Récursivité dans un module

Les procédures récursives peuvent être définies dans un module.

```fortran
module recursif_module
  implicit none
  contains

  recursive function fibonacci(n) result(fib)
    integer, intent(in) :: n
    integer :: fib
    if (n <= 1) then
      fib = n
    else
      fib = fibonacci(n - 1) + fibonacci(n - 2)
    end if
  end function fibonacci

  recursive subroutine hanoi(n, depart, inter, arrivee)
    integer, intent(in) :: n
    character, intent(in) :: depart, inter, arrivee
    if (n == 1) then
      print *, "Déplacer disque 1 de", depart, "vers", arrivee
    else
      call hanoi(n - 1, depart, arrivee, inter)
      print *, "Déplacer disque", n, "de", depart, "vers", arrivee
      call hanoi(n - 1, inter, depart, arrivee)
    end if
  end subroutine hanoi

end module recursif_module

program test_module
  use recursif_module
  implicit none
  print *, "Fibonacci(10) =", fibonacci(10)
  call hanoi(3, 'A', 'B', 'C')
end program test_module
```

## Parcours récursif avec types dérivés

La récursivité est très utile pour parcourir des structures de données comme les listes chaînées ou les arbres.

```fortran
module arbre_module
  implicit none

  type :: Noeud
    integer :: valeur
    type(Noeud), pointer :: gauche, droite
  end type Noeud

  contains

  recursive subroutine inserer(racine, val)
    type(Noeud), pointer, intent(inout) :: racine
    integer, intent(in) :: val
    if (.not. associated(racine)) then
      allocate(racine)
      racine%valeur = val
      nullify(racine%gauche)
      nullify(racine%droite)
    else if (val < racine%valeur) then
      call inserer(racine%gauche, val)
    else
      call inserer(racine%droite, val)
    end if
  end subroutine inserer

  recursive subroutine parcourir(racine)
    type(Noeud), pointer, intent(in) :: racine
    if (associated(racine)) then
      call parcourir(racine%gauche)
      print *, racine%valeur
      call parcourir(racine%droite)
    end if
  end subroutine parcourir

  recursive subroutine liberer(racine)
    type(Noeud), pointer, intent(inout) :: racine
    if (associated(racine)) then
      call liberer(racine%gauche)
      call liberer(racine%droite)
      deallocate(racine)
      nullify(racine)
    end if
  end subroutine liberer

end module arbre_module

program test_arbre
  use arbre_module
  implicit none
  type(Noeud), pointer :: racine => null()

  call inserer(racine, 5)
  call inserer(racine, 3)
  call inserer(racine, 7)
  call inserer(racine, 2)
  call inserer(racine, 4)

  print *, "Parcours infixe :"
  call parcourir(racine)

  call liberer(racine)
end program test_arbre
```

## Algorithme de tri rapide (quicksort)

Le tri rapide est un exemple classique d'algorithme récursif.

```fortran
module tri_module
  implicit none
  contains

  recursive subroutine quicksort(t, debut, fin)
    real, dimension(:), intent(inout) :: t
    integer, intent(in) :: debut, fin
    integer :: pivot, i, j
    real :: temp

    if (debut < fin) then
      pivot = fin
      i = debut
      do j = debut, fin - 1
        if (t(j) < t(pivot)) then
          temp = t(i)
          t(i) = t(j)
          t(j) = temp
          i = i + 1
        end if
      end do
      temp = t(i)
      t(i) = t(pivot)
      t(pivot) = temp
      pivot = i

      call quicksort(t, debut, pivot - 1)
      call quicksort(t, pivot + 1, fin)
    end if
  end subroutine quicksort

end module tri_module

program test_tri
  use tri_module
  implicit none
  real, dimension(8) :: donnees
  integer :: i

  donnees = [3.0, 7.0, 2.0, 9.0, 1.0, 6.0, 4.0, 8.0]
  call quicksort(donnees, 1, 8)
  print *, donnees
end program test_tri
```

## Limiter la profondeur de récursion

La pile d'appels a une taille limitée. Pour les grandes profondeurs, une solution itérative est préférable.

```fortran
recursive function somme_recursive(n) result(s)
  integer, intent(in) :: n
  integer :: s
  if (n <= 1) then
    s = n
  else
    s = n + somme_recursive(n - 1)
  end if
end function somme_recursive

! Équivalent itératif (préféré pour les grandes valeurs)
function somme_iterative(n) result(s)
  integer, intent(in) :: n
  integer :: s, i
  s = 0
  do i = 1, n
    s = s + i
  end do
end function somme_iterative
```

## À retenir

- `recursive function` déclare une fonction récursive.
- `result` est obligatoire pour nommer la valeur de retour.
- Une subroutine récursive s'écrit avec `recursive subroutine`.
- La récursivité est idéale pour les arbres, listes, fractales, et algorithmes diviser-pour-régner.
- Chaque appel récursif consomme de la pile ; une profondeur excessive provoque un débordement.
- La récursivité terminale (appel récursif en dernière instruction) n'est pas optimisée en Fortran 95.

## Pièges courants

- **Oublier `recursive`** : une fonction sans `recursive` ne peut pas s'appeler elle-même ; le compilateur refusera l'appel.
- **Oublier `result`** : une fonction récursive doit utiliser `result` pour éviter l'ambiguïté sur le nom de la fonction.
- **Absence de condition d'arrêt** : sans cas de base, la récursion est infinie et provoque un débordement de pile (stack overflow).
- **Profondeur excessive** : la pile est limitée ; pour des profondeurs > 10 000, préférer une version itérative.
- **Modifier des variables partagées** : dans une procédure récursive, les variables locales sont propres à chaque appel ; les variables de module sont partagées et peuvent causer des effets de bord.
- **Ne pas libérer la mémoire** : dans les structures récursives allouées dynamiquement (arbres), chaque désallocation récursive est nécessaire pour éviter les fuites.
