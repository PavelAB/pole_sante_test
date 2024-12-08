# Partie 1 : Analyse critique d'une API

- **Utilisation d'une seule langue :**  
  L'utilisation d'une seule langue n'est pas respectée : les noms des endpoints sont écrits en français ainsi que certaines propriétés des objets récupérés, alors que la description et d'autres propriétés sont en anglais. Cela crée de la confusion. Je suis probablement tombé dans ce piège, car j'ai utilisé ces noms également dans le frontend. Cependant, j'ai fait ce choix pour éviter de me retrouver avec des noms de propriétés différents entre le frontend et le backend, ce qui aurait rapidement rendu le code difficile à maintenir.

- **Description des endpoints :**  
  La description des endpoints n'est pas très claire et assez répétitive. Il serait peut-être intéressant d'ajouter davantage de contexte. Cependant, cela reste compréhensible dans l'ensemble.

- **Manque de filtres ou d'endpoints spécifiques :**  
  L'API manque de filtres ou d'endpoints spécifiques permettant de récupérer des données plus adaptées ou mieux triées. À cause de cela, il est difficile d'ajouter des fonctionnalités avancées dans le frontend pour mieux présenter les données à l'utilisateur.

- **Manque d'information sur les types de retour :**  
  Il y a un manque d'information sur les types de retour, notamment aucune information concernant les réponses `400`.

- **Complétude des données :**  
  Concernant les données récupérées, comme je n'ai pas réalisé l'exercice deux, il m'est difficile de juger si elles sont complètes. J'ai cependant remarqué que l'objet `service` ne contient pas d'information sur l'hôpital dans lequel il se trouve. Cette information me semble intéressante à représenter et peut même être indispensable.

- **Absence du préfixe Bearer :**  
  Le préfixe **Bearer** n'est pas présent dans le token d'autorisation. Cela ne respecte pas les normes HTTP et celles liées à l'authentification via un token d'accès.

- **Incohérences dans les exemples de réponse :**  
  Les exemples de réponses, notamment pour le `Classement`, précisent que le JSON récupéré contient une propriété `hydra:search`, alors qu'en réalité elle n'est pas présente. À l'inverse, le document ne mentionne pas la récupération des propriétés `@context` et `@id`, qui sont pourtant bien retournées.

- **Headers de réponse :**  
  Le sujet suivant n'est pas celui que je maîtrise le mieux, mais je me suis posé la question concernant les headers de réponse. Ils me semblent un peu trop remplis. Effectivement, certaines propriétés ne devraient pas être présentes dans les réponses, car elles pourraient potentiellement causer des failles de sécurité.
