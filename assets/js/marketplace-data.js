const marketplaceData = [
    // Plantes
    {
        name: 'Anthurium',
        category: 'plantes',
        price: 60,
        availability: 'Disponible',
        image: 'assets/img/anthurium.jpg',
        description: 'Fleur rouge éclatante'
    },
    {
        name: 'Dracaena',
        category: 'plantes',
        price: 75,
        availability: 'Disponible',
        image: 'assets/img/Dracaena.jpg',
        description: 'Hauteur : 80 CM'
    },
    {
        name: 'Cycas',
        category: 'plantes',
        price: 35,
        availability: 'Disponible',
        image: 'assets/img/cycas.jpg',
        description: 'Plante classique très populaire'
    },
    {
        name: 'Epipremnum',
        category: 'plantes',
        price: 40,
        availability: 'Disponible',
        image: 'assets/img/epi.jpg',
        description: 'Hauteur : 60 CM'
    },
    {
        name: 'Guzmania',
        category: 'plantes',
        price: 70,
        availability: 'Disponible',
        image: 'assets/img/guzmania.jpg',
        description: 'Plante exotique decorative'
    },
    {
        name: 'Kalanchoe',
        category: 'plantes',
        price: 45,
        availability: 'Disponible',
        image: 'assets/img/kalanchoe.jpg',
        description: 'Plante succulente facile'
    },
    {
        name: 'Monstera Deliciosa',
        category: 'plantes',
        price: 50,
        availability: 'Disponible',
        image: 'assets/img/monstera.jpg',
        description: 'Hauteur : 55 CM'
    },
    {
        name: 'Syngonium',
        category: 'plantes',
        price: 55,
        availability: 'Disponible',
        image: 'assets/img/syngonium.jpg',
        description: 'Plante grimpante élégante'
    },
    {
        name: 'Zamioculcas',
        category: 'plantes',
        price: 85,
        availability: 'Disponible',
        image: 'assets/img/zamioculcas.jpg',
        description: 'Plante très résistante et moderne'
    },
    // Meubles
    {
        name: 'Canapé convertible',
        category: 'meuble',
        price: 4999.99,
        availability: 'Disponible',
        image: 'assets/img/canape.jpg',
        description: 'Canapé 3 places, tissu gris'
    },
    {
        name: 'Table basse moderne',
        category: 'meuble',
        price: 899.50,
        availability: 'Disponible',
        image: 'assets/img/table-basse.jpg',
        description: 'Table basse en bois massif'
    },
    {
        name: 'Chaise de bureau ergonomique',
        category: 'meuble',
        price: 1200,
        availability: 'Disponible',
        image: 'assets/img/chaise-bureau.jpg',
        description: 'Chaise de travail avec roulettes'
    },
    {
        name: 'Lit King Size',
        category: 'meuble',
        price: 3500,
        availability: 'Disponible',
        image: 'assets/img/lit-king.jpg',
        description: 'Lit 180x200, structure bois'
    },
    {
        name: 'Armoire dressing',
        category: 'meuble',
        price: 2800,
        availability: 'Disponible',
        image: 'assets/img/armoire.jpg',
        description: 'Armoire 6 portes avec miroir'
    },
    {
        name: 'Bibliothèque ouverte',
        category: 'meuble',
        price: 650,
        availability: 'Disponible',
        image: 'assets/img/bibliotheque.jpg',
        description: 'Etagères en chêne massif'
    },
    // Textiles
    {
        name: 'Tapis berbère',
        category: 'textile',
        price: 1200.50,
        availability: 'Disponible',
        image: 'assets/img/tapis.jpg',
        description: 'Tapis fait main, 200x300cm'
    },
    {
        name: 'Rideau velours élégant',
        category: 'textile',
        price: 380,
        availability: 'Disponible',
        image: 'assets/img/rideau.jpg',
        description: 'Paire de rideaux, hauteur 210cm'
    },
    {
        name: 'Housse de canapé',
        category: 'textile',
        price: 220,
        availability: 'Disponible',
        image: 'assets/img/housse-canape.jpg',
        description: 'Tissu coton résistant'
    },
    {
        name: 'Tapis kilim traditionnel',
        category: 'textile',
        price: 850,
        availability: 'Disponible',
        image: 'assets/img/kilim.jpg',
        description: 'Tapis 160x230, laine naturelle'
    },
    {
        name: 'Plaid cosy',
        category: 'textile',
        price: 95,
        availability: 'Disponible',
        image: 'assets/img/plaid.jpg',
        description: 'Plaid en laine beige 130x180'
    },
    // Décoration
    {
        name: 'Lampe sur pied',
        category: 'decoration',
        price: 450.00,
        availability: 'Disponible',
        image: 'assets/img/lampe.jpg',
        description: 'Lampe design en métal noir'
    },
    {
        name: 'Miroir mural doré',
        category: 'decoration',
        price: 320,
        availability: 'Disponible',
        image: 'assets/img/miroir.jpg',
        description: 'Miroir encadré, 100x80cm'
    },
    {
        name: 'Tableau abstrait',
        category: 'decoration',
        price: 280,
        availability: 'Disponible',
        image: 'assets/img/tableau.jpg',
        description: 'Toile acrylique 60x80'
    },
    {
        name: 'Vase en céramique',
        category: 'decoration',
        price: 150,
        availability: 'Disponible',
        image: 'assets/img/vase.jpg',
        description: 'Vase blanc hauteur 40cm'
    },
    {
        name: 'Lustre cristal',
        category: 'decoration',
        price: 1200,
        availability: 'Disponible',
        image: 'assets/img/lustre.jpg',
        description: 'Lustre salle à manger, diamètre 60cm'
    },
    {
        name: 'Boîtes de rangement',
        category: 'decoration',
        price: 120,
        availability: 'Disponible',
        image: 'assets/img/boites.jpg',
        description: 'Set de 3 boîtes en osier'
    }
];
