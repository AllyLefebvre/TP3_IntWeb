# 🎭 L'Univers de Tim Burton - Site Web

Un site web dédié à l'univers gothique et fantastique du réalisateur Tim Burton, avec des animations immersives créées avec **Anime.js**.

## 🎬 Description

Ce site présente l'univers de Tim Burton à travers :
- **Biographie** et style artistique
- **Filmographie** complète avec détails
- **Anecdotes** et secrets de tournage

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3/SCSS** - Styles avec variables CSS et mixins
- **JavaScript ES6** - Logique interactive
- **Anime.js** - Bibliothèque d'animations fluides
- **Tailwind CSS** - Framework CSS utilitaire
- **Flowbite** - Composants UI (accordéons)
- **PWA** - Service Worker + Manifest

## 📁 Structure du projet

```
TP3_IntWeb/
├── index.html              # Page d'accueil (biographie)
├── movies.html             # Filmographie
├── fun_facts.html          # Anecdotes + formulaire
├── manifest.json           # Configuration PWA
├── js/
│   ├── burton-animations.js # Animations Anime.js
│   ├── formulaire.js       # Validation formulaire
│   └── service-worker.js   # Service Worker PWA
├── sass/
│   ├── styles.scss         # Styles source
│   ├── styles.css          # Styles compilés
│   └── styles.css.map      # Source map
├── img/                    # Images et posters
├── icons/                  # Icônes PWA
└── screenshots/            # Captures d'écran
```

## 🧩 Composants Tailwind/Flowbite

### 🎵 **Accordéon (Flowbite)**
- **Localisation** : `fun_facts.html` - Section "Secrets révélés"
- **Utilisation** : Affichage des anecdotes cachées de Tim Burton
- **Personnalisation** : Couleurs thématiques (rouge, vert, bleu, violet)
- **Fonctionnalités** : 
  - Ouverture/fermeture avec animation
  - Focus personnalisé avec couleurs Burton
  - 4 secrets : daltonisme, dessins artisanaux, phobie des singes, licenciement Disney

```html
<div id="accordion-secrets" data-accordion="collapse">
    <button data-accordion-target="#accordion-secrets-body-1" 
            class="bg-red-900 border border-red-500">
        Secret #1 : Le daltonisme de Burton
    </button>
</div>
```

### ⏳ **Spinner de chargement (Tailwind)**
- **Localisation** : `js/formulaire.js` - Validation du formulaire
- **Utilisation** : Feedback visuel pendant l'envoi simulé
- **Design** : SVG animé avec rotation continue
- **Durée** : 2 secondes avant affichage du succès
- **Texte** : "Envoi en cours..." avec icône

```javascript
submitButton.innerHTML = `
    <svg class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101">
        <!-- SVG paths pour le spinner -->
    </svg>
    Envoi en cours...
`;
```

### ✅ **Message de succès (Tailwind)**
- **Localisation** : `js/formulaire.js` - Après validation
- **Utilisation** : Confirmation de l'envoi d'anecdote
- **Design** : Bandeau vert avec icône Material Icons
- **Animation** : Apparition + confettis macabres simultanés
- **Auto-refresh** : Rechargement après 6 secondes

```javascript
const successDiv = document.createElement('div');
successDiv.className = 'success-message bg-green-900 border-l-4 border-green-500 p-4 rounded mt-6';
successDiv.innerHTML = `
    <div class="flex items-center">
        <span class="material-icons text-green-400 mr-2">check_circle</span>
        <div>
            <h4 class="text-green-100 font-bold">Anecdote envoyée avec succès !</h4>
            <p class="text-green-200 text-sm mt-1">Merci pour votre contribution.</p>
        </div>
    </div>
`;
```

## ✨ Animations détaillées

### 🎯 **Animation 1 : Apparition des cartes**
- **Déclencheur** : IntersectionObserver (scroll)
- **Cible** : Éléments `.burton-card`
- **Effet** : Fondu + translation verticale + changement d'échelle
- **Timing** : Décalage de 100ms entre chaque carte
- **Durée** : 500ms
- **Easing** : `easeOutCubic`

```javascript
anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 500,
    delay: anime.stagger(100),
    easing: 'easeOutCubic'
});
```

### 🖱️ **Animation 2 : Pulsation au survol**
- **Déclencheur** : `mouseenter` / `mouseleave`
- **Cible** : Éléments `.burton-card`
- **Effet** : Changement d'échelle subtil (1.05)
- **Durée** : 300ms
- **Easing** : `easeOutCubic`

```javascript
// Au survol
anime({
    targets: card,
    scale: [1, 1.05],
    duration: 300,
    easing: 'easeOutCubic'
});
```

### 🎉 **Animation 3 : Confettis macabres**
- **Déclencheur** : Validation réussie du formulaire
- **Éléments** : 40 confettis spirales
- **Formes** : 🌀 (spirale), 💀 (crâne), 🕸 (toile d'araignée)
- **Couleur** : Orange Burton (`#E67300`)
- **Durée** : 3-5 secondes par confetti

## 🎭 Crédits

**Développé par** : Allyson Lefebvre  
**Thème** : Univers de Tim Burton  
**Animations** : Anime.js  
**Année** : 2025

---