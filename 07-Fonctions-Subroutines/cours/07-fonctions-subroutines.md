# Fonctions et subroutines

Ce module couvre la création et l'utilisation de procédures en Fortran 95 : les fonctions et les subroutines. Les procédures permettent de structurer le code en blocs réutilisables, d'éviter la duplication, et d'organiser la logique du programme.

## Fonctions

Une fonction retourne une valeur unique. Elle se déclare avec `function nom(args) result(var)`.

```fortran
program test_fonction
  implicit none
  integer :: a, b, somme

  a = 10
  b = 25
  somme = addition(a, b)
  write(*,*) "Somme :", somme
end program test_fonction

function addition(x, y) result(res)
  implicit none
  integer, intent(in) :: x, y
  integer :: res

  res = x + y
end function addition
```

### Syntaxe alternative sans `result`

On peut aussi utiliser le nom de la fonction comme variable de retour.

```fortran
program test_carre
  implicit none
  real :: val

  val = carre(5.0)
  write(*,*) "Carré :", val
end program test_carre

real function carre(x)
  implicit none
  real, intent(in) :: x

  carre = x * x
end function carre
```

## Subroutines

Une subroutine ne retourne pas de valeur explicite. Elle modifie ses arguments via `intent(out)` ou `intent(inout)`.

```fortran
program test_subroutine
  implicit none
  integer :: a, b

  a = 7
  b = 3
  write(*,*) "Avant échange :", a, b
  call echange(a, b)
  write(*,*) "Après échange :", a, b
end program test_subroutine

subroutine echange(x, y)
  implicit none
  integer, intent(inout) :: x, y
  integer :: tmp

  tmp = x
  x = y
  y = tmp
end subroutine echange
```

## L'attribut `intent`

- `intent(in)` : l'argument est lu mais pas modifié.
- `intent(out)` : l'argument est écrit mais pas lu (il est indéfini à l'entrée).
- `intent(inout)` : l'argument est lu ET modifié (lecture/écriture).

```fortran
subroutine calcul(a, b, c, somme, produit)
  implicit none
  real, intent(in) :: a, b, c
  real, intent(out) :: somme, produit

  somme = a + b + c
  produit = a * b * c
end subroutine calcul
```

## Variables locales et `save`

Les variables déclarées dans une procédure sont locales et réinitialisées à chaque appel. L'attribut `save` conserve leur valeur entre les appels.

```fortran
program test_save
  implicit none
  integer :: i

  do i = 1, 5
    call compteur()
  end do
end program test_save

subroutine compteur()
  implicit none
  integer, save :: appel = 0

  appel = appel + 1
  write(*,*) "Appel numéro :", appel
end subroutine compteur
```

## Passage d'arguments

Par défaut, Fortran passe les arguments par référence. Les arguments typés avec `intent(in)` ne peuvent pas être modifiés dans la procédure.

```fortran
subroutine traiter(tab, n)
  implicit none
  integer, intent(inout) :: tab(*)
  integer, intent(in) :: n
  integer :: i

  do i = 1, n
    tab(i) = tab(i) * 2
  end do
end subroutine traiter
```

## Fonctions avec plusieurs résultats

On peut retourner plusieurs valeurs via les arguments `intent(out)`.

```fortran
program stats
  implicit none
  real :: a, b, c, moy, var

  a = 5.0
  b = 8.0
  c = 11.0
  call moyenne_variance(a, b, c, moy, var)
  write(*,*) "Moyenne :", moy
  write(*,*) "Variance :", var
end program stats

subroutine moyenne_variance(x, y, z, moy, var)
  implicit none
  real, intent(in) :: x, y, z
  real, intent(out) :: moy, var

  moy = (x + y + z) / 3.0
  var = ((x - moy)**2 + (y - moy)**2 + (z - moy)**2) / 3.0
end subroutine moyenne_variance
```

## À retenir

- `function` retourne une valeur ; `subroutine` ne retourne rien mais peut modifier ses arguments.
- Utilisez `intent(in)`, `intent(out)`, `intent(inout)` pour documenter et sécuriser le passage d'arguments.
- Les variables locales sont réinitialisées à chaque appel sauf avec `save`.
- On appelle une subroutine avec `call nom(args)`.
- La syntaxe `function foo(x) result(r)` est recommandée pour éviter les ambiguïtés.

## Pièges courants

- **Oublier `implicit none` dans la procédure** : chaque procédure doit avoir son propre `implicit none`.
- **Omettre `intent`** : sans `intent`, le compilateur n'empêche pas la modification accidentelle d'un argument d'entrée.
- **Confondre fonction et subroutine** : une fonction s'utilise dans une expression ; une subroutine s'appelle avec `call`.
- **Variable de retour non définie** : si la variable `result` n'est pas affectée, la fonction retourne une valeur indéfinie.
- **Arguments non typés** : en Fortran 95, les arguments des procédures externes doivent être typés dans la procédure. Les interfaces explicites (`interface`) sont fortement recommandées.
