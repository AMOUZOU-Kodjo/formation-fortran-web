# Contrôle de flux

Ce module couvre les structures conditionnelles en Fortran 95 : la construction `if`, le `select case`, et l'opérateur `where` pour les tableaux. Ces structures permettent d'exécuter différents blocs de code selon des conditions logiques.

## La structure `if`

La forme la plus simple est `if (condition) then ... end if`. La condition doit être une expression logique.

### `if` simple

```fortran
program if_simple
  implicit none
  integer :: note

  note = 15
  if (note >= 10) then
    write(*,*) "Admis"
  end if
end program if_simple
```

### `if ... else`

```fortran
program if_else
  implicit none
  integer :: note

  note = 8
  if (note >= 10) then
    write(*,*) "Admis"
  else
    write(*,*) "Échec"
  end if
end program if_else
```

### `if ... else if ... else`

Les conditions multiples s'enchaînent avec `else if`.

```fortran
program if_elseif
  implicit none
  integer :: note

  note = 12
  if (note >= 16) then
    write(*,*) "Très bien"
  else if (note >= 14) then
    write(*,*) "Bien"
  else if (note >= 10) then
    write(*,*) "Passable"
  else
    write(*,*) "Insuffisant"
  end if
end program if_elseif
```

### `if` sur une ligne

Pour une instruction unique, la forme condensée `if (condition) action` est autorisée.

```fortran
program if_ligne
  implicit none
  integer :: x

  x = -5
  if (x < 0) x = -x
  write(*,*) "Valeur absolue :", x
end program if_ligne
```

### `if` imbriqués

Les `if` peuvent s'emboîter les uns dans les autres.

```fortran
program imbrique
  implicit none
  integer :: age
  logical :: inscrit

  age = 20
  inscrit = .true.

  if (age >= 18) then
    if (inscrit) then
      write(*,*) "Vous pouvez voter"
    else
      write(*,*) "Inscrivez-vous d'abord"
    end if
  else
    write(*,*) "Vous êtes mineur"
  end if
end program imbrique
```

## La structure `select case`

`select case` est une alternative élégante à de multiples `else if` lorsqu'on teste une seule expression entière, caractère ou logique.

```fortran
program select_case
  implicit none
  integer :: mois

  mois = 4
  select case (mois)
    case (1)
      write(*,*) "Janvier"
    case (2)
      write(*,*) "Février"
    case (3, 4, 5)
      write(*,*) "Printemps"
    case (6:9)
      write(*,*) "Été"
    case (10:12)
      write(*,*) "Automne/Hiver"
    case default
      write(*,*) "Mois invalide"
  end select
end program select_case
```

Les plages sont spécifiées avec `:` (ex. `6:9`). Plusieurs valeurs sont séparées par des virgules.

## L'opérateur `where` pour tableaux

`where` permet d'appliquer une opération conditionnelle sur un tableau.

```fortran
program where_exemple
  implicit none
  real, dimension(5) :: notes
  integer :: i

  notes = (/ 12.0, 8.5, 15.0, 4.0, 18.0 /)
  where (notes >= 10)
    notes = notes + 1.0  ! bonus pour les admis
  elsewhere
    notes = notes + 2.0  ! plus de bonus pour les échecs
  end where

  do i = 1, 5
    write(*,*) "Note", i, ":", notes(i)
  end do
end program where_exemple
```

## À retenir

- `if (condition) then ... end if` est la structure de base.
- `else if` permet d'enchaîner plusieurs conditions.
- `select case` est plus lisible que de multiples `else if` pour une variable discrète.
- `where` applique des opérations conditionnelles sur des tableaux entiers.
- Les conditions sont toujours des expressions `logical`.

## Pièges courants

- **Oublier `then`** : `if (x > 0)` sans `then` sur une ligne multiple provoque une erreur.
- **Point-virgule manquant** : il n'y a JAMAIS de point-virgule en Fortran.
- **`=` au lieu de `==`** : dans un `if`, `if (x = 5)` est une affectation, pas une comparaison. Le compilateur refusera car `x = 5` n'est pas une expression logique.
- **`select case` avec des réels** : `select case` ne fonctionne qu'avec `integer`, `character`, ou `logical`. Pas avec `real`.
- **Condition non logique** : `if (x)` est valide en C mais pas en Fortran. Il faut écrire `if (x /= 0)`.
