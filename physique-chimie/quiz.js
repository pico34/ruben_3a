window.QUIZ = {};
QUIZ.cahier = [
  {
    q: "Quelle est la formule de la masse volumique ?",
    choices: ["ρ = m × V", "ρ = m / V", "ρ = V / m", "ρ = m + V"],
    answer: 1,
    why: "ρ = m / V. Masse sur volume."
  },
  {
    q: "Quelle masse volumique trouve-t-on pour l’huile ?",
    choices: ["1,089 g/mL", "0,918 g/mL", "0,918 g/L", "6,71 g/mL"],
    answer: 1,
    why: "45,9 g / 50 mL = 0,918 g/mL. L’eau du même volume vaut 1 g/mL."
  },
  {
    q: "Pourquoi l’huile reste-t-elle au-dessus de l’eau ?",
    choices: ["Sa masse est plus petite", "Sa masse volumique est plus petite", "Sa masse volumique est plus grande", "Le volume d’huile est plus grand"],
    answer: 1,
    why: "0,918 g/mL est inférieur à 1 g/mL. Le mélange est hétérogène."
  },
  {
    q: "Comment obtient-on le volume du laiton dans l’éprouvette ?",
    choices: ["On pèse le laiton sur la balance", "Volume final moins volume initial", "On lit directement le volume final", "Volume final plus volume initial"],
    answer: 1,
    why: "16 mL − 12,5 mL = 3,5 mL, puis ρ = 23,5 / 3,5 = 6,71 g/mL."
  },
  {
    q: "De quoi est constitué le noyau ?",
    choices: ["D’électrons seulement", "De protons et de neutrons", "De protons et d’électrons", "De neutrons et d’électrons"],
    answer: 1,
    why: "Protons, charge positive, et neutrons, sans charge. Les électrons tournent autour."
  },
  {
    q: "Que signifie « un atome est électriquement neutre » ?",
    choices: ["Autant de protons que de neutrons", "Autant de protons que d’électrons", "Il n’a pas de neutrons", "Autant de neutrons que d’électrons"],
    answer: 1,
    why: "Autant de charges + que de charges −."
  },
  {
    q: "Pour le cuivre 63 sur 29, combien de neutrons ?",
    choices: ["63", "29", "34", "92"],
    answer: 2,
    why: "N = A − Z = 63 − 29 = 34."
  },
  {
    q: "Que sont le carbone 12, le carbone 13 et le carbone 14 ?",
    choices: ["Trois éléments différents", "Des isotopes du carbone", "Trois molécules de carbone", "Des ions du carbone"],
    answer: 1,
    why: "Même élément, même nombre de protons, nombres de masse différents."
  },
  {
    q: "Dans quelle unité le cours exprime-t-il la masse volumique ?",
    choices: ["g/mL", "mL/g", "g/L", "kg/m³"],
    answer: 0,
    why: "Masse en g, volume en mL, donc ρ en g/mL."
  },
  {
    q: "Quelle est la masse volumique de l’eau ?",
    choices: ["0,918 g/mL", "1 g/mL, soit 1 g/cm³", "6,71 g/mL", "13,5 g/mL"],
    answer: 1,
    why: "1 g/mL, soit 1 g/cm³. C’est une convention."
  },
  {
    q: "Quelle masse pour 80 mL d’un liquide à 1,25 g/mL ?",
    choices: ["64 g", "100 g", "81,25 g", "1 000 g"],
    answer: 1,
    why: "m = ρ × V = 1,25 × 80 = 100 g."
  },
  {
    q: "Quel volume occupent 270 g d’un liquide à 13,5 g/mL ?",
    choices: ["20 mL", "3 645 mL", "283,5 mL", "0,05 mL"],
    answer: 0,
    why: "V = m / ρ = 270 / 13,5 = 20 mL."
  },
  {
    q: "20 g de liquide occupent 25 mL. Quelle est sa masse volumique ?",
    choices: ["1,25 g/mL", "0,8 g/mL", "45 g/mL", "500 g/mL"],
    answer: 1,
    why: "ρ = 20 / 25 = 0,8 g/mL."
  },
  {
    q: "Combien pèse un litre d’essence à 0,80 g/mL ?",
    choices: ["80 g", "800 g", "8 g", "8 000 g"],
    answer: 1,
    why: "1 L = 1 000 mL, donc 0,80 × 1 000 = 800 g. Le cahier insiste : pas 80 g."
  },
  {
    q: "Comment s’appelle le mélange eau + huile ?",
    choices: ["Un mélange homogène", "Un mélange hétérogène", "Une solution", "Un corps pur"],
    answer: 1,
    why: "On voit deux couches : le mélange est hétérogène."
  },
  {
    q: "Un objet de 23,5 g fait monter l’eau de 12,5 mL à 16 mL. Quelle est sa masse volumique ?",
    choices: ["23,5 / 16 ≈ 1,47 g/mL", "23,5 / 3,5 ≈ 6,71 g/mL", "3,5 / 23,5 ≈ 0,15 g/mL", "23,5 × 3,5 ≈ 82 g/mL"],
    answer: 1,
    why: "Le volume de l’objet est le volume d’eau déplacé : 16 − 12,5 = 3,5 mL. Puis ρ = m / V = 23,5 / 3,5 ≈ 6,71 g/mL."
  },
  {
    q: "Que fait-on avant de verser le liquide dans l’éprouvette posée sur la balance ?",
    choices: ["On la rince à l’eau", "On tare la balance avec l’éprouvette vide", "On lit le volume initial", "On règle la balance sur 100 g"],
    answer: 1,
    why: "On tare pour ne peser que le liquide."
  },
  {
    q: "Comment appelle-t-on les protons et les neutrons ensemble ?",
    choices: ["Les électrons", "Les nucléons", "Les isotopes", "Les ions"],
    answer: 1,
    why: "Les particules du noyau sont les nucléons."
  },
  {
    q: "Que représente Z ?",
    choices: ["Le nombre de neutrons", "Le nombre de protons du noyau", "Le nombre de nucléons", "Le nombre de masse"],
    answer: 1,
    why: "Z est le numéro atomique, le nombre de protons."
  },
  {
    q: "Que représente A ?",
    choices: ["Le nombre d’électrons", "Le nombre de nucléons", "Le nombre de protons", "Le nombre de neutrons"],
    answer: 1,
    why: "A est le nombre de nucléons, protons + neutrons, appelé nombre de masse."
  },
  {
    q: "Quelle formule donne le nombre de neutrons ?",
    choices: ["N = A + Z", "N = A − Z", "N = Z − A", "N = A × Z"],
    answer: 1,
    why: "A = Z + N, donc N = A − Z."
  },
  {
    q: "Quelle est la charge d’un électron ?",
    choices: ["Positive", "Négative", "Nulle", "Ça dépend de l’atome"],
    answer: 1,
    why: "Chaque électron porte une charge négative."
  },
  {
    q: "Quelle est la charge d’un neutron ?",
    choices: ["Positive", "Négative", "Aucune", "Double"],
    answer: 2,
    why: "Le neutron n’a pas de charge électrique."
  },
  {
    q: "Que veut dire « structure lacunaire » ?",
    choices: ["L’atome est entièrement rempli de matière", "Il y a surtout du vide entre le noyau et les électrons", "Il y a du vide à l’intérieur du noyau", "Les électrons sont collés au noyau"],
    answer: 1,
    why: "Entre les électrons et le noyau, il y a du vide."
  },
  {
    q: "Qu’est-ce qu’une molécule ?",
    choices: ["Un atome qui a perdu des électrons", "Des atomes liés ensemble", "Un noyau sans électrons", "Un noyau et ses électrons"],
    answer: 1,
    why: "Quand des atomes sont liés ensemble, ils forment une molécule."
  },
  {
    q: "Selon quoi les éléments sont-ils rangés dans la classification périodique ?",
    choices: ["Leur nombre de neutrons", "Leur numéro atomique Z", "Leur masse volumique", "Leur date de découverte"],
    answer: 1,
    why: "Ils sont classés selon Z."
  },
  {
    q: "Méthode : que faut-il repérer dans une consigne ?",
    choices: ["Les verbes d’action", "Le nombre de lignes attendu", "Les noms propres", "Les adjectifs"],
    answer: 0,
    why: "Décrire, démontrer, comparer, déduire, justifier, calculer…"
  },
  {
    q: "Méthode : comment reformuler une consigne ?",
    choices: ["En question : « Que dois-je… ? »", "En phrase affirmative : « Pour répondre, je dois… »", "En la recopiant mot pour mot", "En un seul mot-clé souligné"],
    answer: 1,
    why: "On reformule en phrase affirmative : « Pour répondre, je dois… »"
  },
  {
    q: "Manuel : comment Thomson imagine-t-il l’atome ?",
    choices: ["Comme un pudding : pâte positive avec des électrons dedans", "Comme un système planétaire : noyau au centre, électrons autour", "Comme un grain de matière plein, dur et sans charge", "Comme un noyau positif entouré de vide"],
    answer: 0,
    why: "Les « raisins » négatifs sont les électrons."
  },
  {
    q: "Manuel : quel modèle Rutherford confirme-t-il ?",
    choices: ["Celui de Thomson, le pudding aux raisins", "Celui de Perrin, le modèle planétaire", "Celui de Bohr, les orbites définies", "Celui de Démocrite, l’atome insécable"],
    answer: 1,
    why: "Il met en évidence le vide entre le noyau et les électrons."
  },
  {
    q: "Manuel : quel est l’ordre de grandeur du diamètre d’un atome ?",
    choices: ["10⁻¹⁵ m", "10⁻¹⁰ m", "10⁻⁶ m", "10⁻³ m"],
    answer: 1,
    why: "10⁻¹⁰ m = 0,1 nm. Le noyau, lui, est vers 10⁻¹⁵ m."
  },
  {
    q: "Manuel : que donne le numéro atomique Z ?",
    choices: ["Le nombre de charges positives du noyau", "Le nombre de charges négatives du noyau", "Le nombre total de nucléons du noyau", "Le nombre de neutrons du noyau"],
    answer: 0,
    why: "Le néon a Z = 10 : 10 charges positives, donc 10 électrons."
  },
  {
    q: "Manuel : qu’est-ce qu’un ion ?",
    choices: ["Un atome qui a perdu ou gagné des électrons", "Un atome qui a perdu ou gagné des neutrons", "Un atome qui a perdu ou gagné des protons", "Un atome dont le noyau a perdu des électrons"],
    answer: 0,
    why: "Un ion (atome ou groupe d’atomes) est électriquement chargé."
  },
  {
    q: "Manuel : comment s’appelle un ion positif ?",
    choices: ["Un anion", "Un cation", "Un électron", "Un proton"],
    answer: 1,
    why: "Cation : des électrons ont été perdus."
  },
  {
    q: "Manuel : comment s’appelle un ion négatif ?",
    choices: ["Un anion", "Un cation", "Un électron", "Un nucléon"],
    answer: 0,
    why: "Anion : des électrons ont été gagnés."
  },
  {
    q: "Manuel : quelle est la formule de l’ion magnésium ?",
    choices: ["Mg⁺", "Mg²⁺", "Mg²⁻", "Mn²⁺"],
    answer: 1,
    why: "Le symbole, puis la charge en exposant."
  },
  {
    q: "Manuel : quel ion a pour formule HO⁻ ?",
    choices: ["L’ion hydrogène", "L’ion hydroxyde", "L’ion chlorure", "L’ion permanganate"],
    answer: 1,
    why: "HO⁻ : ion hydroxyde. H⁺ : ion hydrogène."
  },
  {
    q: "Manuel : pourquoi une solution qui contient des ions conduit-elle le courant ?",
    choices: ["Parce que les ions dissous sont chargés électriquement", "Parce que les molécules d’eau sont chargées", "Parce qu’elle contient des électrons libres", "Parce que la solution est électriquement neutre"],
    answer: 0,
    why: "La présence d’ions, chargés électriquement, rend une solution conductrice."
  },
  {
    q: "Manuel : quels ions contient une solution de chlorure de sodium ?",
    choices: ["Na⁺ et Cl⁻", "Na⁻ et Cl⁺", "H⁺ et HO⁻", "Na⁺ seulement"],
    answer: 0,
    why: "Le nom de la solution renseigne sur sa composition."
  },
  {
    q: "Manuel : une solution contient des cations. Que contient-elle aussi ?",
    choices: ["Rien d’autre", "Des anions", "Des neutrons libres", "Des électrons libres"],
    answer: 1,
    why: "Une solution est électriquement neutre."
  },
  {
    q: "Manuel : sur quoi fait-on un test caractéristique ?",
    choices: ["Sur la totalité de la solution", "Sur un petit échantillon de la solution", "Sur un échantillon d’eau distillée", "Sur le réactif avant de l’ajouter"],
    answer: 1,
    why: "Jamais sur la totalité de la solution."
  },
  {
    q: "Manuel : qu’est-ce qu’un précipité ?",
    choices: ["Un gaz qui se dégage d’un liquide lors d’une réaction", "Un solide en suspension dans un liquide, formé par une réaction", "Un ion qui apparaît dans la solution lors d’une réaction", "Un liquide qui change de couleur lors d’une réaction"],
    answer: 1,
    why: "Définition des mots du chapitre 9 : un solide en suspension dans un liquide, formé par une réaction chimique."
  },
  {
    q: "Manuel : que veut dire « monoatomique » ?",
    choices: ["Qui ne se compose que d’un atome", "Qui ne possède qu’un seul électron", "Qui ne porte qu’une seule charge", "Qui contient plusieurs atomes"],
    answer: 0,
    why: "Le contraire est polyatomique."
  }
];

QUIZ.extra = [
  {
    q: "1 mL est égal à…",
    choices: ["1 cm³", "1 dm³", "1 m³", "10 cm³"],
    answer: 0,
    why: "1 mL = 1 cm³, et 1 L = 1 dm³."
  },
  {
    q: "1 g/cm³ est égal à…",
    choices: ["0,001 kg/m³", "100 kg/m³", "1 000 kg/m³", "1 000 kg/L"],
    answer: 2,
    why: "1 g/cm³ = 1 kg/L = 1 000 kg/m³."
  },
  {
    q: "Pourquoi un glaçon flotte-t-il sur l’eau ?",
    choices: ["Sa masse est plus petite que celle de l’eau", "Sa masse volumique est plus petite que celle de l’eau", "Sa masse volumique est plus grande que celle de l’eau", "Il contient de l’air chaud qui le pousse vers le haut"],
    answer: 1,
    why: "La glace (0,92 g/cm³) est moins dense que l’eau (1 g/cm³). Un objet flotte si sa masse volumique est plus petite que celle du liquide."
  },
  {
    q: "Une bille d’acier (7,9 g/cm³) est posée sur du mercure (13,5 g/cm³). Que se passe-t-il ?",
    choices: ["Elle coule", "Elle flotte à la surface du mercure", "Elle reste entre deux eaux", "Elle coule lentement"],
    answer: 1,
    why: "7,9 est plus petit que 13,5 : la bille flotte sur le mercure."
  },
  {
    q: "Quel métal a la plus grande masse volumique parmi ceux-ci ?",
    choices: ["Aluminium", "Fer", "Or", "Plomb"],
    answer: 2,
    why: "L’or : 19,3 g/cm³, devant le plomb (11,3) et le fer (7,9)."
  },
  {
    q: "Le noyau est-il beaucoup plus petit que l’atome ?",
    choices: ["Non, il a presque la même taille", "Oui, mais seulement 2 à 3 fois plus petit", "Oui, des dizaines de milliers de fois", "Oui, environ 100 fois plus petit"],
    answer: 2,
    why: "D’où la structure lacunaire. L’exercice 6 du manuel fait calculer ce rapport."
  },
  {
    q: "Où se trouve presque toute la masse d’un atome ?",
    choices: ["Dans les électrons", "Dans le noyau, protons et neutrons", "Dans le vide autour du noyau", "Elle est répartie également"],
    answer: 1,
    why: "L’électron est beaucoup plus léger que le noyau."
  },
  {
    q: "Quelle expérience de 1911 montre que l’atome est surtout du vide ?",
    choices: ["Celle de Rutherford avec une feuille d’or", "Celle de Thomson avec le tube cathodique", "Celle de Perrin avec les rayons cathodiques", "Celle de Chadwick avec le neutron"],
    answer: 0,
    why: "Presque toutes les particules envoyées traversent la feuille d’or."
  },
  {
    q: "Quand un atome devient un ion, qu’est-ce qui change ?",
    choices: ["Le nombre de protons", "Le numéro atomique Z", "Le nombre d’électrons", "Le nombre de neutrons"],
    answer: 2,
    why: "Seul le nombre d’électrons change. Le noyau et Z restent les mêmes : l’élément ne change pas."
  },
  {
    q: "Combien de neutrons dans l’aluminium 27 (Z = 13) ?",
    choices: ["13", "14", "27", "40"],
    answer: 1,
    why: "N = A − Z = 27 − 13 = 14."
  },
  {
    q: "Qui propose en 1913 des orbites bien définies pour les électrons ?",
    choices: ["Démocrite", "Niels Bohr", "Thomson", "Chadwick"],
    answer: 1,
    why: "Niels Bohr précise le modèle planétaire."
  },
  {
    q: "Pourquoi l’eau pure conduit-elle très mal le courant ?",
    choices: ["Ses molécules d’eau sont trop grosses", "Elle ne contient presque pas d’ions dissous", "Elle contient trop d’électrons libres", "Elle contient trop d’ions dissous"],
    answer: 1,
    why: "Ce sont les ions dissous qui rendent une solution conductrice."
  },
  {
    q: "Avec la soude, quelle couleur de précipité montre la présence d’ions cuivre Cu²⁺ ?",
    choices: ["Bleu", "Vert", "Orange-rouille", "Blanc"],
    answer: 0,
    why: "Bleu pour Cu²⁺, vert pour Fe²⁺, rouille pour Fe³⁺, blanc pour Zn²⁺."
  },
  {
    q: "Avec quel réactif teste-t-on les ions chlorure Cl⁻ ?",
    choices: ["La soude (hydroxyde de sodium)", "Le nitrate d’argent", "L’eau de chaux", "Le sulfate de cuivre"],
    answer: 1,
    why: "Précipité blanc qui noircit à la lumière."
  },
  {
    q: "Que lit-on sur l’étiquette d’une eau minérale ?",
    choices: ["Les ions dissous, en mg par litre", "Les atomes dissous, en mg/L", "La masse volumique, en g/mL", "La masse de la bouteille vide"],
    answer: 0,
    why: "Calcium, magnésium, sodium, hydrogénocarbonate, sulfate…"
  },
  {
    q: "À quoi sert le carbone 14 ?",
    choices: ["À colorer les précipités", "À dater des restes très anciens", "À mesurer la masse volumique des roches", "À conduire le courant dans les solutions"],
    answer: 1,
    why: "C’est un isotope radioactif qui se transforme lentement."
  }
];
