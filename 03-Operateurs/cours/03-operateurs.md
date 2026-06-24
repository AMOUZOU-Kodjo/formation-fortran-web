# Opérateurs et expressions

Ce module présente les opérateurs disponibles en Fortran 95 : arithmétiques, relationnels, logiques, et la manipulation de chaînes de caractères. Vous apprendrez à construire des expressions et à maîtriser les règles de priorité.

## Opérateurs arithmétiques

Fortran 95 fournit cinq opérateurs arithmétiques de base, auxquels s'ajoute l'exponentiation.

| Opérateur | Opération        | Exemple  |
|-----------|------------------|----------|
| `+`       | Addition         | `a + b`  |
| `-`       | Soustraction     | `a - b`  |
| `*`       | Multiplication   | `a * b`  |
| `/`       | Division         | `a / b`  |
| `**`      | Exponentiation   | `a ** b` |

```fortran
program arithmetique
  implicit none
  integer :: a, b
  real :: x, y

  a = 10
  b = 3
  x = 10.0
  y = 3.0

  write(*,*) "Addition :", a + b
  write(*,*) "Soustraction :", a - b
  write(*,*) "Multiplication :", a * b
  write(*,*) "Division entière :", a / b
  write(*,*) "Division réelle :", x / y
  write(*,*) "Exponentiation :", a ** b
  write(*,*) "Racine (10**0.5) :", 10.0 ** 0.5
end program arithmetique
```

## Priorité des opérateurs

La priorité, de la plus haute à la plus basse, est :

1. `**` (exponentiation)
2. `*` et `/` (multiplication et division)
3. `+` et `-` (addition et soustraction)

Les parenthèses `( )` permettent de modifier l'ordre d'évaluation.

```fortran
program priorite
  implicit none
  integer :: r

  r = 2 + 3 * 4    ! 2 + 12 = 14
  write(*,*) "2 + 3 * 4 =", r

  r = (2 + 3) * 4  ! 5 * 4 = 20
  write(*,*) "(2 + 3) * 4 =", r

  r = 10 / 2 * 3   ! 5 * 3 = 15 (associativité gauche)
  write(*,*) "10 / 2 * 3 =", r

  r = 10 / (2 * 3) ! 10 / 6 = 1 (division entière)
  write(*,*) "10 / (2 * 3) =", r
end program priorite
```

## Opérateurs relationnels

Ils comparent deux expressions et retournent une valeur `logical` (`.true.` ou `.false.`).

| Opérateur | Forme ancienne | Signification    |
|-----------|----------------|------------------|
| `==`      | `.eq.`         | Égal à           |
| `/=`      | `.ne.`         | Différent de     |
| `>`       | `.gt.`         | Supérieur à      |
| `<`       | `.lt.`         | Inférieur à      |
| `>=`      | `.ge.`         | Supérieur ou égal|
| `<=`      | `.le.`         | Inférieur ou égal|

```fortran
program relationnel
  implicit none
  integer :: a = 5, b = 8

  write(*,*) "a == b :", a == b
  write(*,*) "a /= b :", a /= b
  write(*,*) "a > b  :", a > b
  write(*,*) "a < b  :", a < b
  write(*,*) "a >= b :", a >= b
  write(*,*) "a <= b :", a <= b
end program relationnel
```

## Opérateurs logiques

Ils combinent des expressions `logical`.

| Opérateur | Signification     |
|-----------|-------------------|
| `.and.`   | ET logique        |
| `.or.`    | OU logique        |
| `.not.`   | Négation logique  |
| `.eqv.`   | Équivalence logique |
| `.neqv.`  | Non-équivalence   |

```fortran
program logique
  implicit none
  logical :: a, b

  a = .true.
  b = .false.

  write(*,*) "a .and. b :", a .and. b
  write(*,*) "a .or. b  :", a .or. b
  write(*,*) ".not. a   :", .not. a
  write(*,*) "a .eqv. b :", a .eqv. b
  write(*,*) "a .neqv. b:", a .neqv. b

  ! Combinaison
  write(*,*) "(a .and. b) .or. (.not. b) :", (a .and. b) .or. (.not. b)
end program logique
```

## Opérateurs sur les chaînes

Fortran 95 offre l'opérateur de concaténation `//` et des sous-chaînes avec la notation `(début:fin)`.

```fortran
program chaines
  implicit none
  character(len=20) :: prenom, nom
  character(len=40) :: complet

  prenom = "Jean"
  nom = "Dupont"
  complet = prenom // " " // nom

  write(*,*) complet
  write(*,*) "Première lettre :", complet(1:1)
  write(*,*) "Les 4 premières :", complet(1:4)
end program chaines
```

## À retenir

- `**` est l'exponentiation (unique parmi les langages courants).
- La division de deux entiers produit un résultat entier (troncature).
- Les opérateurs relationnels modernes sont `==`, `/=`, `<`, `>`, `<=`, `>=`.
- Les opérateurs logiques s'écrivent avec des points : `.and.`, `.or.`, `.not.`.
- La concaténation de chaînes utilise `//`.

## Pièges courants

- **Division entière** : `3 / 2` donne `1` et non `1.5`. Pour une division réelle, utilisez `3.0 / 2.0`.
- **Priorité mélangée** : `a / b * c` est évalué comme `(a / b) * c` et non `a / (b * c)`.
- **Opérateurs anciens** : `.eq.`, `.ne.`, `.gt.` etc. sont obsolètes en Fortran 95. Préférez `==`, `/=`, `>`.
- **Exposant négatif avec entier** : `2 ** (-1)` est interdit. Utilisez `2.0 ** (-1)`.
- **Points logiques manquants** : oublier les points dans `.true.` et `.false.` provoque une erreur de compilation.
