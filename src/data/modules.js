export const MODULES = [
  { id: "01-introduction", title: "Introduction à Fortran 95", short: "Introduction", part: 1, duration: "2h", desc: "Découvrez Fortran 95, son histoire, installez un compilateur et écrivez votre premier programme.", icon: "💻", color: "#5C2D91" },
  { id: "02-variables-types", title: "Variables et types", short: "Variables", part: 1, duration: "2h", desc: "Maîtrisez les types INTEGER, REAL, DOUBLE PRECISION, COMPLEX, LOGICAL, CHARACTER et les déclarations IMPLICIT.", icon: "🔢", color: "#7B3FBF" },
  { id: "03-operateurs", title: "Opérateurs et expressions", short: "Opérateurs", part: 1, duration: "2h", desc: "Opérateurs arithmétiques, relationnels, logiques et priorité des expressions en Fortran.", icon: "⚙️", color: "#9B5DE5" },
  { id: "04-controle-flux", title: "Contrôle de flux", short: "Contrôle flux", part: 1, duration: "2h", desc: "IF, ELSE IF, SELECT CASE, GOTO et structuration conditionnelle en Fortran 95.", icon: "🔀", color: "#B07CF0" },
  { id: "05-boucles", title: "Boucles DO", short: "Boucles", part: 1, duration: "2h", desc: "Maîtrisez les boucles DO, DO WHILE, DO imbriquées, EXIT, CYCLE et les contrôles d'itération.", icon: "🔄", color: "#C59CF5" },
  { id: "06-tableaux", title: "Tableaux", short: "Tableaux", part: 1, duration: "3h", desc: "Déclaration DIMENSION, tableaux statiques, sections de tableaux et opérations vectorisées.", icon: "📊", color: "#D9BCFB" },
  { id: "07-fonctions-subroutines", title: "Fonctions et Subroutines", short: "Fonctions", part: 1, duration: "3h", desc: "Créez des fonctions et subroutines réutilisables, arguments INTENT, pure/intent et INTERFACE.", icon: "⚡", color: "#2D5C91" },
  { id: "08-entrees-sorties", title: "Entrées/Sorties", short: "E/S", part: 1, duration: "2h", desc: "READ, WRITE, FORMAT, éditeurs de format I/O, lecture et écriture formatées.", icon: "📋", color: "#3F7BBF" },
  { id: "09-fichiers", title: "Fichiers", short: "Fichiers", part: 2, duration: "2h", desc: "OPEN, CLOSE, READ/WRITE sur fichiers, fichiers séquentiels et directs, IOSTAT.", icon: "📁", color: "#5D9BE5" },
  { id: "10-modules", title: "Modules", short: "Modules", part: 2, duration: "3h", desc: "Créez des modules Fortran, encapsulation, variables et procédures modulaires, USE et ONLY.", icon: "📦", color: "#7DB5F0" },
  { id: "11-interfaces", title: "Interfaces", short: "Interfaces", part: 2, duration: "2h", desc: "INTERFACE blocks, interfaces explicites, surcharge de procédure avec INTERFACE.", icon: "🔌", color: "#9CC8F5" },
  { id: "12-allocation-dynamique", title: "Allocation dynamique", short: "Allocation", part: 2, duration: "2h", desc: "ALLOCATABLE, ALLOCATE, DEALLOCATE, tableaux dynamiques et gestion mémoire.", icon: "🧠", color: "#BCDBFB" },
  { id: "13-types-derives", title: "Types dérivés", short: "Types dérivés", part: 2, duration: "3h", desc: "TYPE, composants, tableaux de types dérivés, opérateurs sur types PERSONNALISÉS.", icon: "🏗️", color: "#D1AA42" },
  { id: "14-surcharge-operateurs", title: "Surcharge d'opérateurs", short: "Surcharge", part: 2, duration: "2h", desc: "INTERFACE OPERATOR, surcharge des opérateurs existants, nouveaux opérateurs avec .OP.", icon: "✨", color: "#E8C55A" },
  { id: "15-pointeurs", title: "Pointeurs", short: "Pointeurs", part: 2, duration: "3h", desc: "POINTER, TARGET, pointeurs sur tableaux, structures chaînées et gestion de références.", icon: "🔗", color: "#F5D97A" },
  { id: "16-bibliotheque-intrinseque", title: "Bibliothèque intrinsèque", short: "Intrinsèque", part: 3, duration: "3h", desc: "Fonctions intrinsèques : mathématiques, manipulation de chaînes, tableaux, tris et recherches.", icon: "📚", color: "#2D914C" },
  { id: "17-tableaux-avances", title: "Manipulation avancée des tableaux", short: "Tableaux avancés", part: 3, duration: "3h", desc: "WHERE, FORALL, masques, tableaux assumés, RESHAPE, PACK, SPREAD, MERGE.", icon: "📐", color: "#3FBF5C" },
  { id: "18-recursivite", title: "Récursivité", short: "Récursivité", part: 3, duration: "2h", desc: "Fonctions récursives, RECURSIVE, précautions, exemples (factorielle, Fibonacci, quicksort).", icon: "🔄", color: "#5DE57A" },
  { id: "19-interfacage-c", title: "Interfaçage avec C", short: "Interop C", part: 3, duration: "3h", desc: "ISO_C_BINDING, BIND(C), interopérabilité Fortran-C, passage de pointeurs et tableaux.", icon: "🔗", color: "#7DF59C" },
  { id: "20-fortran95-vs-anciens", title: "Fortran 95 vs Fortran 90/77", short: "Fortran évolution", part: 3, duration: "2h", desc: "Différences clés, fonctionnalités 95, modernisation du code FORTRAN 77 vers Fortran 95.", icon: "📜", color: "#9CF5B8" },
  { id: "21-bonnes-pratiques", title: "Bonnes pratiques", short: "Bonnes pratiques", part: 3, duration: "2h", desc: "Conventions de code, organisation de projet, commentaires, IMPLICIT NONE, style moderne.", icon: "✅", color: "#BCFBD0" },
  { id: "22-calcul-numerique", title: "Calcul numérique avancé", short: "Calcul numérique", part: 4, duration: "4h", desc: "Précision, erreurs d'arrondi, résolution de systèmes linéaires, intégration numérique.", icon: "🧮", color: "#914C2D" },
  { id: "23-openmp", title: "Programmation parallèle OpenMP", short: "OpenMP", part: 4, duration: "4h", desc: "Directives OpenMP, parallélisation de boucles, sections critiques, réduction et scheduling.", icon: "⚡", color: "#BF6C3F" },
  { id: "24-blas-lapack", title: "BLAS et LAPACK", short: "BLAS/LAPACK", part: 4, duration: "3h", desc: "Utilisation des bibliothèques BLAS et LAPACK pour l'algèbre linéaire haute performance.", icon: "📈", color: "#E58A5D" },
  { id: "25-calcul-scientifique", title: "Fortran pour le calcul scientifique", short: "Calcul scientifique", part: 4, duration: "4h", desc: "Simulation numérique, modélisation, EDO, EDP, études de cas concrets en Fortran.", icon: "🔬", color: "#F5A87A" },
  { id: "26-tests-debogage", title: "Tests et débogage", short: "Tests", part: 4, duration: "3h", desc: "Debugging avec GDB, tests unitaires, validation numérique, profiling et optimisation.", icon: "🐛", color: "#FBC59C" },
  { id: "27-projet-final", title: "Projet final", short: "Projet final", part: 4, duration: "8h", desc: "Appliquez toutes vos compétences Fortran sur un projet complet de calcul numérique.", icon: "🏆", color: "#0D47A1" },
]

export const PARTS = [
  { id: 1, title: "Les Fondamentaux", color: "#5C2D91", desc: "Les bases essentielles de Fortran 95" },
  { id: 2, title: "Intermédiaire", color: "#2D5C91", desc: "Approfondissez vos connaissances Fortran" },
  { id: 3, title: "Avancé", color: "#2D914C", desc: "Concepts avancés du langage" },
  { id: 4, title: "Expert / Spécialisation", color: "#914C2D", desc: "Maîtrisez le calcul scientifique Fortran" },
]

export const QUIZZES = {}
for (const m of MODULES) {
  QUIZZES[m.id] = [
    { q: `Question 1 sur ${m.short}`, choices: ["Option A", "Option B", "Option C", "Option D"], correct: 0 },
    { q: `Question 2 sur ${m.short}`, choices: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
    { q: `Question 3 sur ${m.short}`, choices: ["Option A", "Option B", "Option C", "Option D"], correct: 2 },
  ]
}

export const EXERCISES = {}
for (const m of MODULES) {
  EXERCISES[m.id] = {
    instruction: `Exercice pratique du module : ${m.title}. Écris le code Fortran 95 correspondant.`,
    starterCode: `! Exercice: ${m.title}\n! Écris ton code ici\n\nend program exercice`,
    solution: `! Solution: ${m.title}\nprogram exercice\n  implicit none\n  print *, "Module termine !"\nend program exercice`,
  }
}

export const TOTAL_MODULES = MODULES.length
export const TOTAL_PARTS = PARTS.length

export function getModulesByPart(partId) {
  return MODULES.filter(m => m.part === partId)
}

export function getModule(id) {
  return MODULES.find(m => m.id === id)
}
