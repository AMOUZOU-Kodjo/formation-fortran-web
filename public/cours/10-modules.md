# Modules en Fortran 95

Les modules sont l'un des apports majeurs de Fortran 90/95. Ils permettent d'encapsuler des données, des procédures et des interfaces dans une unité réutilisable, remplaçant avantageusement les `common blocks` et offrant un véritable mécanisme de modularité.

## Structure d'un module

Un module se compose d'une partie déclaration et d'une partie contenu (procédures). Il débute par `module` et se termine par `end module`.

```fortran
module calculs
  implicit none
  real, parameter :: pi = 3.14159265
  contains

  function surface_cercle(r) result(s)
    real, intent(in) :: r
    real :: s
    s = pi * r * r
  end function surface_cercle

end module calculs
```

## Utilisation d'un module avec `use`

Le mot-clé `use` importe le module dans un programme ou un autre module.

```fortran
program test_module
  use calculs
  implicit none
  real :: rayon = 5.0
  print *, "Surface :", surface_cercle(rayon)
  print *, "Pi vaut :", pi
end program test_module
```

## Contrôle des accès avec `only:`

La clause `only:` limite les symboles importés et évite les conflits de noms.

```fortran
program test_only
  use calculs, only: pi
  implicit none
  ! surface_cercle n'est pas accessible ici
  print *, "Pi vaut :", pi
end program test_only
```

On peut aussi renommer un symbole importé :

```fortran
use calculs, only: ma_pi => pi
```

## Parties publique et privée

Les attributs `public` et `private` contrôlent la visibilité des entités du module.

```fortran
module config
  implicit none
  private
  integer, public :: mode_affichage = 1
  integer :: mode_interne           ! privé par défaut
  public :: init_config, afficher_config
  contains
  subroutine init_config()
    mode_interne = 0
  end subroutine init_config
end module config
```

`private` sans argument rend tout privé par défaut ; seuls les symboles marqués `public` sont exportés.

## Modules et procédures

Les subroutines et fonctions définies dans la section `contains` d'un module reçoivent automatiquement une **interface explicite**, ce qui permet au compilateur de vérifier la cohérence des arguments à l'appel.

```fortran
module vecteur
  implicit none
  contains

  function produit_scalaire(a, b) result(p)
    real, dimension(:), intent(in) :: a, b
    real :: p
    integer :: i
    p = 0.0
    do i = 1, size(a)
      p = p + a(i) * b(i)
    end do
  end function produit_scalaire

end module vecteur
```

## Modules dédiés aux constantes

On utilise souvent un module ne contenant que des paramètres :

```fortran
module constantes
  implicit none
  real, parameter :: g = 9.81
  real, parameter :: c = 299792458.0
  real, parameter :: k_B = 1.380649e-23
end module constantes
```

## À retenir

- Un module encapsule données et procédures.
- `use nom_module` importe toutes les entités publiques.
- `use nom_module, only: liste` importe sélectivement.
- `public` / `private` contrôlent la visibilité.
- Les procédures de module fournissent une interface explicite automatique.
- Les modules remplacent les `common blocks` de façon sûre.

## Pièges courants

- **Oublier `implicit none` dans le module** : les variables non déclarées seront typées implicitement, annulant la sécurité du typage.
- **Confondre `public` et `private`** : par défaut tout est public ; un `private` sans liste rend tout privé.
- **Utiliser un module sans le compiler avant le programme principal** : l'ordre de compilation est crucial ; le module doit être compilé avant son utilisation.
- **Importer deux symboles de même nom** : utiliser `only:` avec renommage pour lever l'ambiguïté.
- **Redéclarer une variable importée** : un symbole importé par `use` ne doit pas être redéclaré dans l'unité qui l'importe.
