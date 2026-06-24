# Calcul scientifique en Fortran 95

Ce module présente des applications concrètes du calcul scientifique avec Fortran 95 : résolution d'équations différentielles, simulation physique et opérations matricielles avancées.

## Résolution d'équations différentielles ordinaires

### Méthode d'Euler explicite

```fortran
program euler_ode
    implicit none
    integer, parameter :: n = 1000
    real :: t, dt, y
    integer :: i

    t = 0.0
    y = 1.0
    dt = 0.01

    open(10, file="solution.txt", status="replace")

    do i = 1, n
        write(10, *) t, y
        y = y + dt * derivee(t, y)
        t = t + dt
    end do

    close(10)
    print *, "Résultats écrits dans solution.txt"

contains

    function derivee(t, y) result(dy)
        real, intent(in) :: t, y
        real :: dy
        ! dy/dt = -2 * y (décroissance exponentielle)
        dy = -2.0 * y
    end function derivee

end program euler_ode
```

### Méthode Runge-Kutta d'ordre 4 (RK4)

```fortran
module rk4_module
    implicit none
contains
    subroutine rk4_step(f, t, y, dt)
        real, intent(in) :: t, dt
        real, intent(inout) :: y
        real :: k1, k2, k3, k4

        interface
            function f(t, y) result(r)
                real, intent(in) :: t, y
                real :: r
            end function f
        end interface

        k1 = dt * f(t, y)
        k2 = dt * f(t + 0.5*dt, y + 0.5*k1)
        k3 = dt * f(t + 0.5*dt, y + 0.5*k2)
        k4 = dt * f(t + dt, y + k3)

        y = y + (k1 + 2.0*k2 + 2.0*k3 + k4) / 6.0
    end subroutine rk4_step
end module rk4_module

program pendule
    use rk4_module
    implicit none
    real :: t, theta, omega, dt
    integer :: i, n

    t = 0.0
    theta = 0.1    ! amplitude initiale (rad)
    omega = 0.0    ! vitesse angulaire initiale
    dt = 0.01
    n = 2000

    open(10, file="pendule.txt", status="replace")

    do i = 1, n
        write(10, *) t, theta
        call rk4_step(f_theta, t, theta, dt)
        call rk4_step(f_omega, t, omega, dt)
        t = t + dt
    end do

    close(10)

contains

    function f_theta(t, y) result(r)
        real, intent(in) :: t, y
        real :: r
        r = omega
    end function f_theta

    function f_omega(t, y) result(r)
        real, intent(in) :: t, y
        real :: r
        r = -9.81 / 1.0 * sin(theta)  ! pendule simple L=1.0
    end function f_omega

end program pendule
```

## Opérations matricielles avancées

### Factorisation LU sans pivot

```fortran
subroutine factorisation_lu(a, l, u, n)
    implicit none
    integer, intent(in) :: n
    real, intent(in) :: a(n, n)
    real, intent(out) :: l(n, n), u(n, n)
    integer :: i, j, k

    l = 0.0
    u = 0.0

    do i = 1, n
        l(i, i) = 1.0
    end do

    do j = 1, n
        do i = 1, j
            u(i, j) = a(i, j)
            do k = 1, i - 1
                u(i, j) = u(i, j) - l(i, k) * u(k, j)
            end do
        end do

        do i = j + 1, n
            l(i, j) = a(i, j)
            do k = 1, j - 1
                l(i, j) = l(i, j) - l(i, k) * u(k, j)
            end do
            l(i, j) = l(i, j) / u(j, j)
        end do
    end do
end subroutine factorisation_lu
```

### Norme matricielle de Frobenius

```fortman
function norme_frobenius(a) result(norm)
    implicit none
    real, intent(in) :: a(:,:)
    real :: norm
    integer :: i, j

    norm = 0.0
    do i = 1, size(a, 1)
        do j = 1, size(a, 2)
            norm = norm + a(i, j)**2
        end do
    end do
    norm = sqrt(norm)
end function norme_frobenius
```

## Simulation : diffusion de la chaleur

Équation de la chaleur 1D par différences finies.

```fortran
program diffusion_chaleur
    implicit none
    integer, parameter :: nx = 50
    integer, parameter :: nt = 500
    real, parameter :: alpha = 0.01
    real, parameter :: dx = 0.02
    real, parameter :: dt = 0.0001
    real :: u(0:nx+1), u_new(0:nx+1)
    integer :: i, j

    ! Condition initiale
    u = 0.0
    do i = 1, nx
        u(i) = exp(-100.0 * ((i * dx - 0.5)**2))
    end do

    ! Boucle temporelle
    do j = 1, nt
        do i = 1, nx
            u_new(i) = u(i) + alpha * dt / dx**2 * &
                       (u(i+1) - 2.0 * u(i) + u(i-1))
        end do
        u(1:nx) = u_new(1:nx)
        ! Conditions aux limites : u(0) = u(nx+1) = 0
    end do

    print *, "Simulation terminée"
    open(10, file="chaleur.txt", status="replace")
    do i = 1, nx
        write(10, *) i * dx, u(i)
    end do
    close(10)
end program diffusion_chaleur
```

## Interpolation polynomiale de Lagrange

```fortran
function lagrange(x, pts_x, pts_y, n) result(y)
    implicit none
    real, intent(in) :: x
    real, intent(in) :: pts_x(:), pts_y(:)
    integer, intent(in) :: n
    real :: y, terme
    integer :: i, j

    y = 0.0

    do i = 1, n
        terme = pts_y(i)
        do j = 1, n
            if (j /= i) then
                terme = terme * (x - pts_x(j)) / (pts_x(i) - pts_x(j))
            end if
        end do
        y = y + terme
    end do
end function lagrange
```

## Pièges courants

- Pas de temps `dt` trop grand : la solution devient instable (condition CFL).
- Oublier les conditions aux limites dans les équations aux dérivées partielles.
- Confondre les dimensions des matrices dans les opérations.
- Utiliser une méthode d'Euler quand RK4 est nécessaire pour la stabilité.
- Négliger les erreurs d'arrondi cumulées dans les longues simulations.

## À retenir

- RK4 est bien plus précis que la méthode d'Euler pour les EDO.
- Les schémas de différences finies sont simples mais ont des contraintes de stabilité.
- La factorisation LU permet de résoudre efficacement plusieurs systèmes avec la même matrice.
- Les simulations physiques combinent algèbre linéaire et intégration temporelle.
- Toujours valider avec un cas test dont la solution analytique est connue.
