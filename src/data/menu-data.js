export const MENU = [
  //formule
  {
    id: 'Menu jeune',
    category: 'formule',
    titleKey: 'formule.jeune.title',
    descriptionKey: 'formule.jeune.desc',
    price: 18.50,
    image: '/images/fromage.webp',
    menu: 'both', // 'midi' | 'soir' | 'both'
    model: 'wine-1.glb',
    groupKey: 'group.formule.enfant',
    scale: 18
  },
  {
    id: 'Menu Dégustation',
    category: 'formule',
    titleKey: 'formule.degustation.title',
    descriptionKey: 'formule.degustation.desc',
    price: 47.50,
    image: '/images/fromage.webp',
    menu: 'both', 
    model: 'wine-1.glb',
    groupKey: 'groupe.formule.degustation',
    scale: 18
  },

    //boisson

  {
    id: 'Coca',
    category: 'drink',
    titleKey: 'drink.coca.title',
    descriptionKey: 'drink.coca.desc',
    price: 11.50,
    image: '/images/coca.webp',
    menu: 'both',
    model: 'coca.glb',
    groupKey: 'group.cocktails',
    scale: 12
  },
  {
    id: 'Coca',
    category: 'drink',
    titleKey: 'drink.coca.title',
    descriptionKey: 'drink.coca.desc',
    price: 11.50,
    image: '/images/coca.webp',
    menu: 'both',
    model: 'coca.glb',
    groupKey: 'group.cocktails',
    scale: 12
  },
  {
    id: 'Coca',
    category: 'drink',
    titleKey: 'drink.coca.title',
    descriptionKey: 'drink.coca.desc',
    price: 11.50,
    image: '/images/coca.webp',
    menu: 'both',
    model: 'coca.glb',
    groupKey: 'group.jus-sodas',
    scale: 12
  },

      //Starter

  {
    id: 'tartare-saumon',
    category: 'starter',
    titleKey: 'starter.tartare-saumon.title',
    descriptionKey: 'starter.tartare-saumon.desc',
    price: 11.50,
    image: '/images/tartare.webp',
    menu: 'both',
    model: 'tartare_saumon.glb',
    groupKey: 'group.entree',
    scale: 12
  },

      //Plats
           
  {
    id: 'Linguine-ai-frutti-di-mare',
    category: 'plat',
    titleKey: 'plat.Linguine-ai-frutti-di-mar.title',
    descriptionKey: 'plat.Linguine-ai-frutti-di-mar.desc',
    price: 11.50,
    image: '/images/linguini-fruit-de-mer.webp',
    menu: 'both',
    model: 'linguine_ai_frutti_di_mare2.glb',
    groupKey: 'group.pates',
    scale: 12
  },

        //Desserts

    {
      id: 'panna_cotta_Nutella',
      category: 'dessert',
      titleKey: 'plat.panna-nutella.title',
      descriptionKey: 'plat.panna-nutella.desc',
      price: 6.50,
      image: '/images/panna-nutella.webp',
      menu: 'both',
      model: 'panna_cotta_alla_nutella.glb',
      groupKey: 'group.pates',
      scale: 10
    },
    {
      id: 'Tiramisù-al-Pistacchio',
      category: 'dessert',
      titleKey: 'plat.tiramisu-pistache.title',
      descriptionKey: 'plat.tiramisu-pistache.desc',
      price: 8.50,
      image: '/images/tiramisu-pistache.webp',
      menu: 'both',
      model: 'tiramisu_al_pistacchio.glb',
      groupKey: 'group.pates',
      scale: 12
    }
      
]

