# Entrées et sorties

Ce module couvre les opérations d'entrée/sortie (E/S) en Fortran 95 : l'affichage à l'écran, la lecture au clavier, et le formatage des données. Les E/S sont essentielles pour interagir avec l'utilisateur et produire des résultats lisibles.

## Les instructions `write` et `read` de base

La forme la plus simple utilise `write(*,*)` pour l'affichage et `read(*,*)` pour la lecture. Le premier astérisque désigne l'unité (écran/clavier), le second désigne le format (automatique).

```fortran
program io_simple
  implicit none
  integer :: age

  write(*,*) "Quel âge avez-vous ?"
  read(*,*) age
  write(*,*) "Vous avez", age, "ans"
end program io_simple
```

## Lectures multiples

On peut lire plusieurs valeurs sur une même ligne ou plusieurs lignes.

```fortran
program lecture_multiple
  implicit none
  integer :: a, b, c

  write(*,*) "Entrez trois entiers (séparés par des espaces) :"
  read(*,*) a, b, c
  write(*,*) "Vous avez saisi :", a, b, c
  write(*,*) "Somme :", a + b + c
end program lecture_multiple
```

## Formatage avec `format`

La spécification `format` permet de contrôler précisément l'affichage des données.

```fortran
program format_exemple
  implicit none
  integer :: i
  real :: pi

  pi = 3.14159265

  write(*, 10) "Pi vaut", pi
10 format(A, F10.6)

  do i = 1, 5
    write(*, 20) i, i**2, i**3
  end do
20 format("i =", I3, " i^2 =", I5, " i^3 =", I8)

  write(*, 30) pi
30 format("Pi avec 3 décimales : ", F6.3)
end program format_exemple
```

### Descripteurs de format courants

| Descripteur | Signification                      |
|-------------|------------------------------------|
| `Iw`        | Entier sur `w` caractères          |
| `Fw.d`      | Réel sur `w` car. avec `d` décimales |
| `Ew.d`      | Réel en notation scientifique       |
| `Aw`        | Chaîne sur `w` caractères          |
| `wX`        | Espacement horizontal              |
| `/`         | Saut de ligne                      |

```fortran
program formats_divers
  implicit none
  real :: x

  x = 123.456
  write(*, 10) x
10 format(F10.4)

  write(*, 20) x
20 format(E12.4)

  write(*, 30) x
30 format("Valeur : ", F8.2, " (scientifique : ", E10.3, ")")
end program formats_divers
```

## Lecture formatée

On peut aussi lire des données formatées.

```fortran
program lecture_formatee
  implicit none
  integer :: jour, mois, annee

  write(*,*) "Entrez une date (jj mm aaaa) :"
  read(*, 10) jour, mois, annee
10 format(I2, 1X, I2, 1X, I4)

  write(*, 20) jour, mois, annee
20 format("Date : ", I2.2, "/", I2.2, "/", I4)
end program lecture_formatee
```

## Les unités d'E/S

Au-delà de `*` (écran/clavier), on peut utiliser des numéros d'unité pour les fichiers.

```fortran
program unites
  implicit none
  integer :: u

  u = 10
  write(*,*) "Message à l'écran (unité *)"

  ! Ouvrir un fichier (module 09)
  open(unit=u, file="sortie.txt", status="replace")
  write(u, *) "Écriture dans un fichier"
  close(u)
end program unites
```

## Gestion des erreurs d'E/S

L'option `iostat` permet de détecter les erreurs lors des lectures.

```fortran
program erreur_io
  implicit none
  integer :: val, statut

  write(*,*) "Entrez un entier :"
  read(*, *, iostat=statut) val

  if (statut /= 0) then
    write(*,*) "Erreur de lecture. Veuillez entrer un nombre valide."
  else
    write(*,*) "Vous avez entré :", val
  end if
end program erreur_io
```

## La fonction `print`

`print` est une alternative à `write(*,*)` pour l'affichage simple.

```fortran
program print_ex
  implicit none
  real :: x = 42.0

  print *, "Bonjour depuis print !"
  print *, "x =", x
  print 10, "x formaté :", x
10 format(A, F8.3)
end program print_ex
```

## À retenir

- `read(*,*)` lit au clavier ; `write(*,*)` écrit à l'écran.
- Le format libre (`*`) laisse le compilateur gérer l'affichage.
- Les formats `Iw`, `Fw.d`, `Ew.d`, `A` permettent un contrôle précis.
- `iostat` permet de gérer les erreurs de lecture.
- `print *` est un synonyme de `write(*,*)`.

## Pièges courants

- **Oublier l'astérisque** : `read(*) x` est invalide. Il faut `read(*,*) x`.
- **Format incompatible** : utiliser `F5.2` pour afficher `123.456` provoque un débordement (`***`).
- **Lecture au mauvais format** : lire un entier avec `read(*,*)` alors que l'utilisateur saisit du texte plante le programme sans `iostat`.
- **Mélanger `write` et `read` sans espace** : en lecture formatée, s'assurer que le format correspond exactement à la disposition des données.
- **Descripteur `I` sans largeur** : `I` sans nombre est invalide. Utilisez `I5` ou `I0` pour une largeur minimale.
