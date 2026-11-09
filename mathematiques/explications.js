QUIZ.expliquer = [
  {
    q: "Énonce le théorème de Pythagore et explique quand on l’utilise.",
    reponse: "Si un triangle est rectangle, alors le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés. Cette relation s’appelle l’égalité de Pythagore. On utilise le théorème quand on sait que le triangle est rectangle et qu’on connaît deux longueurs : il sert alors à calculer la longueur du troisième côté. Par exemple, dans le triangle ARE rectangle en R, on écrit AE² = RE² + RA².",
    cles: ["triangle est rectangle", "carré de l’hypoténuse", "somme des carrés", "égalité de Pythagore", "deux longueurs"]
  },
  {
    q: "Définis : la racine carrée d’un nombre positif a (définition géométrique, puis définition algébrique).",
    reponse: "Géométriquement, √a est la longueur du côté d’un carré d’aire a : un carré de côté √15 a pour aire 15. Algébriquement, √a est le nombre positif dont le carré vaut a, c’est-à-dire (√a)² = a. Par exemple, √49 = 7, car 7² = 49 et 7 est positif. Au collège, la racine carrée d’un nombre négatif n’est pas définie : la calculatrice affiche une erreur.",
    cles: ["longueur du côté d’un carré d’aire a", "nombre positif dont le carré vaut a", "(√a)² = a", "n’est pas définie"]
  },
  {
    q: "Pourquoi √13 × √13 est-il égal à 13 ?",
    reponse: "Par définition, √13 est le nombre positif dont le carré vaut 13. Multiplier √13 par lui-même, c’est calculer son carré, donc (√13)² = 13. On peut aussi le voir géométriquement : √13 est la longueur du côté d’un carré d’aire 13, et l’aire de ce carré est justement √13 × √13. De façon générale, pour tout nombre positif a, on a √a × √a = a.",
    cles: ["nombre positif dont le carré vaut 13", "(√13)² = 13", "√a × √a = a"]
  },
  {
    q: "Quelle différence entre une valeur exacte et une valeur approchée ? Donne un exemple avec Pythagore.",
    reponse: "Une valeur exacte est écrite sans arrondi, au besoin avec le symbole √, car certains nombres comme √2 ou √13 ne sont ni décimaux ni des fractions. Une valeur approchée est un arrondi, signalé par le symbole ≈. Par exemple, si AE² = 13, alors AE = √13 est la valeur exacte et AE ≈ 3,6 cm est la valeur approchée au dixième. Quand la consigne demande la valeur exacte, un arrondi ne suffit pas.",
    cles: ["valeur exacte", "symbole √", "valeur approchée", "√13", "≈ 3,6"]
  },
  {
    q: "Explique comment on calcule une longueur avec le théorème de Pythagore (méthode pas à pas).",
    reponse: "On nomme le triangle rectangle et son angle droit : « dans le triangle ARE rectangle en R, d’après le théorème de Pythagore ». On écrit l’égalité avec les lettres : AE² = ER² + AR². On remplace par les valeurs : AE² = 3² + 2². On calcule le carré de la longueur cherchée : AE² = 13. Enfin, on prend la racine carrée, AE = √13, soit environ 3,6 cm, et on donne l’unité.",
    cles: ["rectangle en R", "égalité avec les lettres", "remplace par les valeurs", "racine carrée", "unité"]
  },
  {
    q: "Pourquoi fait-on une soustraction quand on cherche un côté de l’angle droit avec Pythagore ?",
    reponse: "L’égalité de Pythagore s’écrit toujours avec l’hypoténuse seule d’un côté : hypoténuse² = somme des carrés des deux autres côtés. Si on cherche l’hypoténuse, on additionne les deux carrés. Si on cherche un côté de l’angle droit, l’hypoténuse est déjà connue : pour isoler le carré cherché, on fait une soustraction, hypoténuse² − autre côté². Par exemple, si LM = 7,2 cm et LN = 3 cm, alors NM² = 7,2² − 3² = 42,84, donc NM = √42,84 ≈ 6,5 cm.",
    cles: ["côté de l’angle droit", "soustraction", "hypoténuse² − autre côté²"]
  },
  {
    q: "Explique comment on reconnaît l’hypoténuse dans un triangle rectangle, et pourquoi c’est important.",
    reponse: "Les deux côtés qui forment l’angle droit sont les côtés de l’angle droit ; le troisième côté, celui qui ne touche pas l’angle droit, est l’hypoténuse. C’est aussi le plus grand côté du triangle rectangle. Dans le triangle ARE rectangle en R, l’hypoténuse est [AE] : son nom ne contient pas la lettre R. Il faut la repérer avant d’écrire l’égalité, car elle est seule à gauche : AE² = RE² + RA². Si on se trompe d’hypoténuse, on additionne au lieu de soustraire.",
    cles: ["angle droit", "plus grand côté", "AE² = RE² + RA²", "seule à gauche"]
  },
  {
    q: "Énonce la réciproque du théorème de Pythagore et explique à quoi elle sert.",
    reponse: "Si, dans un triangle, l’égalité de Pythagore est vérifiée, alors ce triangle est rectangle, et le plus grand côté est l’hypoténuse. La réciproque sert à prouver qu’un triangle est rectangle : on l’utilise quand on connaît les trois côtés. Par exemple, dans PMR avec MR = 6 cm, PR = 4,8 cm et PM = 3,6 cm, on a MR² = 36 et PR² + PM² = 36 : d’après la réciproque, PMR est rectangle en P.",
    cles: ["égalité de Pythagore est vérifiée", "triangle est rectangle", "trois côtés", "réciproque"]
  },
  {
    q: "Explique comment on vérifie si un triangle est rectangle quand on connaît ses trois côtés (méthode pas à pas).",
    reponse: "On cite le triangle et la méthode, puis on repère le plus grand côté, celui qui serait l’hypoténuse. On calcule séparément son carré d’un côté, et la somme des carrés des deux autres côtés de l’autre. On compare les deux résultats. S’ils sont égaux, l’égalité de Pythagore est vérifiée et on conclut avec la réciproque que le triangle est rectangle. Sinon, on conclut avec la contraposée qu’il n’est pas rectangle, comme pour DHB où HB² = 49 et DH² + DB² = 49,3.",
    cles: ["plus grand côté", "calcule séparément", "compare", "réciproque", "contraposée"]
  },
  {
    q: "Définis : l’image et l’antécédent d’un nombre par une fonction.",
    reponse: "Une fonction est une machine de calcul qui transforme un nombre de départ en un nombre d’arrivée. Le nombre d’entrée x est l’antécédent ; le résultat f(x) est son image. Par exemple, avec la machine « multiplier par 4, puis ajouter 5 », on écrit f(x) = 4x + 5 : l’image de 3 est f(3) = 17, et 3 est un antécédent de 17. Un nombre peut avoir plusieurs antécédents : avec g(x) = (x − 7)², 4 et 10 sont deux antécédents de 9.",
    cles: ["machine de calcul", "antécédent", "image", "f(x) = 4x + 5"]
  },
  {
    q: "Explique comment on retrouve un antécédent avec la marche arrière d’une machine de calcul.",
    reponse: "On part du résultat, c’est-à-dire de l’image, et on fait les opérations contraires dans l’ordre inverse : une multiplication devient une division, une addition devient une soustraction. Par exemple, pour la machine « multiplier par 3, ajouter 6, multiplier par 2 » et le résultat −42, on divise par 2, ce qui donne −21 ; on soustrait 6, ce qui donne −27 ; on divise par 3, ce qui donne −9. L’antécédent de −42 est donc −9.",
    cles: ["part du résultat", "opérations contraires", "ordre inverse", "antécédent"]
  },
  {
    q: "Explique comment on additionne deux fractions (méthode pas à pas).",
    reponse: "On ramène d’abord les deux fractions au même dénominateur, en multipliant le numérateur et le dénominateur d’une fraction par un même nombre non nul, ce qui donne une fraction égale. Ensuite, on ajoute les numérateurs et on conserve le dénominateur. Enfin, on simplifie le résultat si c’est possible. Par exemple, 3/4 + 2/3 = 9/12 + 8/12 = 17/12, et 7/8 − 3/2 = 7/8 − 12/8 = −5/8.",
    cles: ["même dénominateur", "fraction égale", "ajoute les numérateurs", "conserve le dénominateur", "simplifie"]
  },
  {
    q: "Quelle différence entre un nombre décimal et un nombre rationnel non décimal ? Donne un exemple de chaque.",
    reponse: "Une fraction est un nombre : elle sert à compter et à calculer. Certaines fractions sont des nombres décimaux, car elles ont une écriture décimale exacte : 30/60 = 1/2 = 0,5 et 34/20 = 17/10 = 1,7. D’autres, comme 1/3 ou 5/15, sont des nombres rationnels non décimaux : ce sont bien des fractions, mais elles n’ont pas d’écriture décimale exacte. Enfin, certains nombres comme √2 ne sont ni décimaux ni des fractions : on ne peut les écrire en valeur exacte qu’avec le symbole √.",
    cles: ["nombres décimaux", "rationnels non décimaux", "1/3", "ni décimaux ni des fractions"]
  },
  {
    q: "Explique l’erreur : « √9 + √16 = √(9 + 16) ».",
    reponse: "Ces deux calculs ne donnent pas le même résultat. D’un côté, √9 + √16 = 3 + 4 = 7. De l’autre, √(9 + 16) = √25 = 5. On ne peut donc pas « couper » une racine carrée sur une somme : il faut d’abord effectuer l’addition sous la racine, puis prendre la racine carrée du total. De même, √144 + √25 = 12 + 5 = 17, alors que √(144 + 25) = √169 = 13.",
    cles: ["3 + 4 = 7", "√25 = 5", "« couper » une racine carrée sur une somme", "d’abord effectuer l’addition"]
  },
  {
    q: "Explique l’erreur : « 5x × 3x = 15x » et « 5x² + 3x² = 8x⁴ ».",
    reponse: "Dans un produit, on multiplie les nombres entre eux et les lettres entre elles : 5 × 3 = 15 et x × x = x², donc 5x × 3x = 15x², et non 15x. Dans une somme, on additionne des termes de même nature sans changer l’exposant : 5x² + 3x² = 8x², car on ajoute cinq x² et trois x². Les exposants ne s’ajoutent pas dans une somme. En revanche, 5x − 3x = 2x est bien juste.",
    cles: ["x × x = x²", "15x²", "8x²", "ne s’ajoutent pas dans une somme"]
  },
  {
    q: "Explique comment on convertit des aires, et pourquoi « 0,0324 dm² = 0,00000324 mm² » est faux.",
    reponse: "Une aire se mesure en unités carrées. 1 dm² est l’aire d’un carré de 10 cm de côté : il faut 100 cm² pour le recouvrir, soit 10 rangées de 10 petits carrés. Pour passer à l’unité d’aire juste plus petite, on multiplie par 100, et non par 10. Quand on passe à une unité plus petite, le nombre devient plus grand : 0,0324 dm² = 3,24 cm² = 324 mm², car on a multiplié par 10 000. Autre exemple : 2,5 m² = 250 dm².",
    cles: ["100 cm²", "multiplie par 100", "plus petite", "324 mm²", "10 000"]
  },
  {
    q: "Que signifie un exposant négatif ? Explique avec 2⁻¹ et 5⁻².",
    reponse: "Un exposant négatif ne rend pas le nombre négatif : il indique un inverse. Pour a non nul, a⁻ⁿ = 1/aⁿ. Sur l’échelle de la fiche, chaque pas vers la gauche divise par a : après a⁰ = 1, on obtient 1/a, puis 1/a², puis 1/a³. Par exemple, 2⁻¹ = 1/2 = 0,5 et 5⁻² = 1/25 = 0,04. De même, 10⁻² = 0,01, et surtout pas −100.",
    cles: ["inverse", "a⁻ⁿ = 1/aⁿ", "divise par a", "0,5", "0,04"],
    recent: true
  },
  {
    q: "Pourquoi a⁰ = 1 pour tout nombre a non nul ?",
    reponse: "Sur l’échelle des exposants, on passe d’une case à la suivante en multipliant par a vers la droite, et on revient en arrière en divisant par a vers la gauche. Partons de a¹ = a : un pas vers la gauche donne a : a = 1, donc a⁰ = 1. Cela marche quelle que soit la base, pourvu qu’elle ne soit pas nulle : 2035⁰ = 1, (−1)⁰ = 1, 2,7⁰ = 1. Et si on continue vers la gauche, on obtient les exposants négatifs.",
    cles: ["divisant par a", "a : a = 1", "a⁰ = 1", "2035⁰ = 1"],
    recent: true
  },
  {
    q: "Énonce les trois règles de calcul sur les puissances, avec un exemple pour chacune.",
    reponse: "Elles ne s’appliquent qu’avec la même base. Produit : on ajoute les exposants, aᵐ × aᵖ = aᵐ⁺ᵖ ; par exemple 7³ × 7² = 7⁵, car on compte cinq facteurs 7. Quotient : on soustrait les exposants, aʳ / aˢ = aʳ⁻ˢ ; par exemple 3⁵/3³ = 3², et 9³/9⁵ = 9⁻². Puissance de puissance : on multiplie les exposants, (aᵏ)ⁿ = aᵏˣⁿ ; par exemple (2³)² = 2⁶ = 64. Attention : dans un produit, 7³ × 7² n’est pas 7⁶.",
    cles: ["même base", "ajoute les exposants", "soustrait les exposants", "multiplie les exposants", "7³ × 7² = 7⁵"],
    recent: true
  },
  {
    q: "Qu’est-ce que l’écriture scientifique d’un nombre, et comment la trouve-t-on ?",
    reponse: "C’est l’écriture a × 10ᵏ, avec 1 ≤ a < 10 et k un entier relatif : un seul chiffre non nul avant la virgule, puis une puissance de dix. Pour la trouver, on place la virgule juste après le premier chiffre non nul, puis on compte de combien de rangs on l’a déplacée. Pour 149 597 870 km, la virgule recule de 8 rangs : 1,49 × 10⁸ km. Pour 0,000 000 000 126 m, elle avance de 10 rangs : 1,26 × 10⁻¹⁰ m, exposant négatif.",
    cles: ["a × 10ᵏ", "1 ≤ a < 10", "premier chiffre non nul", "rangs", "1,49 × 10⁸"],
    recent: true
  },
  {
    q: "À quoi servent les préfixes comme giga ou nano ? Donne un exemple de chaque.",
    reponse: "Les préfixes remplacent une puissance de dix devant une unité, pour éviter d’écrire de très longs nombres. Giga (G) signifie 10⁹, un milliard : 1 Go = 1 gigaoctet = 10⁹ octets = 1 000 000 000 octets. Nano (n) signifie 10⁻⁹, un milliardième : 1 ng = 1 nanogramme = 10⁻⁹ g = 0,000 000 001 g, l’ordre de grandeur de la masse d’une cellule. Les autres préfixes suivent la même logique : kilo 10³, méga 10⁶, téra 10¹² ; milli 10⁻³, micro 10⁻⁶.",
    cles: ["puissance de dix", "10⁹", "1 000 000 000 octets", "10⁻⁹", "0,000 000 001 g"],
    recent: true
  },
  {
    q: "Explique l’erreur : « 10⁻² = −100 » et « 7³ × 7² = 7⁶ ».",
    reponse: "Un exposant négatif n’est pas un signe moins devant le résultat : il indique un inverse. 10⁻² = 1/10² = 1/100 = 0,01, un nombre positif plus petit que 1. Pour le produit, on écrit les facteurs : 7³ × 7² = 7 × 7 × 7 × 7 × 7, soit cinq facteurs 7, donc 7⁵. On ajoute les exposants (3 + 2 = 5), on ne les multiplie pas. On ne multiplie les exposants que pour une puissance de puissance, comme (7³)² = 7⁶.",
    cles: ["inverse", "0,01", "cinq facteurs 7", "ajoute les exposants", "puissance de puissance"],
    recent: true
  },
];
