# Boucles et itérations

Ce module présente les structures de répétition en Fortran 95 : la boucle `do`, la boucle `do while`, et la boucle `do` avec `exit` et `cycle`. Les boucles permettent d'exécuter un bloc d'instructions plusieurs fois.

## La boucle `do` avec compteur

La forme la plus courante utilise un indice qui s'incrémente automatiquement.

```fortran
program do_compteur
  implicit none
  integer :: i

  do i = 1, 5
    write(*,*) "Itération", i
  end do
end program do_compteur
```

Le pas peut être modifié avec l'option `step` (mot-clé optionnel).

```fortran
program do_pas
  implicit none
  integer :: i

  ! De 1 à 10 avec un pas de 2
  do i = 1, 10, 2
    write(*,*) i
  end do
end program do_pas
```

On peut également compter à rebours.

```fortran
program do_descendant
  implicit none
  integer :: i

  do i = 10, 1, -1
    write(*,*) i
  end do
end program do_descendant
```

## La boucle `do while`

La boucle `do while` répète un bloc tant qu'une condition logique est vraie. La condition est testée avant chaque itération.

```fortran
program do_while
  implicit none
  integer :: n, somme

  n = 1
  somme = 0
  do while (somme < 100)
    somme = somme + n
    n = n + 1
  end do

  write(*,*) "Somme =", somme
  write(*,*) "n =", n
end program do_while
```

## Contrôle avancé : `exit` et `cycle`

- `exit` : sort immédiatement de la boucle.
- `cycle` : passe à l'itération suivante sans exécuter le reste du corps.

```fortran
program exit_cycle
  implicit none
  integer :: i

  do i = 1, 10
    if (i == 3) cycle          ! saute i=3
    if (i == 8) exit           ! sort à i=8
    write(*,*) i
  end do
end program exit_cycle
```

## Boucle infinie avec `exit`

On peut créer une boucle « infinie » et en sortir avec `exit`.

```fortran
program boucle_infinie
  implicit none
  integer :: n
  real :: x

  x = 1.0
  n = 0
  do
    x = x * 2.0
    n = n + 1
    if (x > 1000.0) exit
  end do

  write(*,*) "2**", n, "=", x
end program boucle_infinie
```

## Boucles imbriquées

Les boucles peuvent être imbriquées. On peut nommer les boucles pour utiliser `exit` ou `cycle` sur une boucle précise.

```fortran
program imbrique_nomme
  implicit none
  integer :: i, j

  externe : do i = 1, 4
    interne : do j = 1, 3
      if (i == 2 .and. j == 2) cycle externe
      write(*,*) "i =", i, "j =", j
    end do interne
  end do externe
end program imbrique_nomme
```

## Accumulation dans une boucle

Un usage classique est le calcul de sommes et de produits.

```fortran
program accumulation
  implicit none
  integer :: i, somme, factorielle

  somme = 0
  do i = 1, 100
    somme = somme + i
  end do
  write(*,*) "Somme 1..100 =", somme

  factorielle = 1
  do i = 1, 10
    factorielle = factorielle * i
  end do
  write(*,*) "10! =", factorielle
end program accumulation
```

## À retenir

- La boucle `do i = début, fin, pas` est la structure itérative principale.
- `do while` répète tant qu'une condition est vraie.
- `exit` sort de la boucle, `cycle` passe à l'itération suivante.
- Les boucles peuvent être nommées avec un label `nom : do ... end do nom`.
- L'indice de boucle ne doit pas être modifié manuellement dans le corps.

## Pièges courants

- **Modifier l'indice de boucle** : ne jamais écrire `i = i + 1` dans une boucle `do i=1,n`.
- **Dépassement de boucle** : une boucle `do i = 1, 0` ne s'exécute pas (zéro itérations).
- **Boucle infinie involontaire** : oublier de mettre à jour la condition dans un `do while`.
- **`exit` au mauvais endroit** : `exit` ne fonctionne que dans une boucle, pas dans un `if` seul.
- **Nom de boucle mal référencé** : `exit nom_boucle` doit correspondre au label de la boucle englobante.
- **Pas nul** : `do i = 1, 10, 0` provoque une erreur d'exécution.
