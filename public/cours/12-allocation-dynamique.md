# Allocation dynamique en Fortran 95

L'allocation dynamique permet de créer et détruire des tableaux dont la taille n'est pas connue à la compilation. Fortran 95 offre les mots-clés `allocatable`, `allocate` et `deallocate` pour gérer la mémoire en cours d'exécution.

## Déclaration d'un tableau allocatable

L'attribut `allocatable` indique que la mémoire sera réservée ultérieurement.

```fortran
program exemple_alloc
  implicit none
  integer, allocatable, dimension(:) :: notes
  integer :: n

  print *, "Combien d'étudiants ?"
  read *, n
  allocate(notes(n))
  notes = 0
  print *, "Tableau de taille", n, "alloué"

  deallocate(notes)
end program exemple_alloc
```

## Tableaux à plusieurs dimensions

On peut allouer des tableaux à deux dimensions ou plus.

```fortran
program matrice_dynamique
  implicit none
  real, allocatable, dimension(:,:) :: A
  integer :: m, n

  m = 3
  n = 4
  allocate(A(m, n))
  A = 0.0
  A(1, :) = [1.0, 2.0, 3.0, 4.0]
  print *, A

  deallocate(A)
end program matrice_dynamique
```

## Vérification d'allocation avec `allocated`

La fonction `allocated` teste si un tableau est actuellement alloué.

```fortran
program test_alloue
  implicit none
  real, allocatable, dimension(:) :: v

  if (allocated(v)) then
    print *, "v est alloué"
  else
    print *, "v n'est pas alloué"
  end if

  allocate(v(100))
  if (allocated(v)) print *, "maintenant oui"

  deallocate(v)
end program test_alloue
```

## Réallocation : `allocate` puis `deallocate`

Pour redimensionner un tableau, on doit le désallouer puis le réallouer (Fortran 95 ne possède pas `move_alloc`, introduit en Fortran 2003).

```fortran
program redimensionne
  implicit none
  real, allocatable, dimension(:) :: data
  integer :: i

  allocate(data(10))
  data = 1.0

  deallocate(data)
  allocate(data(20))
  data(1:10) = 1.0
  data(11:20) = 2.0

  deallocate(data)
end program redimensionne
```

## Tableaux automatiques vs allocatable

Un tableau automatique est créé sur la pile à l'entrée d'une procédure et détruit à la sortie. Un tableau allocatable est créé sur le tas et persiste tant qu'il n'est pas désalloué.

```fortran
subroutine exemple_auto(n)
  integer, intent(in) :: n
  real :: tmp(n)  ! tableau automatique : créé sur la pile
  ! tmp est détruit automatiquement à la sortie
end subroutine exemple_auto

subroutine exemple_alloc(n)
  integer, intent(in) :: n
  real, allocatable :: tmp(:)
  allocate(tmp(n))  ! tableau allocatable : créé sur le tas
  ! tmp doit être désalloué explicitement
  deallocate(tmp)
end subroutine exemple_alloc
```

## Allocatable en argument de procédure

Un tableau allocatable peut être passé en argument si la procédure possède une interface explicite.

```fortran
module gestion
  implicit none
  contains

  subroutine init_tableau(t, n)
    real, allocatable, dimension(:), intent(out) :: t
    integer, intent(in) :: n
    if (allocated(t)) deallocate(t)
    allocate(t(n))
    t = 0.0
  end subroutine init_tableau

end module gestion

program test
  use gestion
  implicit none
  real, allocatable, dimension(:) :: x
  call init_tableau(x, 50)
  print *, size(x)
  deallocate(x)
end program test
```

## Statut d'allocation et `stat`

L'argument optionnel `stat` permet de vérifier si l'allocation a réussi.

```fortran
program test_stat
  implicit none
  real, allocatable, dimension(:) :: big
  integer :: statut

  allocate(big(100000000), stat=statut)
  if (statut /= 0) then
    print *, "Échec de l'allocation mémoire"
  else
    print *, "Allocation réussie"
    deallocate(big)
  end if
end program test_stat
```

## À retenir

- `allocatable, dimension(:)` déclare un tableau à allouer dynamiquement.
- `allocate(taille)` réserve la mémoire ; `deallocate` la libère.
- `allocated` vérifie si un tableau est alloué.
- Toujours désallouer ce qui a été alloué pour éviter les fuites mémoire.
- `stat` permet de capturer une erreur d'allocation.

## Pièges courants

- **Oublier `deallocate`** : provoque des fuites mémoire ; le programme peut épuiser la RAM.
- **Double `deallocate`** : désallouer un tableau déjà désalloué est une erreur ; tester avec `allocated` avant.
- **Utiliser un tableau non alloué** : accéder à un tableau déclaré `allocatable` avant `allocate` provoque une erreur.
- **Allouer deux fois sans désallouer** : la seconde allocation échoue ou crée une fuite selon le compilateur.
- **Confondre tableau automatique et allocatable** : un tableau automatique n'a pas besoin d'être désalloué, mais sa taille est fixée à l'appel de la procédure.
