# Interfaces explicites en Fortran 95

Les blocs `interface` permettent de déclarer des interfaces explicites pour des procédures externes, des routines surchargées ou des arguments procédure. Une interface explicite donne au compilateur la signature complète d'une sous-programme, permettant la vérification des types et des dimensions.

## Bloc `interface` de base

Un bloc `interface` reproduit la déclaration d'une ou plusieurs procédures sans leur corps.

```fortran
program appel_externe
  implicit none
  interface
    subroutine calcul(a, b, c)
      real, intent(in) :: a, b
      real, intent(out) :: c
    end subroutine calcul
  end interface

  real :: x, y, z
  x = 2.0
  y = 3.0
  call calcul(x, y, z)
  print *, z
end program appel_externe
```

## Interfaces pour fonctions

On peut aussi déclarer l'interface d'une fonction :

```fortran
interface
  function norme(v, n) result(nv)
    real, intent(in) :: v(:)
    integer, intent(in) :: n
    real :: nv
  end function norme
end interface
```

## Surcharge de procédures

Un bloc `interface` permet de regrouper plusieurs procédures sous un même nom générique.

```fortran
module surcharge
  implicit none
  interface afficher
    module procedure afficher_entier
    module procedure afficher_reel
    module procedure afficher_vecteur
  end interface

  contains

  subroutine afficher_entier(x)
    integer, intent(in) :: x
    print *, "Entier :", x
  end subroutine

  subroutine afficher_reel(x)
    real, intent(in) :: x
    print *, "Réel :", x
  end subroutine

  subroutine afficher_vecteur(v)
    real, dimension(:), intent(in) :: v
    print *, "Vecteur :", v
  end subroutine

end module surcharge

program test_surcharge
  use surcharge
  implicit none
  call afficher(42)
  call afficher(3.14)
  call afficher([1.0, 2.0, 3.0])
end program test_surcharge
```

## Interface pour arguments procédure

On utilise `interface` pour passer une fonction comme argument à une autre procédure.

```fortran
module numeric
  implicit none
  contains

  function integrale(f, a, b, n) result(s)
    interface
      function f(x) result(fx)
        real, intent(in) :: x
        real :: fx
      end function f
    end interface
    real, intent(in) :: a, b
    integer, intent(in) :: n
    real :: s, h, x
    integer :: i
    h = (b - a) / n
    s = 0.5 * (f(a) + f(b))
    do i = 1, n - 1
      x = a + i * h
      s = s + f(x)
    end do
    s = s * h
  end function integrale

end module numeric

program test_integrale
  use numeric
  implicit none
  print *, integrale(carre, 0.0, 1.0, 1000)

  contains

  function carre(x) result(c)
    real, intent(in) :: x
    real :: c
    c = x * x
  end function carre

end program test_integrale
```

## Interface explicite issue d'un module

Quand une procédure est contenue dans un module, son interface explicite est automatiquement disponible pour tout programme utilisant ce module. Il n'est pas nécessaire d'écrire un bloc `interface` supplémentaire.

```fortran
module outils
  implicit none
  contains
  subroutine tri(t)
    real, dimension(:), intent(inout) :: t
    ! algorithme de tri
  end subroutine tri
end module outils

program utilisateur
  use outils
  implicit none
  real, dimension(5) :: donnees = [3.0, 1.0, 4.0, 1.0, 5.0]
  call tri(donnees)  ! interface explicite garantie
end program utilisateur
```

## À retenir

- Un bloc `interface` donne la signature complète d'une procédure externe.
- Il permet la surcharge de procédures sous un nom générique.
- Il est indispensable pour passer une procédure en argument.
- Les procédures de module fournissent automatiquement une interface explicite.
- Le compilateur peut vérifier types, dimensions et intention des arguments.

## Pièges courants

- **Oublier de déclarer une interface** : le compilateur supposera implicitement la signature, conduisant à des erreurs silencieuses.
- **Incohérence entre l'interface et la définition réelle** : les deux doivent correspondre exactement, sous peine de comportement indéfini.
- **Utiliser `external` au lieu de `interface`** : `external` ne donne aucune information sur la signature ; préférez toujours `interface`.
- **Omettre `intent` dans l'interface** : sans `intent`, le compilateur ne peut pas vérifier le sens des arguments.
- **Surcharge ambiguë** : les arguments des différentes procédures d'un même nom générique doivent pouvoir être distingués par le compilateur.
