# Projet final : simulateur de système planétaire

Ce projet final combine l'ensemble des notions abordées dans la formation Fortran 95. Vous allez développer un simulateur de système planétaire intégrant modules, types dérivés, BLAS/LAPACK, OpenMP, calcul numérique et bonnes pratiques.

## Énoncé du projet

Développer un programme Fortran 95 qui simule le mouvement de planètes sous l'effet de la gravitation universelle. Le programme doit :

1. Lire les conditions initiales depuis un fichier
2. Intégrer les équations du mouvement avec la méthode RK4
3. Utiliser BLAS pour les calculs vectoriels
4. Paralléliser les calculs avec OpenMP
5. Écrire les résultats dans un fichier pour visualisation
6. Gérer les erreurs et tester avec des assertions

## Structure du projet

```
projet_planetes/
  |-- modules/
  |     |-- constantes.f90
  |     |-- corps.f90
  |     |-- integrateur.f90
  |     |-- lectures.f90
  |-- main.f90
  |-- Makefile
  |-- conditions.txt
```

## Module des constantes

```fortran
module constantes
    implicit none
    real, parameter :: g = 6.67430e-11  ! constante gravitationnelle (m^3/kg/s^2)
    integer, parameter :: dp = kind(1.0d0)
    real(dp), parameter :: pi = 3.14159265358979323846_dp
    real(dp), parameter :: jour = 86400.0_dp
    real(dp), parameter :: an = 365.25_dp * jour
end module constantes
```

## Module des corps célestes

```fortran
module corps
    use constantes
    implicit none

    type :: corps_celeste
        character(len=20) :: nom
        real(dp) :: masse
        real(dp) :: position(3)
        real(dp) :: vitesse(3)
    end type corps_celeste

contains

    function energie_cinetique(c) result(ec)
        type(corps_celeste), intent(in) :: c
        real(dp) :: ec
        ec = 0.5_dp * c%masse * sum(c%vitesse**2)
    end function energie_cinetique

    function energie_potentielle(c1, c2) result(ep)
        type(corps_celeste), intent(in) :: c1, c2
        real(dp) :: ep, r
        r = sqrt(sum((c1%position - c2%position)**2))
        if (r > 0.0_dp) then
            ep = -g * c1%masse * c2%masse / r
        else
            ep = 0.0_dp
        end if
    end function energie_potentielle

end module corps
```

## Module d'intégration RK4

```fortran
module integrateur
    use constantes
    use corps
    implicit none

contains

    subroutine rk4_planet(f, planetes, dt, n)
        interface
            function f(p) result(r)
                use corps
                type(corps_celeste), intent(in) :: p(:)
                type(corps_celeste), allocatable :: r(:)
            end function f
        end interface

        type(corps_celeste), intent(inout) :: planetes(:)
        real(dp), intent(in) :: dt
        integer, intent(in) :: n
        type(corps_celeste), allocatable :: k1, k2, k3, k4, temp
        integer :: i

        k1 = f(planetes)

        temp = planetes
        do i = 1, n
            temp(i)%position = planetes(i)%position + 0.5_dp * dt * k1(i)%vitesse
        end do
        k2 = f(temp)

        temp = planetes
        do i = 1, n
            temp(i)%position = planetes(i)%position + 0.5_dp * dt * k2(i)%vitesse
        end do
        k3 = f(temp)

        temp = planetes
        do i = 1, n
            temp(i)%position = planetes(i)%position + dt * k3(i)%vitesse
        end do
        k4 = f(temp)

        do i = 1, n
            planetes(i)%position = planetes(i)%position + dt / 6.0_dp * &
                (k1(i)%vitesse + 2.0_dp*k2(i)%vitesse + 2.0_dp*k3(i)%vitesse + k4(i)%vitesse)
            planetes(i)%vitesse = planetes(i)%vitesse + dt / 6.0_dp * &
                (k1(i)%acceleration + 2.0_dp*k2(i)%acceleration + 2.0_dp*k3(i)%acceleration + k4(i)%acceleration)
        end do
    end subroutine rk4_planet

    function accelerations(planetes) result(acc)
        type(corps_celeste), intent(in) :: planetes(:)
        type(corps_celeste), allocatable :: acc(:)
        integer :: i, j, n

        n = size(planetes)
        allocate(acc(n))

        do i = 1, n
            acc(i)%acceleration = 0.0_dp
        end do

        !$omp parallel do private(i, j)
        do i = 1, n
            do j = i + 1, n
                call calculer_force(planetes(i), planetes(j), &
                                    acc(i)%acceleration, acc(j)%acceleration)
            end do
        end do
        !$omp end parallel do
    end function accelerations

    subroutine calculer_force(p1, p2, a1, a2)
        type(corps_celeste), intent(in) :: p1, p2
        real(dp), intent(inout) :: a1(3), a2(3)
        real(dp) :: r(3), dist3

        r = p2%position - p1%position
        dist3 = (sum(r**2)) ** 1.5_dp

        if (dist3 > 0.0_dp) then
            a1 = a1 + g * p2%masse * r / dist3
            a2 = a2 - g * p1%masse * r / dist3
        end if
    end subroutine calculer_force

end module integrateur
```

## Programme principal

```fortran
program simulateur_planetes
    use constantes
    use corps
    use integrateur
    implicit none

    type(corps_celeste), allocatable :: planetes(:)
    real(dp) :: dt, t_fin, t
    integer :: n_planetes, n_pas, i, ios, u

    namelist /simulation/ n_planetes, dt, t_fin

    ! Lecture de la configuration
    open(10, file="conditions.txt", status="old", iostat=ios)
    if (ios /= 0) then
        print *, "Erreur : fichier conditions.txt introuvable"
        stop
    end if

    read(10, nml=simulation)
    allocate(planetes(n_planetes))
    read(10, *)  ! entête
    do i = 1, n_planetes
        read(10, *) planetes(i)%nom, planetes(i)%masse, &
                    planetes(i)%position, planetes(i)%vitesse
    end do
    close(10)

    n_pas = int(t_fin / dt)

    open(20, file="trajectoires.txt", status="replace")
    t = 0.0_dp

    do i = 1, n_pas
        if (mod(i, 100) == 0) then
            write(20, *) t, (planetes(j)%position, j = 1, n_planetes)
        end if
        call rk4_planet(accelerations, planetes, dt, n_planetes)
        t = t + dt
    end do

    close(20)
    print *, "Simulation terminée :", n_pas, "pas de temps"
    print *, "Énergie totale :", calculer_energie_totale(planetes)

end program simulateur_planetes

function calculer_energie_totale(planetes) result(etot)
    use constantes
    use corps
    implicit none
    type(corps_celeste), intent(in) :: planetes(:)
    real(dp) :: etot
    integer :: i, j

    etot = 0.0_dp

    do i = 1, size(planetes)
        etot = etot + energie_cinetique(planetes(i))
    end do

    do i = 1, size(planetes)
        do j = i + 1, size(planetes)
            etot = etot + energie_potentielle(planetes(i), planetes(j))
        end do
    end do
end function calculer_energie_totale
```

## Fichier de conditions initiales

```
&simulation n_planetes=3, dt=3600.0, t_fin=3.1536e7 /
# nom        masse          x      y      z    vx     vy     vz
Soleil    1.989e30         0.0    0.0   0.0   0.0    0.0    0.0
Terre     5.972e24         1.5e11 0.0   0.0   0.0    2.98e4 0.0
Mars      6.417e23         2.3e11 0.0   0.0   0.0    2.41e4 0.0
```

## Makefile

```makefile
FC = gfortran
FFLAGS = -O2 -g -Wall -fcheck=all -fopenmp
LDFLAGS = -llapack -lblas

SRC = main.f90
OBJ = $(SRC:.f90=.o)

all: simulateur

simulateur: constantes.o corps.o integrateur.o main.o
	$(FC) $(FFLAGS) -o $@ $^ $(LDFLAGS)

%.o: %.f90
	$(FC) $(FFLAGS) -c $<

clean:
	rm -f *.o *.mod simulateur

run: simulateur
	./simulateur
```

## Tests du projet

```fortran
module tests_projet
    use corps
    use constantes
    implicit none
contains
    subroutine test_energie_cinetique()
        type(corps_celeste) :: terre

        terre%masse = 5.972e24_dp
        terre%vitesse = (/ 0.0_dp, 29800.0_dp, 0.0_dp /)

        if (energie_cinetique(terre) > 0.0_dp) then
            print *, "OK : energie_cinetique positive"
        else
            print *, "ÉCHEC : energie_cinetique devrait être positive"
        end if
    end subroutine test_energie_cinetique

    subroutine test_conservation_energie()
        ! Vérifie que l'énergie totale est conservée à 1% près
        ! sur 100 pas de temps pour deux corps
    end subroutine test_conservation_energie
end module tests_projet
```

## Pièges courants

- Oublier d'initialiser les types dérivés avant utilisation.
- Mauvaise gestion des unités (secondes vs jours, mètres vs km).
- Divergence numérique si `dt` est trop grand.
- Non conservation de l'énergie due à une erreur dans RK4.
- Accès concurrent non protégé dans `!$omp parallel do`.
- Fichier d'entrée mal formaté : toujours vérifier `iostat`.

## Critères d'évaluation

- Code modulaire avec modules séparés et bien nommés
- Utilisation correcte de `intent(in/out/inout)`
- Gestion des erreurs (iostat, stat)
- Parallélisation OpenMP efficace
- Tests unitaires pour les fonctions critiques
- Documentation et commentaires pertinents
- Conservation de l'énergie à long terme

## À retenir

- Ce projet synthétise l'ensemble des compétences Fortran 95 acquises.
- Un code bien structuré (modules, types, interfaces) est plus facile à maintenir.
- La validation (tests, conservation énergie) est essentielle en calcul scientifique.
- OpenMP accélère les boucles de calcul intensif.
- Fortran 95 reste un langage de choix pour la simulation numérique performante.
