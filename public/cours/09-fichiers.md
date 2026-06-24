# Fichiers

Ce module présente la gestion des fichiers en Fortran 95 : ouverture, fermeture, lecture, écriture, et positionnement. La manipulation de fichiers est indispensable pour traiter des données volumineuses, sauvegarder des résultats, ou lire des configurations.

## Ouvrir un fichier avec `open`

L'instruction `open` associe une unité logique à un fichier physique.

```fortran
program ouvrir
  implicit none
  integer :: u

  u = 10
  open(unit=u, file="donnees.txt", status="new")
  write(u, *) "Première ligne du fichier"
  close(u)
end program ouvrir
```

### Paramètres de `open`

| Paramètre | Description                                      |
|-----------|--------------------------------------------------|
| `unit`    | Numéro d'unité (de 1 à 99, éviter les valeurs système) |
| `file`    | Nom du fichier (chemin relatif ou absolu)        |
| `status`  | `"new"`, `"old"`, `"replace"`, `"scratch"`, `"unknown"` |
| `action`  | `"read"`, `"write"`, `"readwrite"`               |
| `position`| `"asis"`, `"rewind"`, `"append"`                 |
| `iostat`  | Variable entière pour le code de retour          |
| `form`    | `"formatted"` (défaut) ou `"unformatted"`        |

```fortran
program open_avance
  implicit none
  integer :: u, statut

  u = 20
  open(unit=u, file="resultats.dat", status="replace", &
       action="write", iostat=statut)

  if (statut /= 0) then
    write(*,*) "Erreur à l'ouverture du fichier"
    stop
  end if

  write(u, *) "Résultat 1 :", 3.14159
  write(u, *) "Résultat 2 :", 42
  close(u)
end program open_avance
```

## Écrire dans un fichier

On utilise `write(unité, *)` ou `write(unité, format)`.

```fortran
program ecriture
  implicit none
  integer :: u, i

  open(10, file="carres.txt", status="replace")
  do i = 1, 10
    write(10, *) i, i**2
  end do
  close(10)

  write(*, *) "Fichier carres.txt créé avec succès"
end program ecriture
```

## Lire depuis un fichier

La lecture utilise `read(unité, *)`.

```fortran
program lecture
  implicit none
  integer :: u, val, somme, count

  open(10, file="nombres.txt", status="old", action="read")
  somme = 0
  count = 0

  do
    read(10, *, iostat=count) val
    if (count /= 0) exit
    somme = somme + val
  end do

  close(10)
  write(*, *) "Somme des nombres :", somme
end program lecture
```

## Lire ligne par ligne

Pour lire un fichier texte ligne par ligne, on utilise une chaîne de caractères.

```fortran
program lire_lignes
  implicit none
  integer :: u, statut
  character(len=100) :: ligne

  open(10, file="texte.txt", status="old", action="read")
  do
    read(10, '(A)', iostat=statut) ligne
    if (statut /= 0) exit
    write(*, *) ligne
  end do
  close(10)
end program lire_lignes
```

## Fichiers non formatés

Les fichiers non formatés (`unformatted`) sont plus rapides et plus compacts pour les données binaires.

```fortran
program binaire
  implicit none
  real :: a, b
  integer :: u

  a = 1.234
  b = 5.678

  ! Écriture binaire
  open(10, file="data.bin", form="unformatted", status="replace")
  write(10) a, b
  close(10)

  ! Lecture binaire
  a = 0.0
  b = 0.0
  open(10, file="data.bin", form="unformatted", status="old")
  read(10) a, b
  close(10)

  write(*, *) "Lu :", a, b
end program binaire
```

## Positionnement : `rewind` et `backspace`

- `rewind(unité)` : repositionne au début du fichier.
- `backspace(unité)` : recule d'un enregistrement.

```fortran
program positionnement
  implicit none
  integer :: u, val, i

  open(10, file="nombres.txt", status="replace")
  do i = 1, 5
    write(10, *) i * 10
  end do

  rewind(10)

  do i = 1, 5
    read(10, *) val
    write(*, *) "Lu :", val
    if (i == 3) backspace(10)
  end do

  close(10)
end program positionnement
```

## Utiliser `namelist` pour la configuration

`namelist` permet de lire des fichiers de configuration structurés.

```fortran
program namelist_ex
  implicit none
  integer :: nx, ny
  real :: dt, tmax
  namelist /parametres/ nx, ny, dt, tmax

  open(10, file="config.nml", status="old")
  read(10, nml=parametres)
  close(10)

  write(*, nml=parametres)
end program namelist_ex
```

Fichier `config.nml` correspondant :

```
&parametres
  nx = 100
  ny = 200
  dt = 0.01
  tmax = 10.0
/
```

## À retenir

- `open` associe une unité à un fichier ; `close` libère l'unité.
- Utilisez `iostat` pour détecter les erreurs d'E/S fichier.
- `status="replace"` crée ou écrase ; `status="old"` exige que le fichier existe.
- Les fichiers non formatés (`form="unformatted"`) sont plus rapides pour les données numériques.
- `rewind` et `backspace` contrôlent la position de lecture.
- `namelist` simplifie la lecture de fichiers de configuration.

## Pièges courants

- **Fichier inexistant** : ouvrir un fichier avec `status="old"` qui n'existe pas provoque une erreur. Vérifiez avec `inquire`.
- **Unité déjà utilisée** : utiliser le même numéro d'unité pour deux fichiers simultanément.
- **Oublier `close`** : les données peuvent être perdues si le fichier n'est pas fermé correctement.
- **Chemin incorrect** : sur Windows, les backslashes `\` dans les chemins doivent être échappés ou utiliser des forward slashes `/`.
- **`rewind` sur un fichier non ouvert** : provoque une erreur d'exécution.
- **Format `namelist` mal formé** : une virgule manquante ou un nom de variable incorrect dans le fichier `nml` fait échouer la lecture.
